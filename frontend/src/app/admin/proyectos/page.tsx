import { Suspense } from 'react'
import Link from 'next/link'
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiExternalLink, FiEye, FiFolder } from 'react-icons/fi'
import { ProjectCategory, ProjectStatus } from '@/lib/db/types'
import DeleteProjectButton from './DeleteProjectButton'

interface SearchParams {
  search?: string
  category?: ProjectCategory
  status?: ProjectStatus
}

async function getProjects(searchParams: SearchParams) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
  if (searchParams.search) url.searchParams.append('search', searchParams.search)
  if (searchParams.category) url.searchParams.append('category', searchParams.category)
  if (searchParams.status) url.searchParams.append('status', searchParams.status)
  const res = await fetch(url.toString())
  if (!res.ok) return []
  return res.json()
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

async function ProjectsTable({ searchParams }: { searchParams: SearchParams }) {
  const projects = await getProjects(searchParams)

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
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Proyecto</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Cliente</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Categoría</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Estado</th>
              <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.map((project: import('@/types').ProjectCardData) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {project.images[0] ? (
                        <img 
                          src={project.images[0].url} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FiFolder className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{project.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{project.shortDesc}...</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">—</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700">{categoryLabels[project.category]}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                    {statusLabels[project.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Ver sitio"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <Link
                      href={`/admin/proyectos/${project.id}`}
                      className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <FiEye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/proyectos/${project.id}/editar`}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                    <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
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
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
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

export default async function ProjectsPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
          <p className="text-gray-600 mt-1">Gestiona todos los proyectos de Folkode</p>
        </div>
        <Link
          href="/admin/proyectos/nuevo"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
        >
          <FiPlus className="w-5 h-5" />
          Nuevo Proyecto
        </Link>
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
              placeholder="Buscar proyectos..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <select
            name="category"
            defaultValue={params.category}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="">Todas las categorías</option>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <select
            name="status"
            defaultValue={params.status}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="">Todos los estados</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
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
        <ProjectsTable searchParams={params} />
      </Suspense>
    </div>
  )
}
