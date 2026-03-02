import { fetchApi } from './api'
import { Transaction } from '@/lib/db/types'

export const transactionService = {
    /**
     * Obtiene todas las transacciones, con filtros opcionales
     */
    async getTransactions(token?: string, clientId?: string, projectId?: string): Promise<Transaction[]> {
        let url = '/api/transactions';
        const params = new URLSearchParams();
        if (clientId) params.append('clientId', clientId);
        if (projectId) params.append('projectId', projectId);
        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        return fetchApi<Transaction[]>(url, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    },

    /**
     * Obtiene una transacción por ID
     */
    async getTransactionById(id: string, token?: string): Promise<Transaction> {
        return fetchApi<Transaction>(`/api/transactions/${id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    },

    /**
     * Crea una nueva transacción
     */
    async createTransaction(data: Partial<Transaction>, token?: string): Promise<Transaction> {
        return fetchApi<Transaction>('/api/transactions', {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: JSON.stringify(data)
        })
    },

    /**
     * Actualiza una transacción existente
     */
    async updateTransaction(id: string, data: Partial<Transaction>, token?: string): Promise<Transaction> {
        return fetchApi<Transaction>(`/api/transactions/${id}`, {
            method: 'PUT',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: JSON.stringify(data)
        })
    },

    /**
     * Elimina una transacción
     */
    async deleteTransaction(id: string, token?: string): Promise<void> {
        return fetchApi<void>(`/api/transactions/${id}`, {
            method: 'DELETE',
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
    }
}
