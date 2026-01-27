'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

// Helper to generate avatar placeholder
const getAvatarPlaceholder = (name: string) => 
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=86A869&color=fff&size=100`

const testimonials = [
  {
    id: '1',
    content: 'Con Folkode logramos que RadioGo se convirtiera en una plataforma moderna y dinámica. Nos acompañaron en cada etapa, entendiendo la esencia de nuestro proyecto y potenciando la experiencia de nuestros oyentes.',
    rating: 5,
    client: {
      name: 'Giuliana Mancuso',
      role: 'Directora de RadioGo',
      avatar: '/images/avatars/giuliana.webp',
      company: 'RadioGo',
    },
    projectName: 'RadioGo',
  },
  {
    id: '2',
    content: 'El sistema ERP que desarrollaron para Luminova superó nuestras expectativas. La integración de todos los procesos de producción nos permite tener un control total de nuestro negocio.',
    rating: 5,
    client: {
      name: 'Carlos Fernández',
      role: 'Gerente General',
      avatar: '/images/avatars/default-avatar.webp',
      company: 'Luminova',
    },
    projectName: 'Luminova ERP',
  },
  {
    id: '3',
    content: 'Excelente trabajo en nuestra página institucional. El equipo de Folkode supo captar perfectamente la esencia de nuestro evento académico y lo tradujo en un diseño moderno y funcional.',
    rating: 5,
    client: {
      name: 'Dr. Martín López',
      role: 'Director del Congreso',
      avatar: '/images/avatars/default-avatar.webp',
      company: 'UNAB',
    },
    projectName: 'Congreso de Logística',
  },
  {
    id: '4',
    content: 'La landing page que crearon para Moonlight Eventos captó perfectamente nuestra visión. Profesionalismo y creatividad en cada detalle.',
    rating: 5,
    client: {
      name: 'Ana García',
      role: 'Fundadora',
      avatar: '/images/avatars/default-avatar.webp',
      company: 'Moonlight Eventos',
    },
    projectName: 'Moonlight Eventos',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000)
    return () => clearInterval(interval)
  }, [nextTestimonial])

  const currentTestimonial = testimonials[currentIndex]

  // Transición horizontal tipo slider
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: 'absolute',
      zIndex: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      position: 'absolute',
      zIndex: 0,
    }),
  }

  return (
    <section id="testimonios" className="section bg-[var(--color-surface)] relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_100%_0%,rgba(51,131,183,0.04),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_0%_100%,rgba(134,168,105,0.04),transparent_50%)]" />
      </div>

      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title mb-16"
        >
          <h2 className="text-gradient">
            Comentarios de Clientes
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
            La confianza de nuestros clientes impulsa nuestra excelencia
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center w-full">
          {/* Quote icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center justify-center gap-3">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-xl shadow-[var(--color-primary)]/30">
                <Quote className="w-8 h-8 text-white" />
              </div>
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </div>
          </div>

          {/* Testimonial card - Fixed height container */}
          <div className="rounded-3xl p-10 md:p-16 pt-16 min-h-[420px] md:min-h-[380px] flex flex-col bg-[var(--color-background)] border-2 border-[var(--color-border)] shadow-2xl shadow-black/10 items-center justify-center w-full">
            <AnimatePresence mode="sync" custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex flex-col items-center justify-center flex-1"
              >
                {/* Rating - centered */}
                <div className="flex justify-center gap-1.5 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < currentTestimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-[var(--color-border)]'
                      }`}
                    />
                  ))}
                </div>

                {/* Content - fixed layout */}
                <div className="flex-1 flex items-center justify-center">
                  <blockquote className="text-lg md:text-xl lg:text-2xl text-[var(--color-text-primary)] leading-relaxed text-center max-w-3xl font-medium">
                    &ldquo;{currentTestimonial.content}&rdquo;
                  </blockquote>
                </div>

                {/* Client info - always at bottom */}
                <div className="flex flex-col items-center gap-4 mt-10">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-[var(--color-primary)] flex-shrink-0 shadow-lg shadow-[var(--color-primary)]/20">
                    <AvatarImage
                      src={currentTestimonial.client.avatar}
                      name={currentTestimonial.client.name}
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-lg text-[var(--color-text-primary)]">
                      {currentTestimonial.client.name}
                    </h4>
                    <p className="text-[var(--color-text-secondary)]">
                      {currentTestimonial.client.role}
                    </p>
                    <p className="text-sm text-[var(--color-primary)] font-semibold mt-1">
                      {currentTestimonial.projectName}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation - Outside the card */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-[var(--color-background)] hover:bg-[var(--color-surface-secondary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Anterior testimonio"
            >
              <ChevronLeft size={22} className="text-[var(--color-text-primary)]" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1)
                    setCurrentIndex(i)
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? 'bg-[var(--color-primary)] w-10 shadow-lg shadow-[var(--color-primary)]/30' 
                      : 'bg-[var(--color-border)] w-2.5 hover:bg-[var(--color-text-secondary)]'
                  }`}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-[var(--color-background)] hover:bg-[var(--color-surface-secondary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Siguiente testimonio"
            >
              <ChevronRight size={22} className="text-[var(--color-text-primary)]" />
            </motion.button>
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-20"
        >
          <p className="text-[var(--color-text-secondary)] text-lg mb-6">
            ¿Tenés alguna idea que quieras hacer realidad?
          </p>
          <motion.a
            href="#contacto"
            className="btn btn-gradient text-lg px-10"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Comenzar proyecto
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// Avatar Image with fallback
function AvatarImage({ 
  src, 
  name 
}: { 
  src: string
  name: string
}) {
  const [hasError, setHasError] = useState(false)
  
  return (
    <Image
      src={hasError ? getAvatarPlaceholder(name) : src}
      alt={name}
      fill
      className="object-cover"
      unoptimized={hasError}
      onError={() => setHasError(true)}
    />
  )
}
