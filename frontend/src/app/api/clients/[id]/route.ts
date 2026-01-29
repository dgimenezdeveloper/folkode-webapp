import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/clients/[id] - Get a single client (proxy to backend)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    const response = await fetch(`${API_URL}/api/clients/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: 'Cliente no encontrado' },
          { status: 404 }
        )
      }
      throw new Error('Failed to fetch client')
    }

    const client = await response.json()
    return NextResponse.json(client)
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { message: 'Error al obtener el cliente' },
      { status: 500 }
    )
  }
}

// PUT /api/clients/[id] - Update a client (proxy to backend)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const response = await fetch(`${API_URL}/api/clients/${id}`, {
      method: 'PUT',
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
    return NextResponse.json(client)
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json(
      { message: 'Error al actualizar el cliente' },
      { status: 500 }
    )
  }
}

// DELETE /api/clients/[id] - Delete a client (proxy to backend)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    const response = await fetch(`${API_URL}/api/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(error, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { message: 'Error al eliminar el cliente' },
      { status: 500 }
    )
  }
}
