import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/transactions/[id] - Get a single transaction
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        client: true,
        project: true
      }
    })

    if (!transaction) {
      return NextResponse.json(
        { message: 'Transacción no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error fetching transaction:', error)
    return NextResponse.json(
      { message: 'Error al obtener la transacción' },
      { status: 500 }
    )
  }
}

// PUT /api/transactions/[id] - Update a transaction
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const data = await request.json()

    // Check if transaction exists
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id }
    })

    if (!existingTransaction) {
      return NextResponse.json(
        { message: 'Transacción no encontrada' },
        { status: 404 }
      )
    }

    const transaction = await prisma.transaction.update({
      where: { id },
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

    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error updating transaction:', error)
    return NextResponse.json(
      { message: 'Error al actualizar la transacción' },
      { status: 500 }
    )
  }
}

// DELETE /api/transactions/[id] - Delete a transaction
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params

    // Check if transaction exists
    const transaction = await prisma.transaction.findUnique({
      where: { id }
    })

    if (!transaction) {
      return NextResponse.json(
        { message: 'Transacción no encontrada' },
        { status: 404 }
      )
    }

    await prisma.transaction.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Transacción eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return NextResponse.json(
      { message: 'Error al eliminar la transacción' },
      { status: 500 }
    )
  }
}
