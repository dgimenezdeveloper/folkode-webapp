'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSave, FiLoader, FiPlus, FiX, FiImage, FiAlignLeft } from 'react-icons/fi'
import { ProjectCategory, ProjectStatus } from '@/lib/db/types'
import { useSession } from 'next-auth/react'
import { clientService } from '@/services/client.service'
import { projectService } from '@/services/project.service'

interface Client {
  id: string
  name: string
}

const categoryOptions: { value: ProjectCategory; label: string }[] = [
  { value: ProjectCategory.ECOMMERCE, label: 'E-commerce' },
  { value: ProjectCategory.LANDING_PAGE, label: 'Landing Page' },
  { value: ProjectCategory.CORPORATIVO, label: 'Corporativo' },
  { value: ProjectCategory.MULTIMEDIA, label: 'Multimedia' },
  { value: ProjectCategory.WEB, label: 'Web' },
  { value: ProjectCategory.SOFTWARE, label: 'Software' },
]

const statusOptions: { value: ProjectStatus; label: string }[] = [
  { value: ProjectStatus.IN_DEVELOPMENT, label: 'En desarrollo' },
  { value: ProjectStatus.COMPLETED, label: 'Completado' },
  { value: ProjectStatus.MAINTENANCE, label: 'Mantenimiento' },
  { value: ProjectStatus.PAUSED, label: 'Pausado' },
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
  const techSuggestions = commonTechnologies.filter(
    tech =>
      tech.toLowerCase().includes(newTech.toLowerCase()) &&
      !technologies.includes(tech)
  )
  const techDropdownRef = useRef<HTMLDivElement | null>(null)
  const [imageUrls, setImageUrls] = useState<string[]>([''])
  const [sections, setSections] = useState([{ title: '', description: '', images: [''] }])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { data: session } = useSession()
  const token = (session as { accessToken?: string })?.accessToken

  useEffect(() => {
    if (token) {
      clientService.getClients(token)
        .then(data => {
          if (Array.isArray(data)) setClients(data)
        })
        .catch(console.error)
    }
  }, [token])

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

  // --- Manejo de Secciones ---
  const addSection = () => {
    setSections([...sections, { title: '', description: '', images: [''] }])
  }

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const updateSection = (index: number, field: 'title' | 'description', value: string) => {
    const newSections = [...sections]
    newSections[index][field] = value
    setSections(newSections)
  }

  const addSectionImage = (sectionIndex: number) => {
    const newSections = [...sections]
    newSections[sectionIndex].images.push('')
    setSections(newSections)
  }

  const removeSectionImage = (sectionIndex: number, imageIndex: number) => {
    const newSections = [...sections]
    newSections[sectionIndex].images.splice(imageIndex, 1)
    setSections(newSections)
  }

  const updateSectionImage = (sectionIndex: number, imageIndex: number, value: string) => {
    const newSections = [...sections]
    newSections[sectionIndex].images[imageIndex] = value
    setSections(newSections)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const newErrors: Record<string, string> = {}

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const status = formData.get('status') as string

    if (!title.trim()) newErrors.title = 'El título es obligatorio'
    if (!slug.trim()) newErrors.slug = 'El slug es obligatorio'
    if (!description.trim()) newErrors.description = 'La descripción es obligatoria'
    if (!category) newErrors.category = 'Debes seleccionar una categoría'
    if (!status) newErrors.status = 'Debes seleccionar un estado'

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {

      const firstError = Object.keys(newErrors)[0]

      document.getElementById(firstError)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })

      return
    }

    if (Object.keys(newErrors).length > 0) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)

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
      })),
      sections: sections.filter(sec => sec.title.trim() !== '').map((sec, index) => ({
        title: sec.title,
        description: sec.description,
        order: index,
        images: sec.images.filter(img => img.trim() !== '').join(',') // Prisma las guarda como Stringified JSON array si es string, simplifiquemos a CSV o armemos un JSON
      })).map(sec => ({
        ...sec,
        // Convertimos el join(',') a JSON real porque el backend espera un string que sea JSON parseable `["url", "url"]` o lo convertirá él.
        images: JSON.stringify(sec.images ? sec.images.split(',') : [])
      }))
    }

    try {
      const project = await projectService.createProject(data as unknown as Parameters<typeof projectService.createProject>[0], token)
      router.push(`/admin/proyectos/${project.id}`)
    } catch (error) {
      console.error('Error creating project:', error)
      const message = error instanceof Error ? error.message : 'Error al crear el proyecto'
      setSubmitError(message)
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

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors }

    switch (name) {
      case 'title':
        if (!value.trim()) newErrors.title = 'El título es obligatorio'
        else delete newErrors.title
        break

      case 'slug':
        if (!value.trim()) newErrors.slug = 'El slug es obligatorio'
        else delete newErrors.slug
        break

      case 'description':
        if (!value.trim()) newErrors.description = 'La descripción es obligatoria'
        else delete newErrors.description
        break

      case 'category':
        if (!value) newErrors.category = 'Debes seleccionar una categoría'
        else delete newErrors.category
        break

      case 'status':
        if (!value) newErrors.status = 'Debes seleccionar un estado'
        else delete newErrors.status
        break
    }

    setErrors(newErrors)
  }

  // Cerrar dropdown de tecnologías al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        techDropdownRef.current &&
        !techDropdownRef.current.contains(event.target as Node)
      ) {
        setNewTech('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <section className="!p-5">
      <div className="flex items-center gap-4 !mb-6">
        <Link
          href="/admin/proyectos"
          className="!p-2 text-gray-600 hover:text-gray-900 hover:bg-[#0d1421] rounded-lg transition-colors inline-flex items-center border !mb-2 gap-2 font-medium"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="!text-5xl font-bold text-gray-900">Nuevo Proyecto</h1>
          <p className="text-gray-600 !mt-1">Completa la información del proyecto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="!space-y-6">
        <fieldset
          disabled={isLoading}
          className={`${isLoading ? "opacity-70 pointer-events-none" : "flex flex-col gap-4"}`}
        >
          {/* Basic Info */}
          <div className="bg-[#0d1421] rounded-xl shadow-sm border border-gray-700 !p-6">
            <h2 className="!text-3xl font-semibold text-gray-900 !mb-4">Información básica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 !mb-2">
                  Título del proyecto *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="input w-full !px-4 !py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Mi proyecto increíble"
                  onChange={(e) => {
                    validateField('title', e.target.value)

                    const slugInput = document.getElementById('slug') as HTMLInputElement
                    if (slugInput && !slugInput.dataset.modified) {
                      slugInput.value = generateSlug(e.target.value)
                    }
                  }}
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                )}
              </div>
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 !mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  required
                  className="input w-full !px-4 !py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="mi-proyecto-increible"
                  onChange={(e) => {
                    validateField('slug', e.target.value)

                    e.target.dataset.modified = 'true'
                  }}
                />
                {errors.slug && (
                  <p className="text-sm text-red-500 mt-1">{errors.slug}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-700 !mb-2">
                  Descripción corta
                </label>
                <input
                  type="text"
                  id="shortDesc"
                  name="shortDesc"
                  maxLength={160}
                  className="input w-full !px-4 !py-2.5 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Una breve descripción para mostrar en la lista"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 !mb-2">
                  Descripción completa *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  className="w-full !px-4 !py-2.5 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors resize-none"
                  placeholder="Describe el proyecto en detalle..."
                  onChange={(e) => validateField('description', e.target.value)}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Category & Status */}
          <div className="bg-[#0d1421] rounded-xl shadow-sm border border-gray-700 !p-6">
            <h2 className="!text-3xl font-semibold text-gray-900 !mb-4">Clasificación</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 !mb-2">
                  Categoría *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full !px-4 !py-2.5 input border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  onChange={(e) => validateField('category', e.target.value)}
                >
                  <option value="">Selecciona una categoría</option>

                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                )}
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 !mb-2">
                  Estado *
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  className="w-full !px-4 !py-2.5 input border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  onChange={(e) => validateField('status', e.target.value)}
                >
                  <option value="">Selecciona un estado</option>

                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500 mt-1">{errors.status}</p>
                )}
              </div>
              <div>
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 !mb-2">
                  Cliente
                </label>
                <select
                  id="clientId"
                  name="clientId"
                  className="w-full !px-4 !py-2.5 input border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  onChange={(e) => validateField('clientId', e.target.value)}
                >
                  <option value="">Sin cliente asignado</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
                {errors.clientId && (
                  <p className="text-sm text-red-500 mt-1">{errors.clientId}</p>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="featured" className="!ml-2 text-sm font-medium text-gray-700">
                  Proyecto destacado
                </label>
              </div>
            </div>
          </div>

          {/* URLs */}
          <div className="bg-[#0d1421] rounded-xl shadow-sm border border-gray-700 !p-6">
            <h2 className="!text-3xl font-semibold text-gray-900 !mb-4">Enlaces</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 !mb-2">
                  URL del sitio
                </label>
                <input
                  type="url"
                  id="liveUrl"
                  name="liveUrl"
                  className="input w-full !px-4 !py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="https://ejemplo.com"
                />
              </div>
              <div>
                <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 !mb-2">
                  URL de demo
                </label>
                <input
                  type="url"
                  id="demoUrl"
                  name="demoUrl"
                  className="input w-full !px-4 !py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="https://demo.ejemplo.com"
                />
              </div>
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 !mb-2">
                  URL de GitHub
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  className="input w-full !px-4 !py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-[#0d1421] rounded-xl shadow-sm border border-gray-700 !p-6">
            <h2 className="!text-3xl font-semibold text-gray-900 !mb-4">Tecnologías</h2>

            {/* Selected technologies */}
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 !mb-4">
                {technologies.map(tech => (
                  <span
                    key={tech}
                    className="!w-fit inline-flex items-center justify-between gap-1 !px-3 !py-1.5 bg-[#1e293b] rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Add technology */}
            <div ref={techDropdownRef} className="flex flex-wrap gap-2 !mb-4">
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
                className="input flex-1 !px-4 !py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                placeholder="Agregar tecnología..."
              />

              <button
                type="button"
                onClick={() => addTechnology(newTech)}
                className="!px-4 !py-2.5 bg-gray-800 text-white hover:text-[#a3b18a] cursor-pointer rounded-lg hover:bg-gray-900 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
              </button>
              {newTech && techSuggestions.length > 0 && (
                <div className="absolute border border-gray-700 rounded-lg bg-[#0d1421] !mt-12 max-h-40 overflow-y-auto">
                  {
                    techSuggestions.map(tech => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => addTechnology(tech)}
                        className="block w-full text-left !px-4 !py-2 hover:bg-gray-800"
                      >
                        {tech}
                      </button>
                    ))
                  }
                </div>
              )}
            </div>

            {/* Common technologies */}
            <div className="flex flex-wrap gap-2">
              {commonTechnologies.filter(t => !technologies.includes(t)).map(tech => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => addTechnology(tech)}
                  className="!px-3 !py-1.5 bg-gray-100 cursor-pointer text-gray-600 rounded-full text-sm hover:bg-gray-300 transition-colors"
                >
                  + {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-[#0d1421] rounded-xl shadow-sm border border-gray-700 !p-6">
            <h2 className="!text-3xl font-semibold text-gray-900 !mb-4">Imágenes</h2>
            <div className="space-y-3">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2 !mb-4 items-center">
                  <div className="flex-1 relative">
                    <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => updateImageUrl(index, e.target.value)}
                      className="input w-full !pl-10 !pr-4 !py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                  {imageUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageUrl(index)}
                      className="!p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageUrl}
                className="w-full !py-2.5 cursor-pointer hover:bg-gray-800 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                Agregar otra imagen
              </button>
            </div>
          </div>
          {/* Sections */}
          <div className="bg-[#0d1421] rounded-xl shadow-sm border border-gray-700 !p-6">
            <h2 className="!text-3xl font-semibold text-gray-900 !mb-4">Secciones Detalladas</h2>
            <p className="text-sm text-gray-500 !mb-6">Agrega casos de estudio, explicaciones técnicas o características específicas de tu proyecto.</p>

            <div className="space-y-8">
              {sections.map((section, sIndex) => (
                <div key={sIndex} className="!p-5 border border-gray-700 rounded-lg bg-[#0d1421] relative">
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(sIndex)}
                      className="absolute top-4 cursor-pointer right-4 !p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}

                  <h3 className="!font-medium !text-gray-300 !mb-4 !mx-0 flex items-center gap-2">
                    <FiAlignLeft className="w-10 h-10" />
                    Sección {sIndex + 1}
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block !text-sm font-medium text-gray-700 !mb-2">
                        Título de la sección
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(sIndex, 'title', e.target.value)}
                        className="input w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white"
                        placeholder="Ej. El Desafío Principal"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 !mb-2">
                        Descripción
                      </label>
                      <textarea
                        rows={3}
                        value={section.description}
                        onChange={(e) => updateSection(sIndex, 'description', e.target.value)}
                        className="w-full !px-4 !py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none bg-[#0d1421] text-white"
                        placeholder="Explica este apartado del proyecto..."
                      />
                    </div>

                    {/* Section Images */}
                    <div className="!mt-2">
                      <label className="block text-sm font-medium text-gray-700 !mb-2 text-primary">
                        Imágenes de esta sección
                      </label>
                      <div className="space-y-2">
                        {section.images.map((url, imgIndex) => (
                          <div key={imgIndex} className="flex gap-2">
                            <input
                              type="url"
                              value={url}
                              onChange={(e) => updateSectionImage(sIndex, imgIndex, e.target.value)}
                              className="input flex-1 !px-4 !py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-white"
                              placeholder="Link de imagen"
                            />
                            <button
                              type="button"
                              onClick={() => removeSectionImage(sIndex, imgIndex)}
                              className="!p-2 !px-3 text-gray-400 hover:text-red-500 cursor-pointer bg-gray-800 hover:bg-gray-900 rounded transition-colors"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addSectionImage(sIndex)}
                          className="text-sm border border-gray-700 rounded font-medium text-primary !mt-3 cursor-pointer hover:text-gray-300 transition-colors flex items-center text-left !p-2 gap-2"
                        >
                          <FiPlus className="w-4 h-4" /> Agregar imagen a la sección
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addSection}
                className="w-full !py-3 !mt-4 cursor-pointer hover:bg-gray-800 border-2 border-dashed border-primary/30 text-primary bg-primary/5 rounded-lg hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <FiPlus className="w-5 h-5" />
                Añadir bloque de sección
              </button>
            </div>
          </div>
        </fieldset>
        {/* Submit */}
        <div className="flex flex-col md:flex-row justify-end gap-4">
          <Link
            href="/admin/proyectos"
            className="!px-6 !py-2.5 text-center !text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors font-medium"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="!px-6 !py-2.5 btn-secondary cursor-pointer rounded-lg !bg-[#a3b18a] md:!bg-[#21262d] hover:bg-primary-600 disabled:bg-primary/50 transition-colors font-medium flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5" />
                Crear Proyecto
              </>
            )}
          </button>
        </div>
      </form>
      {
        submitError && (
          <div className="p-4 bg-red-500/10 border border-red-500 text-red-400 rounded-lg">
            {submitError}
          </div>
        )
      }
    </section >
  )
}
