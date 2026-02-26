import { fetchApi } from './api'
import { Client } from '@/lib/db/types'

export const clientService = {
    /**
     * Obtiene todos los clientes registrados
     */
    async getClients(token?: string, search?: string): Promise<Client[]> {
        const url = search ? `/api/clients?search=${encodeURIComponent(search)}` : '/api/clients';
        return fetchApi<Client[]>(url, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    },

    /**
     * Obtiene un cliente por ID
     */
    async getClientById(id: string, token?: string): Promise<Client> {
        return fetchApi<Client>(`/api/clients/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    },

    /**
     * Crea un nuevo cliente
     */
    async createClient(data: Partial<Client>, token?: string): Promise<Client> {
        return fetchApi<Client>('/api/clients', {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: JSON.stringify(data)
        })
    },

    /**
     * Actualiza un cliente existente
     */
    async updateClient(id: string, data: Partial<Client>, token?: string): Promise<Client> {
        return fetchApi<Client>(`/api/clients/${id}`, {
            method: 'PUT',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: JSON.stringify(data)
        })
    },

    /**
     * Elimina un cliente
     */
    async deleteClient(id: string, token?: string): Promise<void> {
        return fetchApi<void>(`/api/clients/${id}`, {
            method: 'DELETE',
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    }
}
