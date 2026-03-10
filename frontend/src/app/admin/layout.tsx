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
  FiChevronDown,
  FiChevronRight,
  FiExternalLink
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

  const pathSegments = pathname.split('/').filter(Boolean)

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
    navigation.forEach(item => {
      if (item.children?.some(child => pathname === child.href)) {
        if (!expandedItems.includes(item.name)) {
          setExpandedItems(prev => [...prev, item.name])
        }
      }
    })
  }, [status, router, pathname])

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    )
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  if (pathname === '/admin/login') return <>{children}</>
  if (status === 'loading') return null

  return (
    <div className="min-h-screen bg-[#060912] flex font-sans selection:bg-[#86A869]/30">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar con ancho optimizado */}
      <aside className={`
        fixed top-0 left-0 z-40 h-full w-72 bg-[#0d121f]/98 border-r border-white/5 transform transition-all duration-500 ease-out flex flex-col backdrop-blur-2xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="h-24 flex items-center px-8">
          <Link href="/admin" className="flex items-center gap-4 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#86A869] to-[#3383B7] p-[1px] shadow-2xl shadow-[#86A869]/20 transition-transform duration-300">
              <div className="w-full h-full rounded-[14px] bg-[#0d121f] flex items-center justify-center">
                <Image src="/folkode-logo.webp" alt="Folkode" width={24} height={24} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-xl tracking-tight">Folkode</span>
              <span className="text-[10px] text-[#86A869] font-bold tracking-[3px] uppercase opacity-80">Admin</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-8">
          <ul className="space-y-5">
            {navigation.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.name} className="relative group/item">
                  {active && (
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-10 bg-[#86A869] rounded-r-full blur-[1px] shadow-[4px_0_20px_rgba(134,168,105,0.7)]" />
                  )}
                  
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className={`
                          w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300
                          ${active 
                            ? 'bg-white/5 text-white ring-1 ring-white/10' 
                            : 'text-gray-500 hover:text-white hover:bg-white/5'}
                        `}
                      >
                        <div className="flex items-center gap-5">
                          <item.icon className={`w-5 h-5 transition-all ${active ? 'text-[#86A869] scale-110' : ''}`} />
                          <span className={`text-[15px] tracking-wide ${active ? 'font-bold' : 'font-medium'}`}>{item.name}</span>
                        </div>
                        <FiChevronDown className={`w-4 h-4 transition-transform duration-500 ${expandedItems.includes(item.name) ? 'rotate-180 text-[#86A869]' : 'opacity-30'}`} />
                      </button>
                      
                      {expandedItems.includes(item.name) && (
                        <ul className="mt-3 ml-7 space-y-2 border-l border-white/5">
                          {item.children.map((child) => {
                            const childActive = pathname === child.href
                            return (
                              <li key={child.name}>
                                <Link
                                  href={child.href}
                                  className={`
                                    flex items-center gap-3 px-5 py-3 ml-3 rounded-xl text-[13px] transition-all duration-300
                                    ${childActive 
                                      ? 'text-[#86A869] font-bold bg-[#86A869]/10' 
                                      : 'text-gray-500 hover:text-white hover:bg-white/5 hover:translate-x-1'}
                                  `}
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                                    childActive ? 'bg-[#86A869] shadow-[0_0_8px_#86A869]' : 'bg-transparent'
                                  }`} />
                                  {child.name}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`
                        flex items-center gap-5 px-5 py-4 rounded-2xl transition-all duration-300
                        ${active 
                          ? 'bg-white/5 text-white ring-1 ring-white/10' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'}
                      `}
                    >
                      <item.icon className={`w-5 h-5 transition-all ${active ? 'text-[#86A869] scale-110' : ''}`} />
                      <span className={`text-[15px] tracking-wide ${active ? 'font-bold' : 'font-medium'}`}>{item.name}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-6 border-t border-white/5">
          <div className="bg-[#121826] rounded-3xl p-5 border border-white/5 shadow-2xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#86A869] to-[#3383B7] flex items-center justify-center text-white font-black shadow-lg">
                {session?.user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[14px] font-bold truncate leading-none mb-1">{session?.user?.name || 'Admin'}</p>
                <span className="text-[#86A869] text-[9px] font-black uppercase tracking-widest bg-[#86A869]/10 px-2 py-0.5 rounded-md">Activo</span>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-2xl bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-gray-400 hover:text-red-400 transition-all duration-300 font-bold text-[11px]"
            >
              <FiLogOut size={14} />
              CERRAR SESIÓN
            </button>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 px-8 flex items-center justify-between bg-[#060912]/90 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-3 text-gray-400 hover:text-white bg-white/5 rounded-2xl transition-colors">
              <FiMenu size={20} />
            </button>
            
            <nav className="hidden sm:flex items-center gap-3 text-sm">
              <span className="text-gray-500 font-medium">Panel</span>
              {pathSegments.slice(1).map((segment, i) => (
                <div key={segment} className="flex items-center gap-3">
                  <FiChevronRight className="text-gray-700" size={14} />
                  <span className={`capitalize font-bold tracking-tight ${i === pathSegments.length - 2 ? 'text-[#86A869]' : 'text-gray-400'}`}>
                    {segment.replace(/-/g, ' ')}
                  </span>
                </div>
              ))}
            </nav>
          </div>

          {/* BOTÓN "VER SITIO" REPARADO - CENTRADO PIXEL PERFECT */}
          <Link 
            href="/" 
            target="_blank" 
            className="group flex items-center justify-center gap-3 px-6 h-10 rounded-full bg-gradient-to-r from-[#86A869] to-[#3383B7] text-[#060912] font-black text-[11px] tracking-widest shadow-lg shadow-[#86A869]/20 hover:scale-[1.05] transition-all duration-300 whitespace-nowrap"
          >
            <span className="inline-flex items-center justify-center h-full pt-[0.5px]">VER SITIO</span>
            <FiExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
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