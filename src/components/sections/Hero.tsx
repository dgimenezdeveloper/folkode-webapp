'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronDown, Code, Sparkles, Zap } from 'lucide-react'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [logoError, setLogoError] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url('/heroo_image.webp')` }}
      />
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-[var(--color-background)]" />

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-b from-black/10 via-black/5 to-[var(--color-background)] rounded-full shadow-2xl"
        animate={{ 
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-gradient-to-b from-black/10 via-black/5 to-[var(--color-background)] shadow-2xl"
        animate={{ 
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-6 px-6 py-20 center-content hero-padding hero-margin"
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="bg-black/20 rounded-3xl p-30 md:p-32 shadow-1xl border border-white/20 center-content hero-padding hero-margin">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-8"
            >
              {!logoError ? (
                <Image
                  src="/folkode-oscuro-no-bg.webp"
                  alt="Folkode - Software Factory Colaborativa"
                  width={220}
                  height={88}
                  className="mx-auto drop-shadow-2xl"
                  priority
                  onError={() => setLogoError(true)}
                />
              ) : (
                <h1 className="text-4xl font-bold text-[var(--color-primary)]">Folkode</h1>
              )}
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass mb-8 tracking-wide border border-[var(--color-primary)]/20"
            >
              <Sparkles size={18} className="text-[var(--color-primary)]" />
              <span className="text-sm md:text-base text-white font-medium drop-shadow-md">
                Software Factory Colaborativa
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight md:leading-snug drop-shadow-2xl text-white"
            >
              Transformamos{' '}
              <span className="text-gradient drop-shadow-lg">ideas</span>
              <br />
              en{' '}
              <span className="text-gradient drop-shadow-lg">soluciones digitales</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-lg font-medium"
            >
              Creamos aplicaciones web modernas, funcionales y centradas en el usuario.
              Tu visión es nuestra misión.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-5 justify-center mb-14"
            >
              <motion.a
                href="#proyectos"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById('proyectos')
                  if (element) {
                    const offset = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - offset
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
                  }
                }}
                className="btn btn-gradient text-base md:text-lg px-8 py-4 shadow-xl font-semibold"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(134, 168, 105, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Code size={22} />
                Ver proyectos
              </motion.a>
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
                className="btn btn-secondary text-base md:text-lg px-8 py-4 shadow-xl font-semibold border-2 border-white/30 bg-white/10 hover:bg-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap size={22} />
                Contactar
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto"
            >
              {[
                { value: '15+', label: 'Proyectos completados' },
                { value: '13+', label: 'Miembros del equipo' },
                { value: '20+', label: 'Tecnologías dominadas' },
                { value: '100%', label: 'Clientes satisfechos' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-2 drop-shadow-lg">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-white/80 drop-shadow-md font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#servicios"
          onClick={(e) => {
            e.preventDefault()
            const element = document.getElementById('servicios')
            if (element) {
              const offset = 80
              const elementPosition = element.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - offset
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
            }
          }}
          className="flex flex-col items-center gap-2 text-white/90 hover:text-[var(--color-primary)] transition-colors cursor-pointer drop-shadow-lg"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-sm md:text-base font-semibold">Descubrir</span>
          <ChevronDown size={28} className="drop-shadow-md" />
        </motion.a>
      </motion.div>
    </section>
  )
}
