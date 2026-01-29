import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/projects/[id] - Get a single project (proxy to backend)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: 'Proyecto no encontrado' },
          { status: 404 }
        )
      }
      throw new Error('Failed to fetch project')
    }

    const project = await response.json()
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { message: 'Error al obtener el proyecto' },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id] - Update a project (proxy to backend)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
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

    const project = await response.json()
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { message: 'Error al actualizar el proyecto' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id] - Delete a project (proxy to backend)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    
    const response = await fetch(`${API_URL}/api/projects/${id}`, {
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
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { message: 'Error al eliminar el proyecto' },
      { status: 500 }
    )
  }
}
