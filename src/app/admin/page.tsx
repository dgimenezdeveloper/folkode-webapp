import { Suspense } from 'react'
import { prisma } from '@/lib/db/prisma'
import { 
  FiFolder, 
  FiUsers, 
  FiDollarSign, 
  FiMessageSquare,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi'
import Link from 'next/link'

async function getStats() {
  const [
    totalProjects,
    activeProjects,
    totalClients,
    totalTransactions,
    pendingMessages,
    recentTransactions,
    recentProjects
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { status: 'IN_DEVELOPMENT' } }),
    prisma.client.count(),
    prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'INCOME' }
    }),
    prisma.contactMessage.count({ where: { status: 'PENDING' } }),
    prisma.transaction.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { client: true, project: true }
    }),
    prisma.project.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: { client: true }
    })
  ])

  const totalExpenses = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: 'EXPENSE' }
  })

  return {
    totalProjects,
    activeProjects,
    totalClients,
    totalIncome: totalTransactions._sum.amount || 0,
    totalExpenses: totalExpenses._sum.amount || 0,
    pendingMessages,
    recentTransactions,
    recentProjects
  }
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType,
  href
}: { 
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  href?: string
}) {
  const content = (
    <div className="bg-[#0f1520] rounded-2xl p-6 border-2 border-[#1e2a3a] hover:border-[#86A869]/30 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          {change && (
            <div className={`flex items-center gap-1.5 mt-3 text-sm font-medium ${
              changeType === 'positive' ? 'text-green-400' :
              changeType === 'negative' ? 'text-red-400' :
              'text-gray-400'
            }`}>
              {changeType === 'positive' && <FiTrendingUp className="w-4 h-4" />}
              {changeType === 'negative' && <FiTrendingDown className="w-4 h-4" />}
              <span>{change}</span>
            </div>
          )}
        </div>
        <div className="p-4 bg-gradient-to-br from-[#86A869]/20 to-[#3383B7]/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-[#86A869]" />
        </div>
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
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

async function DashboardContent() {
  const stats = await getStats()
  const balance = stats.totalIncome - stats.totalExpenses

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Proyectos Totales"
          value={stats.totalProjects}
          icon={FiFolder}
          change={`${stats.activeProjects} en desarrollo`}
          changeType="neutral"
          href="/admin/proyectos"
        />
        <StatCard
          title="Clientes"
          value={stats.totalClients}
          icon={FiUsers}
          href="/admin/clientes"
        />
        <StatCard
          title="Ingresos Totales"
          value={formatCurrency(stats.totalIncome)}
          icon={FiDollarSign}
          change={`Balance: ${formatCurrency(balance)}`}
          changeType={balance >= 0 ? 'positive' : 'negative'}
          href="/admin/finanzas"
        />
        <StatCard
          title="Mensajes Pendientes"
          value={stats.pendingMessages}
          icon={FiMessageSquare}
          change={stats.pendingMessages > 0 ? 'Requieren atención' : 'Todo al día'}
          changeType={stats.pendingMessages > 0 ? 'negative' : 'positive'}
          href="/admin/mensajes"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-[#0f1520] rounded-2xl border-2 border-[#1e2a3a] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#1e2a3a] flex items-center justify-between">
            <h3 className="font-bold text-white">Proyectos Recientes</h3>
            <Link href="/admin/proyectos" className="text-sm text-[#86A869] hover:text-[#9BC277] font-medium transition-colors">
              Ver todos →
            </Link>
          </div>
          <div className="divide-y divide-[#1e2a3a]">
            {stats.recentProjects.length > 0 ? (
              stats.recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/proyectos/${project.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-[#1e2a3a]/50 transition-colors"
                >
                  <div className={`p-2.5 rounded-xl ${
                    project.status === 'COMPLETED' ? 'bg-green-500/15' :
                    project.status === 'IN_DEVELOPMENT' ? 'bg-blue-500/15' :
                    project.status === 'MAINTENANCE' ? 'bg-yellow-500/15' :
                    'bg-gray-500/15'
                  }`}>
                    {project.status === 'COMPLETED' ? (
                      <FiCheckCircle className={`w-5 h-5 ${
                        project.status === 'COMPLETED' ? 'text-green-400' :
                        project.status === 'IN_DEVELOPMENT' ? 'text-blue-400' :
                        project.status === 'MAINTENANCE' ? 'text-yellow-400' :
                        'text-gray-400'
                      }`} />
                    ) : (
                      <FiClock className="w-5 h-5 text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{project.title}</p>
                    <p className="text-sm text-gray-500">
                      {project.client?.name || 'Sin cliente'} • {formatDate(project.updatedAt)}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${
                    project.status === 'COMPLETED' ? 'bg-green-500/15 text-green-400' :
                    project.status === 'IN_DEVELOPMENT' ? 'bg-blue-500/15 text-blue-400' :
                    project.status === 'MAINTENANCE' ? 'bg-yellow-500/15 text-yellow-400' :
                    'bg-gray-500/15 text-gray-400'
                  }`}>
                    {project.status === 'COMPLETED' ? 'Completado' :
                     project.status === 'IN_DEVELOPMENT' ? 'En desarrollo' :
                     project.status === 'MAINTENANCE' ? 'Mantenimiento' :
                     'Pausado'}
                  </span>
                </Link>
              ))
            ) : (
              <div className="px-6 py-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#1e2a3a] flex items-center justify-center">
                  <FiFolder className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-500 mb-2">No hay proyectos todavía</p>
                <Link href="/admin/proyectos/nuevo" className="text-[#86A869] hover:text-[#9BC277] font-medium text-sm transition-colors">
                  Crear primer proyecto →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#0f1520] rounded-2xl border-2 border-[#1e2a3a] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#1e2a3a] flex items-center justify-between">
            <h3 className="font-bold text-white">Transacciones Recientes</h3>
            <Link href="/admin/finanzas" className="text-sm text-[#86A869] hover:text-[#9BC277] font-medium transition-colors">
              Ver todas →
            </Link>
          </div>
          <div className="divide-y divide-[#1e2a3a]">
            {stats.recentTransactions.length > 0 ? (
              stats.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <div className={`p-2.5 rounded-xl ${
                    transaction.type === 'INCOME' ? 'bg-green-500/15' : 'bg-red-500/15'
                  }`}>
                    {transaction.type === 'INCOME' ? (
                      <FiTrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <FiTrendingDown className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.client?.name || transaction.project?.title || 'General'} • {formatDate(transaction.date)}
                    </p>
                  </div>
                  <span className={`font-bold ${
                    transaction.type === 'INCOME' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-6 py-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#1e2a3a] flex items-center justify-center">
                  <FiDollarSign className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-500 mb-2">No hay transacciones todavía</p>
                <Link href="/admin/finanzas/nueva" className="text-[#86A869] hover:text-[#9BC277] font-medium text-sm transition-colors">
                  Registrar primera transacción →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#0f1520] rounded-2xl border-2 border-[#1e2a3a] p-4 sm:p-6">
        <h3 className="font-bold text-white mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/admin/proyectos/nuevo"
            className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-[#1e2a3a] hover:border-[#86A869]/50 hover:bg-[#86A869]/5 transition-all duration-300 group"
          >
            <div className="p-3 rounded-xl bg-[#1e2a3a] group-hover:bg-[#86A869]/20 transition-colors">
              <FiFolder className="w-7 h-7 text-[#86A869]" />
            </div>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Nuevo Proyecto</span>
          </Link>
          <Link
            href="/admin/clientes/nuevo"
            className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-[#1e2a3a] hover:border-[#3383B7]/50 hover:bg-[#3383B7]/5 transition-all duration-300 group"
          >
            <div className="p-3 rounded-xl bg-[#1e2a3a] group-hover:bg-[#3383B7]/20 transition-colors">
              <FiUsers className="w-7 h-7 text-[#3383B7]" />
            </div>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Nuevo Cliente</span>
          </Link>
          <Link
            href="/admin/finanzas/nueva"
            className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-[#1e2a3a] hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300 group"
          >
            <div className="p-3 rounded-xl bg-[#1e2a3a] group-hover:bg-green-500/20 transition-colors">
              <FiDollarSign className="w-7 h-7 text-green-400" />
            </div>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Nueva Transacción</span>
          </Link>
          <Link
            href="/admin/mensajes"
            className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-[#1e2a3a] hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 group"
          >
            <div className="p-3 rounded-xl bg-[#1e2a3a] group-hover:bg-purple-500/20 transition-colors">
              <FiMessageSquare className="w-7 h-7 text-purple-400" />
            </div>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Ver Mensajes</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-[#0f1520] rounded-2xl p-6 border-2 border-[#1e2a3a] animate-pulse">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="h-4 w-24 bg-[#1e2a3a] rounded-lg"></div>
                <div className="h-8 w-16 bg-[#1e2a3a] rounded-lg"></div>
              </div>
              <div className="p-4 bg-[#1e2a3a] rounded-xl">
                <div className="w-6 h-6 bg-[#2a3a4a] rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-500 mt-1">Bienvenido al panel de administración de Folkode</p>
      </div>
      
      <Suspense fallback={<LoadingState />}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}
