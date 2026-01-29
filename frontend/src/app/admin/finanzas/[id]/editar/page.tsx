'use client'

import { useState, useEffect, use } from 'react'
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

interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  date: string
  category: string | null
  projectId: string | null
  clientId: string | null
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

export default function EditTransactionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.INCOME)

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(res => res.json()),
      fetch('/api/clients').then(res => res.json()),
      fetch(`/api/transactions/${id}`).then(res => res.json())
    ]).then(([projectsData, clientsData, transactionData]) => {
      setProjects(projectsData)
      setClients(clientsData)
      setTransaction(transactionData)
      setTransactionType(transactionData.type)
      setIsFetching(false)
    }).catch(error => {
      console.error('Error fetching data:', error)
      setIsFetching(false)
    })
  }, [id])

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
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al actualizar la transacción')
      }

      router.push('/admin/finanzas')
      router.refresh()
    } catch (error) {
      console.error('Error updating transaction:', error)
      alert(error instanceof Error ? error.message : 'Error al actualizar la transacción')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Transacción no encontrada</p>
        <Link href="/admin/finanzas" className="text-primary hover:underline mt-2 inline-block">
          Volver a finanzas
        </Link>
      </div>
    )
  }

  const formatDateForInput = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toISOString().split('T')[0]
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
          <h1 className="text-2xl font-bold text-gray-900">Editar Transacción</h1>
          <p className="text-gray-600 mt-1">{transaction.description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tipo de transacción</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
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
                defaultValue={transaction.description}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                  defaultValue={transaction.amount}
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
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
                  defaultValue={formatDateForInput(transaction.date)}
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
                defaultValue={transaction.category || ''}
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Relaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-2">
                Proyecto relacionado
              </label>
              <select
                id="projectId"
                name="projectId"
                defaultValue={transaction.projectId || ''}
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
                defaultValue={transaction.clientId || ''}
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
                Guardar cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
