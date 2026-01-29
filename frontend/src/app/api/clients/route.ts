import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// GET /api/clients - List all clients (proxy to backend)
export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/clients`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch clients')
    }
    
    const clients = await response.json()
    return NextResponse.json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { message: 'Error al obtener los clientes' },
      { status: 500 }
    )
  }
}

// POST /api/clients - Create a new client (proxy to backend)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${API_URL}/api/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(error, { status: response.status })
    }
    
    const client = await response.json()
    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { message: 'Error al crear el cliente' },
      { status: 500 }
    )
  }
}
