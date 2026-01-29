'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa'
import { ChevronLeft, ChevronRight, GitBranch } from 'lucide-react'
import { link } from 'fs'

// Helper to generate avatar placeholder
const getAvatarPlaceholder = (name: string) => 
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=86A869&color=fff&size=200`

const teamMembers = [
  {
    id: '1',
    name: 'Laura Giménez',
    role: 'Frontend Developer',
    bio: 'Apasionada por crear experiencias digitales memorables que conectan personas y tecnología.',
    image: '/laura-gimenez.png',
    github: 'https://github.com/Laura-gim',
  },
  {
    id: '2',
    name: 'Celina Pereyra',
    role: 'Backend Developer',
    bio: 'Especialista en arquitectura de software y bases de datos.',
    image: '/celi.webp',
    github: 'https://github.com/CelinaJP',
    linkedin: 'https://www.linkedin.com/in/celina-pereyra-2b4b6219b/',
  },
  {
    id: '3',
    name: 'Daro Giménez',
    role: 'Full Stack Developer',
    bio: 'Desarrollador versátil con experiencia en múltiples tecnologías.',
    image: '/Daro.webp',
    github: 'https://github.com/dgimenezdeveloper',
    linkedin: 'https://www.linkedin.com/in/daseg/',
    portfolio: 'https://portafolio-daseg.vercel.app/',
  },
  {
    id: '6',
    name: 'Federico Paál',
    role: 'Full Stack Developer',
    bio: 'Apasionado por la innovación tecnológica.',
    image: '/fede.webp',
    github: 'https://github.com/FedericoPaal',
    linkedin: 'https://linkedin.com/in/federico-paal',
  
  },
  {
    id: '4',
    name: 'Gabriel Sosa',
    role: 'Full Stack Developer',
    bio: 'Enfocado en crear soluciones escalables y mantenibles.',
    image: '/gabrielsosa.webp',
    github: 'https://github.com/OGabrielSosa',
  },
  {
    id: '5',
    name: 'Agus Ovejero',
    role: 'Frontend Developer',
    bio: 'Creador de interfaces intuitivas y accesibles.',
    image: '/Ovejero.webp',
    github: 'https://github.com/agustin-ovejero',
    linkedin: 'https://www.linkedin.com/in/agustin-ovejero-2a0439344/',
  },
  {
    id: '7',
    name: 'Mauri Barreras',
    role: 'Backend Developer',
    bio: 'Especialista en optimización y rendimiento.',
    image: '/mauri.webp',
    github: 'https://github.com/MauricioBarreras',
    linkedin: 'https://www.linkedin.com/in/mauricio-barreras-235b8128a/',
  },
  {
    id: '8',
    name: 'Sasha Porchia',
    role: 'UX/UI Designer',
    bio: 'Diseñador centrado en la experiencia del usuario.',
    image: '/sasha.webp',
    github: 'https://github.com/SashaPorchia',
  },
  {
    id: '9',
    name: 'Nahue Dalesio',
    role: 'Full Stack Developer',
    bio: 'Desarrollador con visión integral de proyectos.',
    image: '/nahue.webp',
    github: 'https://github.com/Nahuel-Dalesio',
    linkedin: 'https://ar.linkedin.com/in/nahuel-dalesio-183498213',
  },
  {
    id: '10',
    name: 'Maia Avalos',
    role: 'Frontend Developer',
    bio: 'Especialista en animaciones y microinteracciones.',
    image: '/Mai.webp',
    github: 'https://github.com/maiavalos',
    linkedin: 'https://www.linkedin.com/in/maia-avalos-a37098345/',
  },
  {
    id: '11',
    name: 'Facu Carrizo',
    role: 'Backend Developer',
    bio: 'Experto en seguridad y autenticación.',
    image: '/Facu.webp',
    github: 'https://github.com/',
  },
  {
    id: '12',
    name: 'Facu Dallera',
    role: 'Frontend Developer',
    bio: 'Creador de soluciones visuales',
    image: '/dashi.webp',
    github: 'https://github.com/facudalle-dev',
  },
  {
    id: '13',
    name: 'Evián Delle Donne',
    role: 'Frontend Developer',
    bio: 'Creador de soluciones visuales',
    image: '/evian.png',
    github: 'https://github.com/facudalle-dev',
  },
]

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const membersPerPage = 6

  const totalPages = Math.ceil(teamMembers.length / membersPerPage)
  const currentMembers = teamMembers.slice(
    currentIndex * membersPerPage,
    (currentIndex + 1) * membersPerPage
  )

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const member = selectedMember 
    ? teamMembers.find(m => m.id === selectedMember) 
    : null

  return (
    <section className="section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)]" />
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-[radial-gradient(circle_at_50%_0%,rgba(134,168,105,0.06),transparent_50%)]" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[radial-gradient(circle_at_50%_100%,rgba(51,131,183,0.06),transparent_50%)]" />
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
          <h2 className="text-gradient">Nuestro Equipo</h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Conocé a las personas que hacen posible cada proyecto
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16"
            >
              {currentMembers.map((member) => (
                <div
                  key={member.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedMember(member.id)}
                >
                  <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-background)] transition-all duration-300 group-hover:border-[var(--color-primary)] group-hover:shadow-2xl hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <TeamMemberImage
                        src={member.image}
                        name={member.name}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-[var(--color-background)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-xs font-semibold text-white px-3 py-1.5 rounded-full bg-[var(--color-primary)] shadow-lg">
                          Ver perfil
                        </span>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-4 text-center">
                      <h4 className="font-bold text-base text-[var(--color-text-primary)] mb-1 line-clamp-2">
                        {member.name}
                      </h4>
                      <p className="text-xs text-[var(--color-primary)] font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-16 mt-8 spacing">
            <motion.button
              onClick={prevPage}
              className="p-4 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Anterior"
            >
              <ChevronLeft size={24} className="text-[var(--color-text-primary)]" />
            </motion.button>
            
            {/* Page indicators */}
            <div className="flex gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === currentIndex 
                      ? 'bg-[var(--color-primary)] w-8 shadow-lg' 
                      : 'bg-[var(--color-border)] hover:bg-[var(--color-text-secondary)] w-2.5'
                  }`}
                  aria-label={`Página ${i + 1}`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextPage}
              className="p-4 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Siguiente"
            >
              <ChevronRight size={24} className="text-[var(--color-text-primary)]" />
            </motion.button>
          </div>
        )}

        {/* Member detail modal */}
        <AnimatePresence>
          {member && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative glass rounded-3xl p-8 md:p-10 max-w-md w-full border-2 border-[var(--color-border)] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-border)] transition-all shadow-lg"
                  aria-label="Cerrar"
                >
                  <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" className="text-[var(--color-text-primary)]">
                      <path d="M15 5L5 15M5 5l10 10" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </motion.div>
                </button>
                
                <div className="text-center">
                  {/* Avatar */}
                  <div className="modal-avatar relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[var(--color-primary)] shadow-xl">
                    <TeamMemberImage
                      src={member.image}
                      name={member.name}
                    />
                  </div>
                  
                  {/* Info */}
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[var(--color-primary)] font-semibold text-lg mb-5">
                    {member.role}
                  </p>
                  <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-8">
                    {member.bio}
                  </p>
                  
                  {/* Social links */}
                  {(member.github || member.linkedin || member.portfolio) && (
                    <div className="flex justify-center gap-4 pt-4 border-t border-[var(--color-border)] spacing">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all shadow-md hover:shadow-lg group"
                          aria-label="GitHub"
                          
                        >
                          <FaGithub size={24} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all shadow-md hover:shadow-lg group"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin size={24} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors" />
                        </a>
                      )}
                      {member.portfolio && (
                        <a
                          href={member.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all shadow-md hover:shadow-lg group"
                          aria-label="Portafolio"
                        >
                          <FaGlobe size={24} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Team Member Image with fallback
function TeamMemberImage({ 
  src, 
  name,
  className = ''
}: { 
  src: string
  name: string
  className?: string
}) {
  const [hasError, setHasError] = useState(false)
  
  return (
    <Image
      src={hasError ? getAvatarPlaceholder(name) : src}
      alt={name}
      fill
      className={`object-cover ${className}`}
      unoptimized={hasError}
      onError={() => setHasError(true)}
    />
  )
}
