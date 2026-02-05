'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Monitor,
  Settings,
  Smartphone,
  ShieldCheck,
  Heart,
  Share2
} from 'lucide-react'

const services = [
  {
    id: 'web-dev',
    title: 'Desarrollo Web Profesional',
    features: [
      'Aplicaciones web a medida con tecnologías modernas (React, Vue.js, Django)',
      'Landing pages optimizadas para SEO y conversión.',
      'E-commerce integrado con pasarelas de pago y gestión de inventario.'
    ],
    icon: Monitor
  },
  {
    id: 'automation',
    title: 'Automatización y Productividad',
    features: [
      'Sistemas CRM/ERP adaptados a tus procesos.',
      'Integración de APIs y flujos de trabajo automatizados.',
      'Herramientas internas para optimizar operaciones.'
    ],
    icon: Settings
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Apps Híbridas',
    features: [
      'Aplicaciones multiplataforma (iOS/Android) con Flutter o React Native.',
      'Prototipado rápido y diseño centrado en usuario.'
    ],
    icon: Smartphone
  },
  {
    id: 'it-consulting',
    title: 'Consultoría IT',
    features: [
      'Auditoría técnica y modernización de sistemas legacy.',
      'Migración a la nube (AWS, Google Cloud, Azure).'
    ],
    icon: ShieldCheck
  },
  {
    id: 'social-impact',
    title: 'Software para Impacto Social',
    features: [
      'Soluciones con propósito para ONGs y emprendimientos sostenibles.',
      'Plataformas educativas y de gestión comunitaria.'
    ],
    icon: Heart
  },
  {
    id: 'integrations',
    title: 'Integraciones y APIs',
    features: [
      'Conexión entre sistemas y plataformas.',
      'Automatización de flujos de datos.'
    ],
    icon: Share2
  }
]

export default function Services() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section id="servicios" className="section py-40 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center text-center"
      >
        {/* Section header */}
        <div className="section-title mb-24 flex flex-col md:flex-row items-baseline justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[#a3b18a] font-black tracking-[0.5em] text-[10px] uppercase mb-6">
              Nuestros Servicios
            </h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
              Soluciones integrales <br />
              <span className="text-white/30">para cada necesidad</span>
            </h3>
          </div>
          <p className="text-white/40 text-lg font-medium max-w-sm border-l border-[#a3b18a]/30 pl-8">
            Expertos en transformar ideas complejas en productos digitales de alto rendimiento.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {services.map((service) => {
            const Icon = service.icon
            const isExpanded = expanded === service.id
            return (
              <motion.div
                key={service.id}
                className={`card group relative w-[400px] p-10 glass rounded-[3rem] transition-all duration-700 flex flex-col justify-between mx-auto cursor-pointer ${isExpanded ? 'shadow-2xl z-10' : 'hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]'} `}
                style={{ minHeight: isExpanded ? 450 : 320, maxHeight: isExpanded ? 450 : 320 }}
                onMouseEnter={() => setExpanded(service.id)}
                onMouseLeave={() => setExpanded(null)}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  height: isExpanded ? 600 : 320,
                }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#a3b18a]/10 flex items-center justify-center mb-8 group-hover:bg-[#a3b18a] transition-all duration-500">
                    <Icon className="w-6 h-6 text-[#a3b18a] group-hover:text-black transition-colors" />
                  </div>
                  <h5 className="text-2xl font-black mb-6 text-white tracking-tight testimonial-nav-spacing">{service.title}</h5>
                  <ul
                    className={`space-y-4 flex-grow transition-all duration-500 ${
                      isExpanded
                        ? 'opacity-100 max-h-none overflow-visible'
                        : 'opacity-60 line-clamp-2 max-h-[80px] overflow-hidden'
                    }`}
                  >
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 text-white/50 text-sm leading-relaxed font-medium group/item">
                        <p className="text-[#a3b18a] font-bold">›</p>
                        <p className="group-hover/item:text-white/80 transition-colors">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2 mt-8">
                  <a href="#contacto" className="pt-6 border-t border-white/5 flex items-center  text-[#a3b18a] font-black text-[10px] tracking-[0.2em] uppercase group-hover:translate-x-2 transition-transform cursor-pointer">
                    Consultar <span className="text-lg">→</span>
                  </a>
                  {/* Ver más/menos */}
                  <button
                    className="self-end text-xs text-[#a3b18a] font-bold underline focus:outline-none mt-2"
                    onClick={e => {
                      e.stopPropagation();
                      setExpanded(isExpanded ? null : service.id)
                    }}
                    tabIndex={0}
                  >
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
