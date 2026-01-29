import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// GET /api/transactions - List all transactions (proxy to backend)
export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/transactions`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch transactions')
    }
    
    const transactions = await response.json()
    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { message: 'Error al obtener las transacciones' },
      { status: 500 }
    )
  }
}

// POST /api/transactions - Create a new transaction (proxy to backend)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${API_URL}/api/transactions`, {
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
    
    const transaction = await response.json()
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { message: 'Error al crear la transacción' },
      { status: 500 }
    )
  }
}
