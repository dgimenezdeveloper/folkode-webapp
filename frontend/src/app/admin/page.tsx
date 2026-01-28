import { Suspense } from 'react'
import Link from 'next/link'
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

async function getStats() {
  try {
    const response = await fetch(`${API_URL}/api/stats`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      throw new Error('Error al obtener estadísticas')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {
      totalProjects: 0,
      activeProjects: 0,
      totalClients: 0,
      totalIncome: 0,
      totalExpenses: 0,
      pendingMessages: 0,
      recentTransactions: [],
      recentProjects: []
    }
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
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Recent Projects */}
        <div className="bg-[#10182a] rounded-3xl border-2 border-[#1e2a3a] shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-[#1e2a3a] flex items-center justify-between">
            <h3 className="font-bold text-xl text-white">Proyectos Recientes</h3>
            <Link href="/admin/proyectos" className="text-sm text-[#86A869] hover:text-[#9BC277] font-medium transition-colors">
              Ver todos →
            </Link>
          </div>
          <div className="divide-y divide-[#1e2a3a]">
            {stats.recentProjects.length > 0 ? (
              stats.recentProjects.map((project: {
                id: string;
                title: string;
                status: string;
                client?: { name?: string };
                updatedAt: string | Date;
              }) => (
                <Link
                  key={project.id}
                  href={`/admin/proyectos/${project.id}`}
                  className="flex items-center gap-4 px-8 py-5 hover:bg-[#1e2a3a]/60 transition-colors"
                >
                  <div className={`p-3 rounded-xl ${
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
                    <p className="font-semibold text-white truncate text-lg">{project.title}</p>
                    <p className="text-sm text-gray-400">
                      {project.client?.name || 'Sin cliente'} • {formatDate(typeof project.updatedAt === 'string' ? new Date(project.updatedAt) : project.updatedAt)}
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
              <div className="px-8 py-12 text-center">
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
        <div className="bg-[#10182a] rounded-3xl border-2 border-[#1e2a3a] shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-[#1e2a3a] flex items-center justify-between">
            <h3 className="font-bold text-xl text-white">Transacciones Recientes</h3>
            <Link href="/admin/finanzas" className="text-sm text-[#86A869] hover:text-[#9BC277] font-medium transition-colors">
              Ver todas →
            </Link>
          </div>
          <div className="divide-y divide-[#1e2a3a]">
            {stats.recentTransactions.length > 0 ? (
              stats.recentTransactions.map((transaction: {
                id: string;
                type: string;
                description: string;
                amount: number;
                date: string | Date;
                client?: { name?: string };
                project?: { title?: string };
              }) => (
                <div
                  key={transaction.id}
                  className="flex items-center gap-4 px-8 py-5"
                >
                  <div className={`p-3 rounded-xl ${
                    transaction.type === 'INCOME' ? 'bg-green-500/15' : 'bg-red-500/15'
                  }`}>
                    {transaction.type === 'INCOME' ? (
                      <FiTrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <FiTrendingDown className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate text-lg">{transaction.description}</p>
                    <p className="text-sm text-gray-400">
                      {transaction.client?.name || transaction.project?.title || 'General'} • {formatDate(typeof transaction.date === 'string' ? new Date(transaction.date) : transaction.date)}
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
              <div className="px-8 py-12 text-center">
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
      <div className="bg-[#10182a] rounded-3xl border-2 border-[#1e2a3a] shadow-xl p-6">
        <h3 className="font-bold text-lg text-white mb-6">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <Link
            href="/admin/proyectos/nuevo"
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-[#1e2a3a] hover:border-[#86A869]/50 hover:bg-[#86A869]/10 transition-all duration-300 group"
          >
            <div className="p-4 rounded-xl bg-[#1e2a3a] group-hover:bg-[#86A869]/20 transition-colors">
              <FiFolder className="w-7 h-7 text-[#86A869]" />
            </div>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Nuevo Proyecto</span>
          </Link>
          <Link
            href="/admin/clientes/nuevo"
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-[#1e2a3a] hover:border-[#3383B7]/50 hover:bg-[#3383B7]/10 transition-all duration-300 group"
          >
            <div className="p-4 rounded-xl bg-[#1e2a3a] group-hover:bg-[#3383B7]/20 transition-colors">
              <FiUsers className="w-7 h-7 text-[#3383B7]" />
            </div>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Nuevo Cliente</span>
          </Link>
          <Link
            href="/admin/finanzas/nueva"
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-[#1e2a3a] hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 group"
          >
            <div className="p-4 rounded-xl bg-[#1e2a3a] group-hover:bg-green-500/20 transition-colors">
              <FiDollarSign className="w-7 h-7 text-green-400" />
            </div>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">Nueva Transacción</span>
          </Link>
          <Link
            href="/admin/mensajes"
            className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-[#1e2a3a] hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 group"
          >
            <div className="p-4 rounded-xl bg-[#1e2a3a] group-hover:bg-purple-500/20 transition-colors">
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
