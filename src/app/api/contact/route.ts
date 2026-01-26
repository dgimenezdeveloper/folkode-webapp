import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// POST /api/contact - Submit a contact message
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { message: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { message: 'Email inválido' },
        { status: 400 }
      )
    }

    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        message: data.message,
        status: 'PENDING'
      }
    })

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente', id: message.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { message: 'Error al enviar el mensaje' },
      { status: 500 }
    )
  }
}
