'use client'

import { useState, useEffect } from 'react'
import { useSession, SessionProvider } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FiHome, 
  FiFolder, 
  FiUsers, 
  FiDollarSign, 
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown
} from 'react-icons/fi'
import { signOut } from 'next-auth/react'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: { name: string; href: string }[]
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: FiHome },
  { 
    name: 'Proyectos', 
    href: '/admin/proyectos', 
    icon: FiFolder,
    children: [
      { name: 'Todos los proyectos', href: '/admin/proyectos' },
      { name: 'Crear proyecto', href: '/admin/proyectos/nuevo' },
    ]
  },
  { 
    name: 'Clientes', 
    href: '/admin/clientes', 
    icon: FiUsers,
    children: [
      { name: 'Todos los clientes', href: '/admin/clientes' },
      { name: 'Agregar cliente', href: '/admin/clientes/nuevo' },
    ]
  },
  { 
    name: 'Finanzas', 
    href: '/admin/finanzas', 
    icon: FiDollarSign,
    children: [
      { name: 'Transacciones', href: '/admin/finanzas' },
      { name: 'Nueva transacción', href: '/admin/finanzas/nueva' },
    ]
  },
  { name: 'Mensajes', href: '/admin/mensajes', icon: FiMessageSquare },
  { name: 'Configuración', href: '/admin/configuracion', icon: FiSettings },
]

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [status, router, pathname])

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    )
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  // Allow login page without authentication
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-[#86A869] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] relative lg:flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-full w-72 bg-[#0f1520] border-r border-[#1e2a3a] transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:h-auto lg:top-0 lg:flex-shrink-0
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-[#1e2a3a]">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#86A869] to-[#3383B7] p-0.5">
              <div className="w-full h-full rounded-[10px] bg-[#0f1520] flex items-center justify-center">
                <Image
                  src="/folkode-logo.webp"
                  alt="Folkode"
                  width={24}
                  height={24}
                  className="rounded"
                />
              </div>
            </div>
            <div>
              <span className="text-white font-bold text-lg">Folkode</span>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1e2a3a] transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive(item.href) 
                          ? 'bg-gradient-to-r from-[#86A869]/20 to-[#3383B7]/20 text-white border border-[#86A869]/30' 
                          : 'text-gray-400 hover:bg-[#1e2a3a] hover:text-white'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${isActive(item.href) ? 'text-[#86A869]' : ''}`} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        expandedItems.includes(item.name) ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {expandedItems.includes(item.name) && (
                      <ul className="mt-2 ml-4 space-y-1 border-l-2 border-[#1e2a3a]">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.href}
                              className={`
                                block px-4 py-2.5 ml-2 rounded-lg text-sm transition-all duration-200
                                ${pathname === child.href 
                                  ? 'bg-[#86A869]/15 text-[#86A869] font-medium' 
                                  : 'text-gray-500 hover:text-white hover:bg-[#1e2a3a]'}
                              `}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive(item.href) 
                        ? 'bg-gradient-to-r from-[#86A869]/20 to-[#3383B7]/20 text-white border border-[#86A869]/30' 
                        : 'text-gray-400 hover:bg-[#1e2a3a] hover:text-white'}
                    `}
                  >
                    <item.icon className={`w-5 h-5 ${isActive(item.href) ? 'text-[#86A869]' : ''}`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="border-t border-[#1e2a3a] p-4 mx-4 mb-4">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-[#1e2a3a]/50">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#86A869] to-[#3383B7] flex items-center justify-center text-white font-bold text-lg">
              {session?.user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold truncate">{session?.user?.name || 'Admin'}</p>
              <p className="text-gray-500 text-sm truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-gray-400 hover:text-white bg-[#1e2a3a]/50 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all duration-200"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 transition-all duration-300">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex items-center h-20 px-6 bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-[#1e2a3a]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1e2a3a] mr-4 transition-colors"
          >
            <FiMenu size={22} />
          </button>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">
              {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
            </h1>
            <p className="text-sm text-gray-500">
              Panel de administración
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              target="_blank"
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-[#1e2a3a] hover:bg-[#2a3a4a] rounded-lg transition-all duration-200"
            >
              Ver sitio →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto w-full min-h-[calc(100vh-5rem)]">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  )
}
