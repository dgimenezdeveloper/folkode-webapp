
import Link from 'next/link'
import Image from 'next/image'
import { FiPlus, FiMoreVertical, FiSearch, FiEdit2, FiExternalLink, FiEye, FiFolder } from 'react-icons/fi'
import { ProjectCategory, ProjectStatus } from '@/lib/db/types'
import DeleteProjectButton from './DeleteProjectButton'
import type { ProjectCardData } from '@/types'

import { projectService } from '@/services/project.service'
import { auth } from '@/lib/auth/auth'

interface SearchParams {
  search?: string
  category?: ProjectCategory
  status?: ProjectStatus
  client?: string
  from?: string
  to?: string
  sort?: string
  order?: 'asc' | 'desc'
  page?: string
}

const statusLabels: Record<ProjectStatus, string> = {
  IN_DEVELOPMENT: 'En desarrollo',
  COMPLETED: 'Completado',
  MAINTENANCE: 'Mantenimiento',
  PAUSED: 'Pausado'
}

const categoryLabels: Record<ProjectCategory, string> = {
  ECOMMERCE: 'E-commerce',
  LANDING_PAGE: 'Landing Page',
  CORPORATIVO: 'Corporativo',
  MULTIMEDIA: 'Multimedia',
  WEB: 'Web',
  SOFTWARE: 'Software'
}

const statusColors: Record<ProjectStatus, string> = {
  IN_DEVELOPMENT: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  MAINTENANCE: 'bg-yellow-100 text-yellow-700',
  PAUSED: 'bg-gray-100 text-gray-700'
}

export const mockProjects: ProjectCardData[] = [
  {
    id: "proj_001",
    title: "E-commerce Tech Store",
    slug: "ecommerce-tech-store",
    shortDesc: "Tienda online con carrito y pagos integrados.",
    category: "ECOMMERCE",
    status: "IN_DEVELOPMENT",
    featured: true,
    demoUrl: "https://demo1.com",
    liveUrl: "https://live1.com",
    technologies: ["Next.js", "TypeScript", "Stripe"],
    images: [{ url: "/mock/project1.jpg", alt: "Ecommerce preview" }],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_002",
    title: "Landing Agencia Creativa",
    slug: "landing-agencia-creativa",
    shortDesc: "Landing moderna optimizada para conversión.",
    category: "LANDING_PAGE",
    status: "COMPLETED",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js", "TailwindCSS"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_003",
    title: "Sistema Gestión Clínica",
    slug: "sistema-gestion-clinica",
    shortDesc: "Software para administración médica.",
    category: "SOFTWARE",
    status: "MAINTENANCE",
    featured: true,
    demoUrl: "https://demo3.com",
    liveUrl: undefined,
    technologies: ["Next.js", "Prisma", "PostgreSQL"],
    images: [{ url: "/mock/project2.jpg", alt: "Sistema preview" }],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_004",
    title: "Portfolio Fotografía",
    slug: "portfolio-fotografia",
    shortDesc: "Sitio visual para fotógrafo profesional.",
    category: "MULTIMEDIA",
    status: "COMPLETED",
    featured: false,
    demoUrl: undefined,
    liveUrl: "https://live4.com",
    technologies: ["Next.js", "Framer Motion"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_005",
    title: "Web Corporativa Constructora",
    slug: "web-corporativa-constructora",
    shortDesc: "Página institucional para empresa constructora.",
    category: "CORPORATIVO",
    status: "IN_DEVELOPMENT",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js", "TypeScript"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_006",
    title: "App Gestión Turnos",
    slug: "app-gestion-turnos",
    shortDesc: "Aplicación web para gestión de citas.",
    category: "SOFTWARE",
    status: "PAUSED",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["React", "Node.js"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_007",
    title: "E-commerce Indumentaria",
    slug: "ecommerce-indumentaria",
    shortDesc: "Tienda online con catálogo dinámico.",
    category: "ECOMMERCE",
    status: "COMPLETED",
    featured: true,
    demoUrl: undefined,
    liveUrl: "https://live7.com",
    technologies: ["Next.js", "Stripe"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_008",
    title: "Landing SaaS",
    slug: "landing-saas",
    shortDesc: "Landing page para producto SaaS.",
    category: "LANDING_PAGE",
    status: "IN_DEVELOPMENT",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js", "TailwindCSS"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },

  // Página 2
  {
    id: "proj_009",
    title: "Sistema Inventario",
    slug: "sistema-inventario",
    shortDesc: "Control de stock y productos.",
    category: "SOFTWARE",
    status: "COMPLETED",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js", "Prisma"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_010",
    title: "Web Restaurante",
    slug: "web-restaurante",
    shortDesc: "Sitio institucional con menú digital.",
    category: "WEB",
    status: "COMPLETED",
    featured: false,
    demoUrl: undefined,
    liveUrl: "https://live10.com",
    technologies: ["Next.js"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_011",
    title: "Marketplace Servicios",
    slug: "marketplace-servicios",
    shortDesc: "Plataforma para contratación de servicios.",
    category: "ECOMMERCE",
    status: "IN_DEVELOPMENT",
    featured: true,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js", "Stripe", "Prisma"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_012",
    title: "App Fitness",
    slug: "app-fitness",
    shortDesc: "Seguimiento de entrenamientos.",
    category: "SOFTWARE",
    status: "PAUSED",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["React", "Firebase"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_013",
    title: "Landing Evento Tech",
    slug: "landing-evento-tech",
    shortDesc: "Página para inscripción a evento.",
    category: "LANDING_PAGE",
    status: "COMPLETED",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_014",
    title: "Sistema Facturación",
    slug: "sistema-facturacion",
    shortDesc: "Facturación electrónica empresarial.",
    category: "SOFTWARE",
    status: "MAINTENANCE",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js", "PostgreSQL"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_015",
    title: "Web Abogados",
    slug: "web-abogados",
    shortDesc: "Sitio profesional para estudio jurídico.",
    category: "CORPORATIVO",
    status: "COMPLETED",
    featured: false,
    demoUrl: undefined,
    liveUrl: "https://live15.com",
    technologies: ["Next.js"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_016",
    title: "Plataforma Educación",
    slug: "plataforma-educacion",
    shortDesc: "Cursos online con panel docente.",
    category: "SOFTWARE",
    status: "IN_DEVELOPMENT",
    featured: true,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js", "Stripe"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },

  // Página 3
  {
    id: "proj_017",
    title: "E-commerce Electrónica",
    slug: "ecommerce-electronica",
    shortDesc: "Venta online de dispositivos.",
    category: "ECOMMERCE",
    status: "COMPLETED",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_018",
    title: "Web Gimnasio",
    slug: "web-gimnasio",
    shortDesc: "Sitio institucional para gimnasio.",
    category: "WEB",
    status: "IN_DEVELOPMENT",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_019",
    title: "Sistema RRHH",
    slug: "sistema-rrhh",
    shortDesc: "Gestión de empleados y nómina.",
    category: "SOFTWARE",
    status: "MAINTENANCE",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js", "Prisma"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_020",
    title: "Landing Producto App",
    slug: "landing-producto-app",
    shortDesc: "Landing promocional para app móvil.",
    category: "LANDING_PAGE",
    status: "COMPLETED",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_021",
    title: "Web Clínica Dental",
    slug: "web-clinica-dental",
    shortDesc: "Sitio institucional con turnos online.",
    category: "WEB",
    status: "IN_DEVELOPMENT",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_022",
    title: "Sistema Reservas Hotel",
    slug: "sistema-reservas-hotel",
    shortDesc: "Plataforma de reservas online.",
    category: "SOFTWARE",
    status: "COMPLETED",
    featured: true,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js", "Stripe"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_023",
    title: "E-commerce Mascotas",
    slug: "ecommerce-mascotas",
    shortDesc: "Tienda online de productos para mascotas.",
    category: "ECOMMERCE",
    status: "PAUSED",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  },
  {
    id: "proj_024",
    title: "Web Arquitectura",
    slug: "web-arquitectura",
    shortDesc: "Portfolio digital para estudio de arquitectura.",
    category: "CORPORATIVO",
    status: "COMPLETED",
    featured: false,
    demoUrl: undefined,
    liveUrl: undefined,
    technologies: ["Next.js", "Framer Motion"],
    images: [],
    createdAt: "2025-01-10",
    client: "Tech Corp",
  }
]

const ITEMS_PER_PAGE = 8

async function ProjectsTable({ searchParams }: { searchParams: SearchParams }) {

  let projects = [...mockProjects]
  //const projects = await getProjects(searchParams)

  //let projects: import('@/types').Project[] = []
  //try {
  //  const response = await projectService.getProjects(searchParams, token)
  //  projects = 'data' in response ? response.data : response
  //} catch (error) {
  //  console.error('Error fetching projects:', error)
  //  throw new Error('No se pudieron cargar los proyectos. Por favor, intenta nuevamente.')
  //}

  const {
    search,
    category,
    status,
    client,
    from,
    to,
    sort,
    order = 'asc'
  } = searchParams

  // 🔎 Filtro por nombre
  if (search) {
    projects = projects.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
  }

  // 📂 Filtro por categoría
  if (category) {
    projects = projects.filter(p => p.category === category)
  }

  // 🚦 Filtro por estado
  if (status) {
    projects = projects.filter(p => p.status === status)
  }

  // 👤 Filtro por cliente
  if (client) {
    projects = projects.filter(p =>
      p.client?.toLowerCase().includes(client.toLowerCase())
    )
  }

  // 📅 Filtro por fecha
  if (from) {
    projects = projects.filter(p => new Date(p.createdAt) >= new Date(from))
  }

  if (to) {
    projects = projects.filter(p => new Date(p.createdAt) <= new Date(to))
  }

  // 🔃 Ordenamiento dinámico
  if (sort) {
    projects.sort((a, b) => {
      const valueA = a[sort as keyof typeof a]
      const valueB = b[sort as keyof typeof b]

      if (valueA < valueB) return order === 'asc' ? -1 : 1
      if (valueA > valueB) return order === 'asc' ? 1 : -1
      return 0
    })
  }

  const createSortLink = (field: string) => {
    const isActive = searchParams.sort === field
    const nextOrder =
      isActive && searchParams.order === 'asc' ? 'desc' : 'asc'

    return {
      query: {
        ...searchParams,
        sort: field,
        order: nextOrder
      }
    }
  }


  const currentPage = Number(searchParams.page ?? 1)
  const totalItems = projects.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  const paginatedProjects = projects.slice(start, end)

  const session = await auth()
  const token = (session as { accessToken?: string })?.accessToken

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
        <FiFolder className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay proyectos</h3>
        <p className="text-gray-500 mb-4">
          {searchParams.search || searchParams.category || searchParams.status
            ? 'No se encontraron proyectos con los filtros aplicados'
            : 'Comienza creando tu primer proyecto'}
        </p>
        <Link
          href="/admin/proyectos/nuevo"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Crear proyecto
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto ">
        <table className="w-full hidden sm:block">
          <thead className="bg-gray-50 border-b border-gray-100 text-left">
            <tr>
              <th className="flex-1 !px-6 !py-4 text-bold text-[1.2rem]">
                <Link href={createSortLink('title')} className='!text-gray-600'>
                  Proyecto
                </Link>
              </th>
              <th className="!px-6 !py-4 text-bold text-[1.2rem]">
                <Link href={createSortLink('client')} className='!text-gray-600'>
                  Cliente
                </Link>
              </th>
              <th className="!px-6 !py-4 text-bold text-[1.2rem] md:hidden lg:table-cell">
                <Link href={createSortLink('category')} className='!text-gray-600'>
                  Categoría
                </Link>
              </th>
              <th className="!px-6 !py-4 text-bold text-[1.2rem]">
                <Link href={createSortLink('status')} className='!text-gray-600'>
                  Estado
                </Link>
              </th>
              <th className="text-center !px-6 !py-4 text-sm font-bold text-gray-600 text-[1.2rem]">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedProjects.map((project: import('@/types').ProjectCardData) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors flex flex-wrap sm:table-row">
                <td className="!px-2.5 md:!px-3 lg:!px-6 !py-8 w-full sm:w-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {project.images && project.images[0] ? (
                        <Image
                          src={project.images[0].url}
                          alt={project.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiFolder className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className='flex flex-col'>
                      <p className="font-medium !text-black !font-bold !mb-0 !w-full md:!w-40 lg:!w-full">{project.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs !mb-0 !w-full md:!w-40 lg:!w-full">{project.shortDesc}...</p>
                    </div>
                  </div>
                </td>
                <td className="!px-2.5 md:!px-3 lg:!px-6 !py-1 md:!py-4 !w-full">
                  <span className="text-gray-700 !w-fit">{project.client}</span>
                </td>
                <td className="!px-2.5 md:!px-3 lg:!px-6 !py-1 md:!py-4 !w-full">
                  <span className="text-gray-700 !w-fit">{categoryLabels[project.category]}</span>
                </td>
                <td className="!px-2.5 md:!px-3 lg:!px-6 !py-1 md:!py-4 !w-full">
                  <span className={`inline-flex justify-center items-center gap-2 !px-2.5 !py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                    <div className={`w-2 h-2 rounded-full ${statusColors[project.status].includes('bg-green') ? 'bg-green-500' : statusColors[project.status].includes('bg-yellow') ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                    {statusLabels[project.status]}
                  </span>
                </td>
                <td className="!px-2.5 md:!px-3 lg:!px-6 !py-4 !w-full">
                  <div className="hidden lg:flex items-center justify-center lg:justify-end gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Ver sitio"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <Link
                      href={`/admin/proyectos/${project.id}`}
                      className="!p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <FiEye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/proyectos/${project.id}/editar`}
                      className="!p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
                  </div>
                  <details className="relative lg:hidden flex items-center justify-center">
                    <summary className="list-none cursor-pointer p-2">
                      <FiMoreVertical className="w-6 h-6 text-gray-500" />
                    </summary>

                    <div className="absolute right-0 gap-2 !p-2 !w-40 text-left bg-white shadow-lg rounded-lg border flex flex-col z-10">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="!p-2 flex items-center gap-2 hover:bg-gray-100"
                        >
                          <FiExternalLink className="w-4 h-4" />Ver sitio
                        </a>
                      )}

                      <Link
                        href={`/admin/proyectos/${project.id}`}
                        className="p-2 flex items-center gap-2 hover:bg-gray-100"
                      >
                        <FiEye className="w-4 h-4" />Ver detalles
                      </Link>

                      <Link
                        href={`/admin/proyectos/${project.id}/editar`}
                        className="p-2 flex items-center gap-2 hover:bg-gray-100"
                      >
                        <FiEdit2 className="w-4 h-4" />Editar
                      </Link>

                      <DeleteProjectButton
                        projectId={project.id}
                        projectTitle={project.title}
                        text="Eliminar"
                        styles="text-[#a3b18a] text-base"
                      />
                    </div>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile cards */}
        <div className="flex flex-col gap-5 sm:hidden p-4 space-y-4">
          {paginatedProjects.map((project: import('@/types').ProjectCardData) => (
            <div key={project.id} className="bg-gray-50 rounded-lg !py-4 !px-2">
              <div className="flex gap-3 mb-2">
                <div className="w-12 h-12 bg-gray-100 rounded-lg self-start !mt-[2rem] overflow-hidden flex-shrink-0">
                  {project.images[0] ? (
                    <Image
                      src={project.images[0].url}
                      alt={project.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FiFolder className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex">
                  <div className='min-w-0 w-full'>
                    <h3 className="font-medium !text-black !m-0 !mt-4 !mb-2 flex-1 w-full ">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.client}</p>
                    <p className="text-sm text-gray-600">{project.shortDesc}</p>
                    <span className={`inline-flex justify-center items-center gap-2 !px-2.5 !py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                      <div className={`w-2 h-2 rounded-full ${statusColors[project.status].includes('bg-green') ? 'bg-green-500' : statusColors[project.status].includes('bg-yellow') ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                      {statusLabels[project.status]}
                    </span>
                  </div>
                  <div className="flex flex-col items-center !mt-[1rem] gap-2">
                    <details className="relative">
                      <summary className="list-none cursor-pointer p-2">
                        <FiMoreVertical className="w-6 h-6 text-gray-500" />
                      </summary>

                      <div className="absolute right-0 gap-2 !p-2 w-40 text-left bg-white shadow-lg rounded-lg border flex flex-col z-10">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 flex items-center gap-2 hover:bg-gray-100"
                          >
                            <FiExternalLink className="w-4 h-4" />Ver sitio
                          </a>
                        )}

                        <Link
                          href={`/admin/proyectos/${project.id}`}
                          className="p-2 flex items-center gap-2 hover:bg-gray-100"
                        >
                          <FiEye className="w-4 h-4" />Ver detalles
                        </Link>

                        <Link
                          href={`/admin/proyectos/${project.id}/editar`}
                          className="p-2 flex items-center gap-2 hover:bg-gray-100"
                        >
                          <FiEdit2 className="w-4 h-4" />Editar
                        </Link>

                        <DeleteProjectButton
                          projectId={project.id}
                          projectTitle={project.title}
                          text="Eliminar"
                          styles="text-[#a3b18a] text-base"
                        />
                      </div>
                    </details>


                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="!w-full flex items-center justify-center !px-6 !py-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {currentPage > 1 && (
              <Link
                href={{
                  query: { ...searchParams, page: currentPage - 1 }
                }}
                className="!px-3 !py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Anterior
              </Link>
            )}

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1

              return (
                <Link
                  key={pageNumber}
                  href={{
                    query: { ...searchParams, page: pageNumber }
                  }}
                  className={`!px-3 !py-1.5 text-sm rounded-lg transition-colors ${pageNumber === currentPage
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {pageNumber}
                </Link>
              )
            })}

            {currentPage < totalPages && (
              <Link
                href={{
                  query: { ...searchParams, page: currentPage + 1 }
                }}
                className="!px-3 !py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Siguiente
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


export default async function ProjectsPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  return (
    <section className='!p-5'>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="!text-5xl font-bold text-gray-900">Proyectos</h1>
          <p className="text-gray-600 mt-1">Gestiona todos los proyectos de Folkode</p>
        </div>
        <Link
          href="/admin/proyectos/nuevo"
          className="inline-flex items-center border !mb-2 gap-2 !px-4 !py-2.5 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
        >
          <FiPlus className="w-5 h-5" />
          Nuevo Proyecto
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 !p-4 !mb-6">
        <form className="flex flex-col md:flex-row justify-around flex-wrap gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="search"
              defaultValue={params.search}
              placeholder="Buscar proyectos..."
              className="w-full !pl-10 !pr-4 !py-2.5 border !text-[black] border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <input
            type="text"
            name="client"
            defaultValue={params.client}
            placeholder="Cliente..."
            className="!px-2 !py-2.5 border text-[black] border-gray-300 rounded-lg"
          />
          <select
            name="category"
            defaultValue={params.category}
            className="!px-2 !py-2.5 border text-[black] border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="">Todas las categorías</option>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <select
            name="status"
            defaultValue={params.status}
            className="!px-2 !py-2.5 border text-[black] border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="">Todos los estados</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>


          <input
            type="date"
            name="from"
            defaultValue={params.from}
            className="!px-2 !py-2.5 border text-[black] border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            className="!px-2 !py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Filtrar
          </button>
        </form>
      </div>

      <ProjectsTable searchParams={params} />
    </section>
  )
}
