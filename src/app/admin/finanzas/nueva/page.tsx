'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSave, FiLoader, FiDollarSign, FiCalendar } from 'react-icons/fi'
import { TransactionType } from '@/lib/db/types'

interface Project {
  id: string
  title: string
}

interface Client {
  id: string
  name: string
}

const commonCategories = [
  'Desarrollo web',
  'Diseño',
  'Hosting',
  'Dominio',
  'Mantenimiento',
  'Consultoría',
  'Marketing',
  'Herramientas',
  'Software',
  'Hardware',
  'Impuestos',
  'Servicios',
  'Otros'
]

export default function NewTransactionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [transactionType, setTransactionType] = useState<TransactionType>('INCOME')

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(res => res.json()),
      fetch('/api/clients').then(res => res.json())
    ]).then(([projectsData, clientsData]) => {
      setProjects(projectsData)
      setClients(clientsData)
    }).catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    
    const data = {
      type: formData.get('type') as TransactionType,
      amount: parseFloat(formData.get('amount') as string),
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      category: formData.get('category') as string || null,
      projectId: formData.get('projectId') as string || null,
      clientId: formData.get('clientId') as string || null,
    }

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al crear la transacción')
      }

      router.push('/admin/finanzas')
      router.refresh()
    } catch (error) {
      console.error('Error creating transaction:', error)
      alert(error instanceof Error ? error.message : 'Error al crear la transacción')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/finanzas"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nueva Transacción</h1>
          <p className="text-gray-600 mt-1">Registra un nuevo ingreso o gasto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tipo de transacción</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-colors truncate ${
              transactionType === 'INCOME' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="type"
                value="INCOME"
                checked={transactionType === 'INCOME'}
                onChange={(e) => setTransactionType(e.target.value as TransactionType)}
                className="sr-only"
              />
              <div className={`p-3 rounded-full mb-2 ${
                transactionType === 'INCOME' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <FiDollarSign className={`w-6 h-6 ${
                  transactionType === 'INCOME' ? 'text-green-600' : 'text-gray-600'
                }`} />
              </div>
              <span className={`font-medium ${
                transactionType === 'INCOME' ? 'text-green-700' : 'text-gray-700'
              }`}>Ingreso</span>
              <span className="text-sm text-gray-500 mt-1 truncate">Dinero que entra</span>
            </label>

            <label className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
              transactionType === 'EXPENSE' 
                ? 'border-red-500 bg-red-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input
                type="radio"
                name="type"
                value="EXPENSE"
                checked={transactionType === 'EXPENSE'}
                onChange={(e) => setTransactionType(e.target.value as TransactionType)}
                className="sr-only"
              />
              <div className={`p-3 rounded-full mb-2 ${
                transactionType === 'EXPENSE' ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                <FiDollarSign className={`w-6 h-6 ${
                  transactionType === 'EXPENSE' ? 'text-red-600' : 'text-gray-600'
                }`} />
              </div>
              <span className={`font-medium ${
                transactionType === 'EXPENSE' ? 'text-red-700' : 'text-gray-700'
              }`}>Gasto</span>
              <span className="text-sm text-gray-500 mt-1 truncate">Dinero que sale</span>
            </label>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <input
                type="text"
                id="description"
                name="description"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Ej: Pago por desarrollo de landing page"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Monto (ARS) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Fecha *
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">Seleccionar categoría</option>
                {commonCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Relations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Relaciones (opcional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-2">
                Proyecto relacionado
              </label>
              <select
                id="projectId"
                name="projectId"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">Sin proyecto</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
                Cliente relacionado
              </label>
              <select
                id="clientId"
                name="clientId"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">Sin cliente</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/finanzas"
            className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-600 disabled:bg-primary/50 transition-colors font-medium flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5" />
                Crear transacción
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
