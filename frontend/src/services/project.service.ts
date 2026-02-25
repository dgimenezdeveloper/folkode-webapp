import { fetchApi } from './api'
import { Project, CreateProjectDTO, UpdateProjectDTO } from '@/types'

export interface PaginatedProjects {
    data: Project[]
    pagination: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

export interface GetProjectsParams {
    page?: number
    limit?: number
    search?: string
    category?: string
    status?: string
}

export const projectService = {
    /**
     * Obtiene todos los proyectos con filtros y paginación
     */
    async getProjects(params?: GetProjectsParams, token?: string): Promise<PaginatedProjects | Project[]> {
        const searchParams = new URLSearchParams()

        if (params) {
            if (params.page) searchParams.append('page', params.page.toString())
            if (params.limit) searchParams.append('limit', params.limit.toString())
            if (params.search) searchParams.append('search', params.search)
            if (params.category) searchParams.append('category', params.category)
            if (params.status) searchParams.append('status', params.status)
        }

        const queryString = searchParams.toString()
        const endpoint = `/api/projects${queryString ? `?${queryString}` : ''}`

        return fetchApi<PaginatedProjects | Project[]>(endpoint, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    },

    /**
     * Obtiene un proyecto específico por ID o Slug
     */
    async getProject(id: string, token?: string): Promise<Project> {
        return fetchApi<Project>(`/api/projects/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    },

    /**
     * Crea un nuevo proyecto.
     * Acepta FormData si envías archivos (imágenes) o CreateProjectDTO si solo envías JSON.
     */
    async createProject(data: FormData | CreateProjectDTO, token?: string): Promise<Project> {
        return fetchApi<Project>(`/api/projects`, {
            method: 'POST',
            body: data as BodyInit,
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    },

    /**
     * Actualiza un proyecto existente.
     * Acepta FormData para soporte de archivos.
     */
    async updateProject(id: string, data: FormData | UpdateProjectDTO, token?: string): Promise<Project> {
        return fetchApi<Project>(`/api/projects/${id}`, {
            method: 'PUT',
            body: data as BodyInit, // Si envías FormData el fetchApi no forzará `application/json`
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    },

    /**
     * Elimina un proyecto por ID
     */
    async deleteProject(id: string, token?: string): Promise<void> {
        return fetchApi<void>(`/api/projects/${id}`, {
            method: 'DELETE',
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    }
}
