'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSave, FiLoader, FiPlus, FiX, FiImage } from 'react-icons/fi'
import { ProjectCategory, ProjectStatus } from '@/lib/db/types'

interface Client {
  id: string
  name: string
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

export default function NewProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [technologies, setTechnologies] = useState<string[]>([])
  const [newTech, setNewTech] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([''])

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(console.error)
  }, [])

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
      shortDesc: formData.get('shortDesc') as string,
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
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Error al crear el proyecto')
      }

      const project = await response.json()
      router.push(`/admin/proyectos/${project.id}`)
    } catch (error) {
      console.error('Error creating project:', error)
      alert(error instanceof Error ? error.message : 'Error al crear el proyecto')
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/proyectos"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nuevo Proyecto</h1>
          <p className="text-gray-600 mt-1">Completa la información del proyecto</p>
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Mi proyecto increíble"
                onChange={(e) => {
                  const slugInput = document.getElementById('slug') as HTMLInputElement
                  if (slugInput && !slugInput.dataset.modified) {
                    slugInput.value = generateSlug(e.target.value)
                  }
                }}
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="mi-proyecto-increible"
                onChange={(e) => { e.target.dataset.modified = 'true' }}
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Una breve descripción para mostrar en la lista"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                placeholder="Describe el proyecto en detalle..."
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="https://ejemplo.com"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="https://demo.ejemplo.com"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tecnologías</h2>
          
          {/* Selected technologies */}
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

          {/* Add technology */}
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

          {/* Common technologies */}
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
            href="/admin/proyectos"
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
                Crear proyecto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
