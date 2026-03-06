
import Link from 'next/link'
import Image from 'next/image'
import { FiPlus, FiMoreVertical, FiEdit2, FiExternalLink, FiEye, FiFolder } from 'react-icons/fi'
import { ProjectCategory, ProjectStatus } from '@/lib/db/types'
import DeleteProjectButton from './DeleteProjectButton'
import type { ProjectCardData } from '@/types'
import { projectService } from '@/services/project.service'
import ProjectsFilters from './ProjectsFilters'
import { auth } from '@/lib/auth/auth'
import type { Project } from '@/types'
import ProjectsLoading from './loading'
type SortableProjectFields =
  | 'title'
  | 'category'
  | 'status'
  | 'createdAt'
  | 'clientName'

interface SearchParams {
  search?: string
  category?: ProjectCategory
  status?: ProjectStatus
  client?: string
  from?: string
  to?: string
  sort?: SortableProjectFields
  order?: 'asc' | 'desc'
  page?: string
  limit?: string
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
  IN_DEVELOPMENT: 'bg-blue-900 text-blue-100',
  COMPLETED: 'bg-green-900 text-green-100',
  MAINTENANCE: 'bg-yellow-900 text-yellow-100',
  PAUSED: 'bg-gray-800 text-gray-100'
}


const ITEMS_PER_PAGE = 8

async function ProjectsTable({ searchParams }: { searchParams: SearchParams }) {

  const parsedParams = {
    page: searchParams.page ? Number(searchParams.page) : undefined,
    limit: searchParams.limit ? Number(searchParams.limit) : undefined,
    search: searchParams.search,
    category: searchParams.category,
    status: searchParams.status,
  }

  const session = await auth()

  const token = (session as { accessToken?: string })?.accessToken

  let projects: Project[] = []

  try {
    const response = await projectService.getProjects(parsedParams, token)
    projects = 'data' in response ? response.data : response
  } catch (error) {
    console.error('Error fetching projects:', error)
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="bg-red-900 text-red-100 p-4 rounded-lg"
      >
        No se pudieron cargar los proyectos.
      </div>
    )
  }

  const {
    from,
    to,
    sort,
    order = 'asc'
  } = searchParams



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
      const getValue = (project: Project) => {
        if (sort === 'clientName') {
          return project.client?.name ?? ''
        }

        if (sort === 'createdAt') {
          return new Date(project.createdAt).getTime()
        }

        return project[sort]
      }

      const valueA = getValue(a)
      const valueB = getValue(b)

      if (valueA === valueB) return 0

      const comparison = valueA > valueB ? 1 : -1
      return order === 'asc' ? comparison : -comparison
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

  if (paginatedProjects.length === 0) {
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
    <div className="bg-[#0d1421] rounded-xl shadow-sm border border-white/5 overflow-hidden">
      <div className="overflow-x-auto ">
        <table
          className="w-full hidden md:table"
          aria-describedby="projects-table-description">
          <caption className="sr-only">
            Lista de proyectos con opciones de ordenamiento y acciones
          </caption>
          <thead className="border-b border-gray-100 text-left">
            <tr className="border-b border-white/5 bg-white/2">
              <th className="flex-1 !px-6 !py-4 text-bold text-[1.2rem]"
                scope="col"
                aria-sort={
                  searchParams.sort === 'title'
                    ? searchParams.order === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }>
                <Link href={createSortLink('title')} className='!text-slate-300'>
                  Proyecto
                </Link>
              </th>
              <th className="!px-6 !py-4 text-bold text-[1.2rem]"
                scope="col"
                aria-sort={
                  searchParams.sort === 'clientName'
                    ? searchParams.order === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }>
                <Link href={createSortLink('clientName')} className='!text-slate-300'>
                  Cliente
                </Link>
              </th>
              <th className="!px-6 !py-4 text-bold text-[1.2rem] md:hidden lg:table-cell"
                scope="col"
                aria-sort={
                  searchParams.sort === 'category'
                    ? searchParams.order === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }>
                <Link href={createSortLink('category')} className='!text-slate-300'>
                  Categoría
                </Link>
              </th>
              <th className="!px-6 !py-4 text-bold text-[1.2rem]"
                scope="col"
                aria-sort={
                  searchParams.sort === 'status'
                    ? searchParams.order === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }>
                <Link href={createSortLink('status')} className='!text-slate-300'>
                  Estado
                </Link>
              </th>
              <th className="text-center !px-6 !py-4 text-sm font-bold text-slate-300 text-[1.2rem]">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedProjects.map((project) => (
              <tr key={project.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors border-white/5 flex flex-wrap sm:table-row">
                <td className="!px-2.5 md:!px-3 lg:!px-6 !py-8 w-full sm:w-auto ">
                  <div className="flex items-center gap-3 ">
                    <div className="w-12 h-12 bg-[#161f30] border-white/5 rounded-lg overflow-hidden flex-shrink-0">
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
                      <p className="font-medium !text-white !font-bold !mb-0 !w-full md:!w-40 lg:!w-full">{project.title}</p>
                      <p className="text-sm text-slate-500 truncate max-w-xs !mb-0 !w-full md:!w-40 lg:!w-full">{project.shortDesc ?? ''}...</p>
                    </div>
                  </div>
                </td>
                <td className="!px-2.5 md:!px-3 lg:!px-6 !py-1 md:!py-4 !w-full">
                  <span className="text-slate-300 !w-fit">{project.client?.name}</span>
                </td>
                <td className="!px-2.5 md:!px-3 lg:!px-6 !py-1 md:!py-4 !w-full">
                  <span className="text-slate-400 !w-fit">{categoryLabels[project.category]}</span>
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
                        className="!p-2 !text-gray-500 hover:text-primary hover:!bg-green-600/20 hover:!text-green-600 rounded-lg transition-colors"
                        title="Ver sitio"
                      >
                        <FiExternalLink className="w-4 h-4" aria-label="Ver sitio del proyecto" />
                      </a>
                    )}
                    <Link
                      href={`/admin/proyectos/${project.id}`}
                      className="!p-2 !text-gray-500 hover:text-primary hover:!bg-blue-600/20 hover:!text-blue-600 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <FiEye className="w-4 h-4" aria-label="Ver detalles del proyecto" />
                    </Link>
                    <Link
                      href={`/admin/proyectos/${project.id}/editar`}
                      className="!p-2 !text-gray-500 hover:text-blue-600 hover:!bg-orange-500/20 hover:!text-orange-600 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 className="w-4 h-4" aria-label="Editar proyecto" />
                    </Link>
                    <DeleteProjectButton projectId={project.id} projectTitle={project.title} styles='hover:!bg-red !text-gray-500' />
                  </div>
                  <details className="relative lg:hidden flex items-center justify-center">
                    <summary
                      className="list-none cursor-pointer p-2"
                      aria-label={`Abrir acciones para ${project.title}`}>
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
        <div className="flex flex-col gap-5 md:hidden p-4 space-y-4">
          {paginatedProjects.map((project) => (
            <div key={project.id} className="bg-gray-50 rounded-lg !py-4 !px-2">
              <div className="flex gap-3 mb-2">
                <div className="w-12 h-12 bg-gray-100 rounded-lg self-start !mt-[2rem] overflow-hidden flex-shrink-0">
                  {project.images && project.images[0] ? (
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
                    <p className="text-sm text-gray-600">{project.client?.name}</p>
                    <p className="text-sm text-gray-600">{project.shortDesc ?? ''}</p>
                    <span className={`inline-flex justify-center items-center gap-2 !px-2.5 !py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                      <div className={`w-2 h-2 rounded-full ${statusColors[project.status].includes('bg-green') ? 'bg-green-500' : statusColors[project.status].includes('bg-yellow') ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                      {statusLabels[project.status]}
                    </span>
                  </div>
                  <div className="flex flex-col items-center !mt-[1rem] gap-2">
                    <details className="relative">
                      <summary
                        className="list-none cursor-pointer p-2"
                        aria-label={`Abrir acciones para ${project.title}`}>
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
        <div className="!w-full flex items-center justify-center !px-6 !py-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            {currentPage > 1 && (
              <Link
                href={{
                  query: { ...searchParams, page: currentPage - 1 }
                }}
                className="!px-3 !py-1.5 text-sm rounded-lg transition-colors"
                aria-label="Página anterior"
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
                    ? 'bg-[#a3b18a] !text-white'
                    : 'bg-[#161f30] hover:bg-[#a3b18a]/20 hover:!text-[#a3b18a]'
                    }`}
                  aria-current={pageNumber === currentPage ? 'page' : undefined}
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
                className="!px-3 !py-1.5 text-sm rounded-lg  transition-colors"
                aria-label="Página siguiente"
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
          <h1 className="!text-5xl font-bold text-white">Proyectos</h1>
          <p className="text-slate-500 mt-1">Gestiona todos los proyectos de Folkode</p>
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
      <div className="bg-[#0d1421]  rounded-xl shadow-sm border border-white/5 !p-4 !mb-6 flex flex-col md:flex-row justify-around flex-wrap gap-4">
        <ProjectsFilters />
      </div >


      <ProjectsTable searchParams={params} />
    </section >
  )
}
