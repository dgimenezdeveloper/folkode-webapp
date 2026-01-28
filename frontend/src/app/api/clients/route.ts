import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// GET /api/clients - List all clients
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        _count: {
          select: {
            projects: true,
            transactions: true,
            testimonials: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { message: 'Error al obtener los clientes' },
      { status: 500 }
    )
  }
}

// POST /api/clients - Create a new client
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { message: 'El nombre es requerido' },
        { status: 400 }
      )
    }

    const client = await prisma.client.create({
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

    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { message: 'Error al crear el cliente' },
      { status: 500 }
    )
  }
}
