import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// GET /api/projects - List all projects (proxy to backend)
export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/projects`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    
    const projects = await response.json()
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { message: 'Error al obtener los proyectos' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project (proxy to backend)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${API_URL}/api/projects`, {
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
    
    const project = await response.json()
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { message: 'Error al crear el proyecto' },
      { status: 500 }
    )
  }
}
