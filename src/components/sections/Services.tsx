'use client'

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
  return (
    <section id="servicios" className="py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 gap-6">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div 
                key={service.id} 
                className="group relative p-10 glass rounded-[3rem] transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#a3b18a]/10 flex items-center justify-center mb-8 group-hover:bg-[#a3b18a] transition-all duration-500">
                  <Icon className="w-6 h-6 text-[#a3b18a] group-hover:text-black transition-colors" />
                </div>
                
                <h4 className="text-2xl font-black mb-6 text-white tracking-tight">{service.title}</h4>
                
                <ul className="space-y-4 flex-grow">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-white/50 text-sm leading-relaxed font-medium group/item">
                      <span className="text-[#a3b18a] font-bold">›</span>
                      <span className="group-hover/item:text-white/80 transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-10 pt-6 border-t border-white/5 flex items-center gap-2 text-[#a3b18a] font-black text-[10px] tracking-[0.2em] uppercase group-hover:translate-x-2 transition-transform cursor-pointer">
                  Consultar <span className="text-lg">→</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
