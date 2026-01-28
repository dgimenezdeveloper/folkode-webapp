import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  FiArrowLeft, 
  FiEdit2, 
  FiExternalLink, 
  FiGithub, 
  FiCalendar,
  FiUser,
  FiFolder,
  FiGlobe
} from 'react-icons/fi'
import { ProjectStatus, ProjectCategory } from '@/lib/db/types'
import DeleteProjectButton from '../DeleteProjectButton'

interface PageProps {
  params: Promise<{ id: string }>
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

async function getProject(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`)
  if (!res.ok) return null
  return res.json()
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  // Parse technologies from JSON string
  const technologies: string[] = (() => {
    try {
      return JSON.parse(project.technologies) as string[]
    } catch {
      return []
    }
  })()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <Link
            href="/admin/proyectos"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors mt-1"
          >
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
                  ⭐ Destacado
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-1">{project.shortDesc || project.description.substring(0, 100)}...</p>
          </div>
        </div>
        <div className="flex gap-2 ml-auto sm:ml-0">
          <Link
            href={`/admin/proyectos/${project.id}/editar`}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            <FiEdit2 className="w-4 h-4" />
            Editar
          </Link>
          <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images Gallery */}
          {project.images.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={project.images[0].url}
                  alt={project.images[0].alt || project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {project.images.length > 1 && (
                <div className="p-5 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-3">Más imágenes</p>
                  <div className="grid grid-cols-4 gap-3">
                    {project.images.slice(1).map((image: { id: string; url: string; alt?: string }, index: number) => (
                      <div key={image.id} className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={image.url}
                          alt={image.alt || `${project.title} - ${index + 2}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Descripción</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{project.description}</p>
            </div>
          </div>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Tecnologías</h2>
              </div>
              <div className="px-6 py-5">
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sections */}
          {project.sections.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Secciones del proyecto</h2>
              </div>
              <div className="p-6 space-y-4">
                {project.sections.map((section: import('@/types').Section, idx: number) => (
                  <div key={section.key || idx} className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-medium text-gray-900">{section.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{section.description}</p>
                    {Array.isArray(section.subsections) && section.subsections.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {section.subsections.map((sub: import('@/types').Subsection, subIdx: number) => (
                          <li key={sub.key || subIdx} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                            {sub.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Información</h2>
            </div>
            <div className="p-5 space-y-5">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gray-100 rounded-lg">
                  <FiFolder className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Categoría</p>
                  <p className="font-medium text-gray-900 mt-0.5">{categoryLabels[project.category]}</p>
                </div>
              </div>

              {project.client && (
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-gray-100 rounded-lg">
                    <FiUser className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cliente</p>
                    <Link 
                      href={`/admin/clientes/${project.client.id}`}
                      className="font-medium text-primary hover:underline mt-0.5 block"
                    >
                      {project.client.name}
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gray-100 rounded-lg">
                  <FiCalendar className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Creado</p>
                  <p className="font-medium text-gray-900 mt-0.5">{formatDate(project.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gray-100 rounded-lg">
                  <FiCalendar className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Actualizado</p>
                  <p className="font-medium text-gray-900 mt-0.5">{formatDate(project.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          {(project.liveUrl || project.demoUrl || project.githubUrl) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Enlaces</h2>
              </div>
              <div className="p-5 space-y-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <FiGlobe className="w-5 h-5 text-primary" />
                    <span className="text-gray-700 font-medium">Sitio en vivo</span>
                    <FiExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <FiExternalLink className="w-5 h-5 text-primary" />
                    <span className="text-gray-700 font-medium">Demo</span>
                    <FiExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <FiGithub className="w-5 h-5 text-primary" />
                    <span className="text-gray-700 font-medium">Repositorio</span>
                    <FiExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Transactions */}
          {project.transactions.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Transacciones</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {project.transactions.map((transaction: import('@/types').TransactionData) => (
                  <div key={transaction.id} className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(transaction.date)}</p>
                    </div>
                    <span className={`font-semibold ${
                      transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <Link
                  href={`/admin/finanzas?projectId=${project.id}`}
                  className="block text-center text-sm text-primary hover:underline"
                >
                  Ver todas las transacciones
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
