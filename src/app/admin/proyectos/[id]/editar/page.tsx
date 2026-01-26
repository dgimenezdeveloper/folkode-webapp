'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSave, FiLoader, FiPlus, FiX, FiImage } from 'react-icons/fi'
import { ProjectCategory, ProjectStatus } from '@/lib/db/types'

interface Client {
  id: string
  name: string
}

interface ProjectImage {
  id?: string
  url: string
  alt?: string
  order: number
}

interface Project {
  id: string
  title: string
  slug: string
  description: string
  shortDesc: string | null
  category: ProjectCategory
  status: ProjectStatus
  featured: boolean
  demoUrl: string | null
  liveUrl: string | null
  githubUrl: string | null
  clientId: string | null
  technologies: string[]
  images: ProjectImage[]
}

const categoryOptions: { value: ProjectCategory; label: string }[] = [
  { value: 'ECOMMERCE', label: 'E-commerce' },
  { value: 'LANDING_PAGE', label: 'Landing Page' },
  { value: 'CORPORATIVO', label: 'Corporativo' },
  { value: 'MULTIMEDIA', label: 'Multimedia' },
  { value: 'WEB', label: 'Web' },
  { value: 'SOFTWARE', label: 'Software' },
]

const statusOptions: { value: ProjectStatus; label: string }[] = [
  { value: 'IN_DEVELOPMENT', label: 'En desarrollo' },
  { value: 'COMPLETED', label: 'Completado' },
  { value: 'MAINTENANCE', label: 'Mantenimiento' },
  { value: 'PAUSED', label: 'Pausado' },
]

const commonTechnologies = [
  'React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript',
  'Node.js', 'Express', 'NestJS', 'Python', 'Django', 'FastAPI',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma',
  'Tailwind CSS', 'Sass', 'Bootstrap', 'Material UI',
  'Docker', 'AWS', 'Vercel', 'Netlify', 'Firebase'
]

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [clients, setClients] = useState<Client[]>([])
  const [project, setProject] = useState<Project | null>(null)
  const [technologies, setTechnologies] = useState<string[]>([])
  const [newTech, setNewTech] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([''])

  useEffect(() => {
    Promise.all([
      fetch('/api/clients').then(res => res.json()),
      fetch(`/api/projects/${id}`).then(res => res.json())
    ]).then(([clientsData, projectData]) => {
      setClients(clientsData)
      setProject(projectData)
      setTechnologies(projectData.technologies || [])
      setImageUrls(projectData.images?.map((img: ProjectImage) => img.url) || [''])
      setIsFetching(false)
    }).catch(error => {
      console.error('Error fetching data:', error)
      setIsFetching(false)
    })
  }, [id])

  const addTechnology = (tech: string) => {
    if (tech && !technologies.includes(tech)) {
      setTechnologies([...technologies, tech])
    }
    setNewTech('')
  }

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech))
  }

  const addImageUrl = () => {
    setImageUrls([...imageUrls, ''])
  }

  const updateImageUrl = (index: number, value: string) => {
    const newUrls = [...imageUrls]
    newUrls[index] = value
    setImageUrls(newUrls)
  }

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    
    const data = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      shortDesc: formData.get('shortDesc') as string || null,
      category: formData.get('category') as ProjectCategory,
      status: formData.get('status') as ProjectStatus,
      featured: formData.get('featured') === 'on',
      demoUrl: formData.get('demoUrl') as string || null,
      liveUrl: formData.get('liveUrl') as string || null,
      githubUrl: formData.get('githubUrl') as string || null,
      clientId: formData.get('clientId') as string || null,
      technologies,
      images: imageUrls.filter(url => url.trim() !== '').map((url, index) => ({
        url,
        alt: formData.get('title') as string,
        order: index
      }))
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al actualizar el proyecto')
      }

      router.push(`/admin/proyectos/${id}`)
      router.refresh()
    } catch (error) {
      console.error('Error updating project:', error)
      alert(error instanceof Error ? error.message : 'Error al actualizar el proyecto')
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

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Proyecto no encontrado</p>
        <Link href="/admin/proyectos" className="text-primary hover:underline mt-2 inline-block">
          Volver a proyectos
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/admin/proyectos/${id}`}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Proyecto</h1>
          <p className="text-gray-600 mt-1">{project.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Información básica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Título del proyecto *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={project.title}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                defaultValue={project.slug}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción corta
              </label>
              <input
                type="text"
                id="shortDesc"
                name="shortDesc"
                maxLength={160}
                defaultValue={project.shortDesc || ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción completa *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                defaultValue={project.description}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Category & Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Clasificación</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue={project.category}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <select
                id="status"
                name="status"
                required
                defaultValue={project.status}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
                Cliente
              </label>
              <select
                id="clientId"
                name="clientId"
                defaultValue={project.clientId || ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">Sin cliente asignado</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                defaultChecked={project.featured}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                Proyecto destacado
              </label>
            </div>
          </div>
        </div>

        {/* URLs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Enlaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-2">
                URL del sitio
              </label>
              <input
                type="url"
                id="liveUrl"
                name="liveUrl"
                defaultValue={project.liveUrl || ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                URL de demo
              </label>
              <input
                type="url"
                id="demoUrl"
                name="demoUrl"
                defaultValue={project.demoUrl || ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
                URL de GitHub
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                defaultValue={project.githubUrl || ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tecnologías</h2>
          
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map(tech => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addTechnology(newTech)
                }
              }}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              placeholder="Agregar tecnología..."
            />
            <button
              type="button"
              onClick={() => addTechnology(newTech)}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {commonTechnologies.filter(t => !technologies.includes(t)).map(tech => (
              <button
                key={tech}
                type="button"
                onClick={() => addTechnology(tech)}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                + {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Imágenes</h2>
          <div className="space-y-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1 relative">
                  <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => updateImageUrl(index, e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageUrl}
              className="w-full py-2.5 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <FiPlus className="w-5 h-5" />
              Agregar otra imagen
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Link
            href={`/admin/proyectos/${id}`}
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
