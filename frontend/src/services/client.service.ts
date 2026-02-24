import { fetchApi } from './api'
import { Client } from '@/lib/db/types'

export const clientService = {
    /**
     * Obtiene todos los clientes registrados
     */
    async getClients(token?: string): Promise<Client[]> {
        return fetchApi<Client[]>('/api/clients', {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    },
}
