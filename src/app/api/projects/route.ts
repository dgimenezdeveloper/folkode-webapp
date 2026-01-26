import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// GET /api/projects - List all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: true,
        images: { orderBy: { order: 'asc' } }
      },
      orderBy: { updatedAt: 'desc' }
    })
    
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { message: 'Error al obtener los proyectos' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.title || !data.slug || !data.description || !data.category) {
      return NextResponse.json(
        { message: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug: data.slug }
    })

    if (existingProject) {
      return NextResponse.json(
        { message: 'Ya existe un proyecto con ese slug' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        shortDesc: data.shortDesc,
        category: data.category,
        status: data.status || 'IN_DEVELOPMENT',
        featured: data.featured || false,
        demoUrl: data.demoUrl,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        technologies: data.technologies || [],
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

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { message: 'Error al crear el proyecto' },
      { status: 500 }
    )
  }
}
