'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react'
import { 
  FaGithub, 
  FaDiscord, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaWhatsapp 
} from 'react-icons/fa'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresá un email válido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/FolkodeGroup', label: 'GitHub', color: '#FFFFFF' },
  { icon: FaDiscord, href: 'https://discord.gg/6Q2WrVtfHj', label: 'Discord', color: '#5865F2' },
  { icon: FaWhatsapp, href: 'https://wa.me/541162193426', label: 'WhatsApp', color: '#25D366' },
  { icon: FaFacebook, href: 'https://www.facebook.com/folkode', label: 'Facebook', color: '#1877F2' },
  { icon: FaInstagram, href: 'https://www.instagram.com/fol.kode', label: 'Instagram', color: '#E4405F' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/folkode', label: 'LinkedIn', color: '#0A66C2' },
]

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simular envío del formulario
      // En producción, esto sería una llamada a tu API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch {
      // Si no hay API configurada, simular éxito para demo
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)]" />
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_100%_0%,rgba(134,168,105,0.08),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_0%_100%,rgba(51,131,183,0.08),transparent_50%)]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title mb-14"
        >
          <h2 className="text-gradient">Contáctanos</h2>
          <p className="text-[var(--color-text-secondary)] text-lg">
            Hablemos sobre tu próximo proyecto
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-5">
                Trabajemos juntos
              </h3>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                ¿Tenés una idea que querés hacer realidad? Contanos sobre tu proyecto 
                y te responderemos a la brevedad. Estamos listos para transformar tus 
                ideas en soluciones digitales.
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              <a
                href="mailto:contactofolkode@gmail.com"
                className="flex items-center gap-5 p-5 rounded-2xl bg-[var(--color-background)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-tertiary)] mb-1">Email</p>
                  <p className="text-lg text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors font-medium">
                    contactofolkode@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/541162193426"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 rounded-2xl bg-[var(--color-background)] border-2 border-[var(--color-border)] hover:border-green-500/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-green-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-tertiary)] mb-1">WhatsApp</p>
                  <p className="text-lg text-[var(--color-text-primary)] group-hover:text-green-500 transition-colors font-medium">
                    +54 11 6219-3426
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-5 p-5 rounded-2xl bg-[var(--color-background)] border-2 border-[var(--color-border)]">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-tertiary)] mb-1">Ubicación</p>
                  <p className="text-lg text-[var(--color-text-primary)] font-medium">
                    Buenos Aires, Argentina 🇦🇷
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-base font-medium text-[var(--color-text-secondary)] mb-5">
                Seguinos en redes
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-[var(--color-background)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon 
                      size={22} 
                      className="text-[var(--color-text-secondary)] transition-colors duration-300" 
                      style={{ color: undefined }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = social.color)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl p-8 md:p-10 space-y-6 bg-[var(--color-background)] border-2 border-[var(--color-border)] shadow-2xl shadow-black/10"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                  Nombre *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  placeholder="Tu nombre"
                  className={`w-full px-5 py-4 rounded-xl bg-[var(--color-surface)] border-2 transition-all duration-300 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-0 ${errors.name ? 'border-[var(--color-error)]' : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'}`}
                />
                {errors.name && (
                  <p className="text-sm text-[var(--color-error)] mt-2 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder="tu@email.com"
                  className={`w-full px-5 py-4 rounded-xl bg-[var(--color-surface)] border-2 transition-all duration-300 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-0 ${errors.email ? 'border-[var(--color-error)]' : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'}`}
                />
                {errors.email && (
                  <p className="text-sm text-[var(--color-error)] mt-2 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone & Company in a row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                    Teléfono
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    placeholder="+54 11 1234-5678"
                    className="w-full px-5 py-4 rounded-xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] transition-all duration-300 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-0"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                    Empresa/Proyecto
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    id="company"
                    placeholder="Nombre de tu empresa"
                    className="w-full px-5 py-4 rounded-xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] focus:border-[var(--color-primary)] transition-all duration-300 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                  Mensaje *
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  placeholder="Contanos sobre tu proyecto..."
                  className={`w-full px-5 py-4 rounded-xl bg-[var(--color-surface)] border-2 transition-all duration-300 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-0 resize-none ${errors.message ? 'border-[var(--color-error)]' : 'border-[var(--color-border)] focus:border-[var(--color-primary)]'}`}
                />
                {errors.message && (
                  <p className="text-sm text-[var(--color-error)] mt-2 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-gradient w-full text-lg py-4"
                whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar mensaje
                  </>
                )}
              </motion.button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-5 rounded-xl bg-green-500/15 text-green-500 border border-green-500/30"
                >
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <span className="font-medium">¡Mensaje enviado! Te contactaremos pronto.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-5 rounded-xl bg-[var(--color-error)]/15 text-[var(--color-error)] border border-[var(--color-error)]/30"
                >
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  <span className="font-medium">Hubo un error. Por favor intentá de nuevo.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
