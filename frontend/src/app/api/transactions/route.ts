import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

// GET /api/transactions - List all transactions
export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        client: true,
        project: true
      },
      orderBy: { date: 'desc' }
    })
    
    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { message: 'Error al obtener las transacciones' },
      { status: 500 }
    )
  }
}

// POST /api/transactions - Create a new transaction
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.type || !data.amount || !data.description || !data.date) {
      return NextResponse.json(
        { message: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const transaction = await prisma.transaction.create({
      data: {
        type: data.type,
        amount: parseFloat(data.amount),
        description: data.description,
        date: new Date(data.date),
        category: data.category,
        projectId: data.projectId || null,
        clientId: data.clientId || null
      },
      include: {
        client: true,
        project: true
      }
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { message: 'Error al crear la transacción' },
      { status: 500 }
    )
  }
}
