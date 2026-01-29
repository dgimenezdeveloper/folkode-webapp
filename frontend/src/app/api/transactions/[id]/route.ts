import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/transactions/[id] - Get a single transaction (proxy to backend)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: 'Transacción no encontrada' },
          { status: 404 }
        )
      }
      throw new Error('Failed to fetch transaction')
    }

    const transaction = await response.json()
    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error fetching transaction:', error)
    return NextResponse.json(
      { message: 'Error al obtener la transacción' },
      { status: 500 }
    )
  }
}

// PUT /api/transactions/[id] - Update a transaction (proxy to backend)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
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

    const transaction = await response.json()
    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error updating transaction:', error)
    return NextResponse.json(
      { message: 'Error al actualizar la transacción' },
      { status: 500 }
    )
  }
}

// DELETE /api/transactions/[id] - Delete a transaction (proxy to backend)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
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
    console.error('Error deleting transaction:', error)
    return NextResponse.json(
      { message: 'Error al eliminar la transacción' },
      { status: 500 }
    )
  }
}
