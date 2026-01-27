'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { 
  ExternalLink, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Code,
  ImageIcon
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Helper to generate placeholder image
const getPlaceholderImage = (title: string, index: number) => 
  `https://placehold.co/800x600/1a1a2e/86A869?text=${encodeURIComponent(title)}+${index + 1}`

// Project data
const projects = [
  {
    id: 'geomuseo',
    title: 'Geomuseo',
    shortDesc: 'Página institucional para museo de geología',
    category: 'CORPORATIVO',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://geo-museo.vercel.app/',
    images: [
      '/images/proyectos/geomuseo/geomuseo-01.png',
      '/images/proyectos/geomuseo/geomuseo-02.png',
      '/images/proyectos/geomuseo/geomuseo-03.png',
      '/images/proyectos/geomuseo/geomuseo-04.png',
    ],
    featured: true,
  },
  {
    id: 'cocina-sin-tacc',
    title: 'Mi Cocina Sin TACC',
    shortDesc: 'Landing page para recetas y productos sin gluten',
    category: 'LANDING_PAGE',
    technologies: ['React', 'CSS Modules', 'Node.js'],
    liveUrl: 'https://micocinasintacc.vercel.app/',
    images: [
      '/images/proyectos/mi-cocina-sin-tacc/cocina-01.png',
      '/images/proyectos/mi-cocina-sin-tacc/cocina-02.png',
      '/images/proyectos/mi-cocina-sin-tacc/cocina-03.png',
      '/images/proyectos/mi-cocina-sin-tacc/cocina-04.png',
    ],
  },
  {
    id: 'congreso',
    title: 'Congreso de Logística y Transporte',
    shortDesc: 'Página oficial del Congreso De Logística y Transporte de la UNAB',
    category: 'SISTEMA_GESTION',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://www.congresologistica.unab.edu.ar/',
    images: [
      '/images/proyectos/congreso/home/home-1.webp',
      '/images/proyectos/congreso/home/home-2.webp',
      '/images/proyectos/congreso/home/home-3.webp',
      '/images/proyectos/congreso/home/home-4.webp',
      '/images/proyectos/congreso/home/home-5.webp',
      '/images/proyectos/congreso/registro/registro.webp',
      '/images/proyectos/congreso/contacto/contacto.webp',
      '/images/proyectos/congreso/sobre-el-congreso/disertantes/disertantes.webp',
      '/images/proyectos/congreso/sobre-el-congreso/programa/programa-1.webp',
      '/images/proyectos/congreso/sobre-el-congreso/programa/programa-2.webp',
      '/images/proyectos/congreso/registro/registro-1.webp',
      '/images/proyectos/congreso/registro/registro-2.webp',
      '/images/proyectos/congreso/registro/registro-3.webp',
    ],
    featured: true,
  },
  {
    id: 'radiogo',
    title: 'RadioGo',
    liveUrl: 'https://radiogo.com.ar/',
    shortDesc: 'Página de Streaming de radio y entretenimiento',
    category: 'MULTIMEDIA',
    technologies: ['React', 'Node.js', 'Socket.io'],
    images: [
      '/images/proyectos/radio-go/radio-go-01.webp',
      '/images/proyectos/radio-go/radio-go-02.webp',
      '/images/proyectos/radio-go/radio-go-03.webp',
      '/images/proyectos/radio-go/radio-go-04.webp',
    ],
    featured: true,
  },
  {
    id: 'andet',
    title: 'Andet',
    liveUrl: 'https://demo-andet-ecommerce.onrender.com/',
    shortDesc: 'E-commerce de productos industriales de servicios eléctricos',
    category: 'ECOMMERCE',
    technologies: ['React', 'Django', 'PostgreSQL'],
    demoUrl: 'https://demo-andet-ecommerce.onrender.com/',
    images: [
      '/images/proyectos/andet/andet-01.webp',
      '/images/proyectos/andet/andet-02.webp',
      '/images/proyectos/andet/andet-03.webp',
      '/images/proyectos/andet/andet-04.webp',
    ],
  },
  {
    id: 'autopartes',
    title: 'Autopartes Deloreans',
    liveUrl: 'https://web-autopartes.vercel.app/',
    shortDesc: 'E-commerce Empresarial de gestión de autopartes',
    category: 'SOFTWARE',
    technologies: ['Python', 'Flask', 'SQLite'],
    images: [
      '/images/proyectos/autopartes-deloreans/autopartes-01.webp',
      '/images/proyectos/autopartes-deloreans/autopartes-02.webp',
      '/images/proyectos/autopartes-deloreans/autopartes-03.webp',
      '/images/proyectos/autopartes-deloreans/autopartes-04.webp',
    ],
  },
  {
    id: 'luminova',
    title: 'Luminova',
    liveUrl: 'https://luminovaerp.pythonanywhere.com/',
    shortDesc: 'Software ERP de ensamblado de luminarias con productos importados',
    category: 'SOFTWARE',
    technologies: ['Python', 'Django', 'PostgreSQL', 'React'],
    images: [
      '/images/proyectos/luminova/login/luminova-login.webp',
      '/images/proyectos/luminova/administrador/luminova-admin-01.webp',
      '/images/proyectos/luminova/compras/luminova-compras-01.webp',
      '/images/proyectos/luminova/deposito/luminova-deposito-01.webp',
    ],
    featured: true,
  },
  {
    id: 'revisteria',
    title: 'La Revisteria',
    liveUrl: 'https://revisteria.pythonanywhere.com/',
    shortDesc: 'E-commerce de libros y cómics de colección',
    category: 'ECOMMERCE',
    technologies: ['Python', 'Django', 'Bootstrap'],
    images: [
      '/images/proyectos/revisteria/revisteria-01.webp',
      '/images/proyectos/revisteria/revisteria-02.webp',
      '/images/proyectos/revisteria/revisteria-03.webp',
      '/images/proyectos/revisteria/revisteria-04.webp',
    ],
  },
  {
    id: 'moonlight',
    title: 'Moonlight Eventos',
    shortDesc: 'Landing page para organización de eventos sociales y empresariales',
    category: 'LANDING_PAGE',
    technologies: ['Next.js', 'Tailwind CSS'],
    liveUrl: 'https://moonlight-eventos.vercel.app/',
    images: [
      '/images/proyectos/moonlight-eventos/moonlight-01.png',
      '/images/proyectos/moonlight-eventos/moonlight-02.png',
      '/images/proyectos/moonlight-eventos/moonlight-03.png',
      '/images/proyectos/moonlight-eventos/moonlight-04.png',
    ],
  },
  {
    id: 'nutricion',
    title: 'Nutrición Fernández',
    liveUrl: 'https://nutricion-fernandez.vercel.app/',
    shortDesc: 'Página institucional para servicios de nutrición profesional',
    category: 'CORPORATIVO',
    technologies: ['React', 'Tailwind CSS'],
    images: [
      '/images/proyectos/Sabrina-Fwrnandez-Nutricion/nutricion-01.png',
      '/images/proyectos/Sabrina-Fwrnandez-Nutricion/nutricion-02.png',
      '/images/proyectos/Sabrina-Fwrnandez-Nutricion/nutricion-03.png',
      '/images/proyectos/Sabrina-Fwrnandez-Nutricion/nutricion-04.png',
    ],
  },
  {
    id: 'planb',
    title: 'Plan B',
    liveUrl: 'https://plan-b-portugues.vercel.app/',
    shortDesc: 'Landing page para escuela de portugués',
    category: 'LANDING_PAGE',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    images: [
      '/images/proyectos/plan-b/plan-b-01.png',
      '/images/proyectos/plan-b/plan-b-02.png',
      '/images/proyectos/plan-b/plan-b-03.png',
      '/images/proyectos/plan-b/plan-b-04.png',
    ],
  },
  {
    id: 'arcagym',
    title: 'El Arca Gym',
    liveUrl: 'https://elarcagym.vercel.app/',
    shortDesc: 'Página institucional para gimnasio con sistema de gestión',
    category: 'SOFTWARE',
    technologies: ['React', 'Node.js', 'MongoDB'],
    images: [
      '/images/proyectos/el-arca-gym/arcagym-01.png',
      '/images/proyectos/el-arca-gym/arcagym-02.png',
      '/images/proyectos/el-arca-gym/arcagym-03.png',
      '/images/proyectos/el-arca-gym/arcagym-04.png',
    ],
  },
  {
    id: 'deluchi',
    title: 'Laura Deluchi Endocrinología',
    liveUrl: 'https://deluchi-endocrinologia.vercel.app/',
    shortDesc: 'Página institucional para servicios médicos de endocrinología',
    category: 'CORPORATIVO',
    technologies: ['Next.js', 'Tailwind CSS'],
    images: [
      '/images/proyectos/laura-deluchi/deluchi-01.png',
      '/images/proyectos/laura-deluchi/delichi-02.png',
      '/images/proyectos/laura-deluchi/deluchi-03.png',
      '/images/proyectos/laura-deluchi/deluchi-04.png',
    ],
  },
  {
    id: 'amueblathom',
    title: 'Amueblathom',
    liveUrl: 'https://amueblathom.vercel.app/',
    shortDesc: 'E-commerce de muebles y decoración para el hogar',
    category: 'ECOMMERCE',
    technologies: ['React', 'Strapi', 'PostgreSQL'],
    images: [
      '/images/proyectos/amueblathom/amueblathom-01.png',
      '/images/proyectos/amueblathom/amueblathom-02.png',
      '/images/proyectos/amueblathom/amueblathom-03.png',
      '/images/proyectos/amueblathom/amueblathom-04.png',
    ],
  },
]

const categories = [
  { value: 'ALL', label: 'Todos' },
  { value: 'ECOMMERCE', label: 'E-commerce' },
  { value: 'LANDING_PAGE', label: 'Landing page' },
  { value: 'CORPORATIVO', label: 'Corporativo' },
  { value: 'MULTIMEDIA', label: 'Multimedia' },
  { value: 'WEB', label: 'Web' },
  { value: 'SOFTWARE', label: 'Software' },
  { value: 'SISTEMA_GESTION', label: 'Eventos ' },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return projects
    return projects.filter(p => p.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="proyectos" className="spacing relative flex flex-col items-center justify-center px-4 py-8 md:px-8 lg:px-16">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_100%_50%,rgba(134,168,105,0.05),transparent_50%)]" />
        <div className="absolute bottom-1/4 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_0%_50%,rgba(51,131,183,0.05),transparent_50%)]" />
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          <h2 className="text-gradient">Proyectos</h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Explorá nuestro portafolio de soluciones digitales
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12 spacing"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`btn-gradient py-2 px-4 rounded-3xl transition-all ${
                activeCategory === cat.value ? 'shadow-lg' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{width: '130px', height: '50px'}}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-[var(--color-text-secondary)] text-lg">
              No hay proyectos en esta categoría.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  )
}

// Project Card Component
function ProjectCard({ 
  project, 
  onClick 
}: { 
  project: typeof projects[0]
  onClick: () => void 
}) {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})

  const getImageSrc = (originalSrc: string, index: number) => {
    if (imgErrors[index]) {
      return getPlaceholderImage(project.title, index)
    }
    return originalSrc
  }

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-background)] cursor-pointer shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-[var(--color-primary)] h-full flex flex-col"
      whileHover={{ y: -8 }}
      onClick={onClick}
    >
      {/* Image carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          className="h-full"
        >
          {project.images.map((img, i) => (
            <SwiperSlide key={i}>
              <Image
                src={getImageSrc(img, i)}
                alt={`${project.title} - ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                unoptimized={imgErrors[i]}
                onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={` btn-gradient px-4 py-1.5 text-xs font-semibold rounded-full shadow-lg`}> 
            {categories.find(c => c.value === project.category)?.label}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 z-10">
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="btn btn-gradient text-sm px-6 py-2.5 font-semibold shadow-xl"
          >
            <Eye size={18} />
            Ver galería completa
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="spacing p-6 flex flex-col gap-3 flex-1">
        <h3 className="font-bold text-xl md:text-2xl text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
          {project.title}
        </h3>
        <p className="text-base text-[var(--color-text-secondary)] leading-relaxed flex-1">
          {project.shortDesc}
        </p>
        
        {/* Technologies */}
        <div className="flex-wrap gap-2 mt-2 pt-3 border-t border-[var(--color-border)] spacing flex">
          {project.technologies.slice(0, 3).map((tech) => (
            <span 
              key={tech}
              className="btn-gradient px-3 py-1.5 text-xs font-medium rounded-lg shadow-lg"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="btn-gradient px-3 py-1.5 text-xs font-semibold rounded-lg shadow-lg">
              +{project.technologies.length - 3} más
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Project Modal Component
function ProjectModal({ 
  project, 
  onClose 
}: { 
  project: typeof projects[0]
  onClose: () => void 
}) {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})

  const getImageSrc = (originalSrc: string, index: number) => {
    if (imgErrors[index]) {
      return getPlaceholderImage(project.title, index)
    }
    return originalSrc
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--color-background)] border-2 border-[var(--color-border)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className=" absolute top-5 right-5 z-20 p-3 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-border)] transition-all shadow-lg hover:scale-110"
          aria-label="Cerrar modal"
        >
          <X size={22} className="text-[var(--color-text-primary)]" />
        </button>

        {/* Image gallery */}
        <div className="relative aspect-video">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            loop
            className="h-full rounded-t-3xl overflow-hidden"
          >
            {project.images.map((img, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={getImageSrc(img, i)}
                  alt={`${project.title} - ${i + 1}`}
                  fill
                  className="object-cover"
                  unoptimized={imgErrors[i]}
                  onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content */}
        <div className="p-8 ">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6 modal-avatar">
            <div className="flex-1">
              <span className=" px-4 py-1.5 text-xs font-semibold rounded-full bg-[var(--color-accent)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/30 mb-4 inline-block btn btn-gradient px-6 py-3 text-sm font-semibold shadow-lg transition-all">
                {categories.find(c => c.value === project.category)?.label}
              </span>
              <h2 className="spacing text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-3">
                {project.title}
              </h2>
              <p className="spacing text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {project.shortDesc}
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spacing btn btn-gradient text-sm px-6 py-3 font-semibold shadow-lg"
                >
                  <ExternalLink size={18} />
                  Ver sitio en vivo
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-sm px-6 py-3 font-semibold border-2"
                >
                  <Code size={18} />
                  Ver demo
                </a>
              )}
            </div>
          </div>

          {/* Technologies */}
          <div className="spacing mt-8 pt-6 border-t border-[var(--color-border)]">
            <h4 className="modal-avatar text-base font-bold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <Code size={20} className="text-[var(--color-primary)]" />
              Tecnologías utilizadas
            </h4>
            <div className="flex flex-wrap gap-3 modal-avatar">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="btn btn-gradient px-6 py-3 text-sm font-semibold shadow-lg transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
