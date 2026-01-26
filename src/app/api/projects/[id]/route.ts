import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/projects/[id] - Get a single project
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        images: { orderBy: { order: 'asc' } },
        sections: {
          orderBy: { order: 'asc' },
          include: { subsections: { orderBy: { order: 'asc' } } }
        },
        transactions: {
          orderBy: { date: 'desc' },
          include: { client: true }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { message: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { message: 'Error al obtener el proyecto' },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id] - Update a project
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const data = await request.json()

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id },
      include: { images: true }
    })

    if (!existingProject) {
      return NextResponse.json(
        { message: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    // Check if slug is taken by another project
    if (data.slug && data.slug !== existingProject.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug: data.slug }
      })
      if (slugExists) {
        return NextResponse.json(
          { message: 'Ya existe un proyecto con ese slug' },
          { status: 400 }
        )
      }
    }

    // Delete existing images and create new ones
    if (data.images) {
      await prisma.projectImage.deleteMany({
        where: { projectId: id }
      })
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDesc: data.shortDesc,
        category: data.category,
        status: data.status,
        featured: data.featured,
        demoUrl: data.demoUrl,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        technologies: data.technologies,
        clientId: data.clientId || null,
        images: data.images?.length > 0 ? {
          create: data.images.map((img: { url: string; alt?: string; order: number }) => ({
            url: img.url,
            alt: img.alt,
            order: img.order
          }))
        } : undefined
      },
      include: {
        client: true,
        images: true
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { message: 'Error al actualizar el proyecto' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id }
    })

    if (!project) {
      return NextResponse.json(
        { message: 'Proyecto no encontrado' },
        { status: 404 }
      )
    }

    // Delete project (cascade will delete images and sections)
    await prisma.project.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Proyecto eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { message: 'Error al eliminar el proyecto' },
      { status: 500 }
    )
  }
}
