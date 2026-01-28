import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/clients/[id] - Get a single client
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        projects: {
          orderBy: { updatedAt: 'desc' }
        },
        transactions: {
          orderBy: { date: 'desc' },
          take: 10
        },
        testimonials: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!client) {
      return NextResponse.json(
        { message: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { message: 'Error al obtener el cliente' },
      { status: 500 }
    )
  }
}

// PUT /api/clients/[id] - Update a client
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const data = await request.json()

    // Check if client exists
    const existingClient = await prisma.client.findUnique({
      where: { id }
    })

    if (!existingClient) {
      return NextResponse.json(
        { message: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    const client = await prisma.client.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        website: data.website,
        avatar: data.avatar,
        notes: data.notes
      }
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json(
      { message: 'Error al actualizar el cliente' },
      { status: 500 }
    )
  }
}

// DELETE /api/clients/[id] - Delete a client
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    // Check if client exists
    const client = await prisma.client.findUnique({
      where: { id }
    })

    if (!client) {
      return NextResponse.json(
        { message: 'Cliente no encontrado' },
        { status: 404 }
      )
    }

    // Delete client (projects will keep their clientId as null)
    await prisma.client.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Cliente eliminado correctamente' })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { message: 'Error al eliminar el cliente' },
      { status: 500 }
    )
  }
}
