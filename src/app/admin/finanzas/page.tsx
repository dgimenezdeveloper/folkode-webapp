import { Suspense } from 'react'
import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { 
  FiPlus, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign,
  FiCalendar
} from 'react-icons/fi'
import { TransactionType } from '@/lib/db/types'
import DeleteTransactionButton from './DeleteTransactionButton'

interface SearchParams {
  search?: string
  type?: TransactionType
  projectId?: string
  clientId?: string
}

async function getTransactions(searchParams: SearchParams) {
  const where: Record<string, unknown> = {}
  
  if (searchParams.search) {
    where.OR = [
      { description: { contains: searchParams.search, mode: 'insensitive' } },
      { category: { contains: searchParams.search, mode: 'insensitive' } }
    ]
  }
  
  if (searchParams.type) {
    where.type = searchParams.type
  }

  if (searchParams.projectId) {
    where.projectId = searchParams.projectId
  }

  if (searchParams.clientId) {
    where.clientId = searchParams.clientId
  }

  return prisma.transaction.findMany({
    where,
    include: {
      client: true,
      project: true
    },
    orderBy: { date: 'desc' }
  })
}

async function getFilterData() {
  const [projects, clients] = await Promise.all([
    prisma.project.findMany({ select: { id: true, title: true }, orderBy: { title: 'asc' } }),
    prisma.client.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } })
  ])
  return { projects, clients }
}

async function getSummary(searchParams: SearchParams) {
  const where: Record<string, unknown> = {}
  
  if (searchParams.projectId) {
    where.projectId = searchParams.projectId
  }
  if (searchParams.clientId) {
    where.clientId = searchParams.clientId
  }

  const [income, expenses] = await Promise.all([
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { ...where, type: 'INCOME' }
    }),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { ...where, type: 'EXPENSE' }
    })
  ])

  return {
    income: income._sum.amount || 0,
    expenses: expenses._sum.amount || 0,
    balance: (income._sum.amount || 0) - (expenses._sum.amount || 0)
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(amount)
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date))
}

async function TransactionsTable({ searchParams }: { searchParams: SearchParams }) {
  const transactions = await getTransactions(searchParams)

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <FiDollarSign className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay transacciones</h3>
        <p className="text-gray-500 mb-4">
          {searchParams.search || searchParams.type
            ? 'No se encontraron transacciones con los filtros aplicados'
            : 'Comienza registrando tu primera transacción'}
        </p>
        <Link
          href="/admin/finanzas/nueva"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Nueva transacción
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Descripción</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Fecha</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Relacionado</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Categoría</th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Monto</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'INCOME' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'INCOME' ? (
                        <FiTrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <FiTrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiCalendar className="w-4 h-4 text-gray-400" />
                    {formatDate(transaction.date)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    {transaction.project && (
                      <Link 
                        href={`/admin/proyectos/${transaction.project.id}`}
                        className="text-primary hover:underline"
                      >
                        {transaction.project.title}
                      </Link>
                    )}
                    {transaction.client && (
                      <span className="text-gray-600">
                        {transaction.project && ' • '}
                        {transaction.client.name}
                      </span>
                    )}
                    {!transaction.project && !transaction.client && (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {transaction.category ? (
                    <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                      {transaction.category}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`font-semibold ${
                    transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/admin/finanzas/${transaction.id}/editar`}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <DeleteTransactionButton 
                      transactionId={transaction.id} 
                      transactionDescription={transaction.description} 
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function LoadingTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="animate-pulse">
        <div className="h-14 bg-gray-50 border-b border-gray-100"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-6 py-4 border-b border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function FinancesPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const [filterData, summary] = await Promise.all([
    getFilterData(),
    getSummary(params)
  ])
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finanzas</h1>
          <p className="text-gray-600 mt-1">Gestiona los ingresos y gastos de Folkode</p>
        </div>
        <Link
          href="/admin/finanzas/nueva"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
        >
          <FiPlus className="w-5 h-5" />
          Nueva Transacción
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ingresos</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(summary.income)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiTrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Gastos</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(summary.expenses)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${summary.balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
              <FiDollarSign className={`w-5 h-5 ${summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Balance</p>
              <p className={`text-xl font-bold ${summary.balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                {formatCurrency(summary.balance)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <form className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="search"
              defaultValue={params.search}
              placeholder="Buscar transacciones..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <select
            name="type"
            defaultValue={params.type}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="">Todos los tipos</option>
            <option value="INCOME">Ingresos</option>
            <option value="EXPENSE">Gastos</option>
          </select>
          <select
            name="projectId"
            defaultValue={params.projectId}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="">Todos los proyectos</option>
            {filterData.projects.map(project => (
              <option key={project.id} value={project.id}>{project.title}</option>
            ))}
          </select>
          <select
            name="clientId"
            defaultValue={params.clientId}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="">Todos los clientes</option>
            {filterData.clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Filtrar
          </button>
        </form>
      </div>

      <Suspense fallback={<LoadingTable />}>
        <TransactionsTable searchParams={params} />
      </Suspense>
    </div>
  )
}
