'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Globe, 
  Cog, 
  Smartphone, 
  MessageSquare, 
  Heart, 
  Link as LinkIcon,
  ChevronRight,
  Code,
  Database,
  Cloud,
  ShoppingCart,
  BarChart
} from 'lucide-react'

const services = [
  {
    id: 'web',
    icon: Globe,
    title: 'Desarrollo Web Profesional',
    description: 'Aplicaciones web a medida con tecnologías modernas.',
    features: [
      'Aplicaciones web con React, Vue.js, Django',
      'Landing pages optimizadas para SEO y conversión',
      'E-commerce integrado con pasarelas de pago',
      'Diseño responsive y accesible',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'automation',
    icon: Cog,
    title: 'Automatización y Productividad',
    description: 'Optimizá tus procesos con herramientas inteligentes.',
    features: [
      'Sistemas CRM/ERP adaptados a tus procesos',
      'Integración de APIs y flujos automatizados',
      'Herramientas internas personalizadas',
      'Reportes y dashboards en tiempo real',
    ],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile Apps Híbridas',
    description: 'Aplicaciones móviles que funcionan en todas las plataformas.',
    features: [
      'Apps multiplataforma (iOS/Android)',
      'Flutter y React Native',
      'Prototipado rápido',
      'Diseño centrado en usuario',
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'consulting',
    icon: MessageSquare,
    title: 'Consultoría IT',
    description: 'Asesoramiento experto para tu transformación digital.',
    features: [
      'Auditoría técnica de sistemas',
      'Modernización de sistemas legacy',
      'Migración a la nube (AWS, GCP, Azure)',
      'Arquitectura de software',
    ],
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    id: 'social',
    icon: Heart,
    title: 'Software para Impacto Social',
    description: 'Soluciones con propósito para un mundo mejor.',
    features: [
      'Proyectos para ONGs y cooperativas',
      'Plataformas educativas',
      'Gestión comunitaria',
      'Emprendimientos sostenibles',
    ],
    gradient: 'from-red-500 to-rose-500',
  },
  {
    id: 'integrations',
    icon: LinkIcon,
    title: 'Integraciones y APIs',
    description: 'Conectamos tus sistemas para que trabajen juntos.',
    features: [
      'Conexión entre plataformas',
      'Desarrollo de APIs REST y GraphQL',
      'Automatización de flujos de datos',
      'Webhooks y microservicios',
    ],
    gradient: 'from-indigo-500 to-violet-500',
  },
]

export default function Services() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <section id="servicios" className="section bg-[var(--color-background)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_0%_0%,rgba(134,168,105,0.06),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-[radial-gradient(circle_at_100%_100%,rgba(51,131,183,0.06),transparent_50%)]" />
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
          <h2 className="text-gradient">Nuestros Servicios</h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Soluciones digitales completas para cada etapa de tu proyecto
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <motion.div
                className={`
                  card h-full cursor-pointer group w-[400px]
                  ${hoveredService === service.id ? 'border-[var(--color-accent)] shadow-xl' : ''}
                `}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedService(
                  selectedService === service.id ? null : service.id
                )}
              >
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`
                    w-12 h-12 rounded-full bg-gradient-to-br ${service.gradient}
                    flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow
                  `}>
                    <service.icon className="w-15 h-6 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Features (shown on hover/click) */}
                <AnimatePresence>
                  {(hoveredService === service.id || selectedService === service.id) && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 overflow-hidden mt-4 pt-4 border-t border-[var(--color-border)]"
                    >
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]"
                        >
                          <ChevronRight 
                            size={18} 
                            className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" 
                          />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {/* Expand indicator */}
                <motion.div
                  className="flex items-center gap-2 text-[var(--color-primary)] text-sm font-semibold mt-5"
                  animate={{ 
                    opacity: hoveredService === service.id ? 1 : 0.7,
                  }}
                >
                  {selectedService === service.id ? 'Ver menos' : 'Ver detalles'}
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform duration-300 ${
                      selectedService === service.id ? 'rotate-90' : ''
                    }`}
                  />
                </motion.div>

                {/* Hover glow effect */}
                {hoveredService === service.id && (
                  <motion.div
                    layoutId="serviceHover"
                    className="absolute inset-0 rounded-[1.25rem] border-2 border-[var(--color-accent)] opacity-30 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-[var(--color-text-secondary)] mb-6 text-lg spacing">
            ¿No encontrás lo que buscás?
          </p>
          <motion.a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById('contacto')
              if (element) {
                const offset = 80
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - offset
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
              }
            }}
            className="btn btn-gradient text-base px-8 py-3.5 font-semibold shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(134, 168, 105, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Contanos tu proyecto
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
