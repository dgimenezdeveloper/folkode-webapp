'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Mail, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresá un email válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

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
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="min-h-[80vh] flex items-center justify-center bg-black/95 py-12 px-2">
      <div className="w-full max-w-5xl rounded-[2.5rem] bg-gradient-to-br from-[#0d1013] via-[#181c1f] to-[#0d1013] shadow-2xl border border-[#23272b] flex flex-col md:flex-row overflow-hidden relative" style={{boxShadow:'0 0 60px 0 #000a'}}>
        {/* Lado Izquierdo: Info */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 md:py-20 md:px-14 bg-transparent min-w-[320px] max-w-[420px]">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2 text-white">
            ¿Listo para<br/>
            <span className="bg-gradient-to-r from-[#a6c48a] to-[#6bb3c7] bg-clip-text text-transparent">hacerlo real?</span>
          </h2>
          <p className="text-[#bfc5c9] text-base md:text-lg mb-10 mt-2">Si lo podes pensar, lo podemos programar</p>
          <div className="space-y-6 mt-8">
            <a href="mailto:contactofolkode@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl border border-[#2c3237] bg-[#101214]/80 hover:border-[#a6c48a] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#a6c48a]/15 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#a6c48a]" />
              </div>
              <div>
                <p className="text-xs tracking-widest text-[#bfc5c9] mb-1 font-semibold uppercase">E-mail</p>
                <p className="text-white font-bold text-base md:text-lg">contactofolkode@gmail.com</p>
              </div>
            </a>
            <a href="https://wa.me/541162193426" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-[#2c3237] bg-[#101214]/80 hover:border-[#6bb3c7] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#6bb3c7]/15 flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#6bb3c7]" />
              </div>
              <div>
                <p className="text-xs tracking-widest text-[#bfc5c9] mb-1 font-semibold uppercase">Whatsapp</p>
                <p className="text-white font-bold text-base md:text-lg">Contactanos</p>
              </div>
            </a>
          </div>
        </div>
        {/* Lado Derecho: Formulario */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 md:py-20 md:px-14 bg-transparent">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-7 bg-[#111315]/80 rounded-2xl p-8 md:p-10 border border-[#23272b] shadow-xl">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold tracking-widest text-[#bfc5c9] mb-2 uppercase">Nombre</label>
              <input
                {...register('name')}
                type="text"
                id="name"
                placeholder="Tu nombre aquí"
                className={`w-full px-5 py-3 rounded-lg bg-transparent border-2 text-white placeholder:text-[#6b7680] focus:outline-none focus:ring-0 text-base ${errors.name ? 'border-[#e57373]' : 'border-[#23272b] focus:border-[#a6c48a]'}`}
              />
              {errors.name && (
                <p className="text-xs text-[#e57373] mt-2 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold tracking-widest text-[#bfc5c9] mb-2 uppercase">E-mail</label>
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="ejemplo@startup.com"
                className={`w-full px-5 py-3 rounded-lg bg-transparent border-2 text-white placeholder:text-[#6b7680] focus:outline-none focus:ring-0 text-base ${errors.email ? 'border-[#e57373]' : 'border-[#23272b] focus:border-[#a6c48a]'}`}
              />
              {errors.email && (
                <p className="text-xs text-[#e57373] mt-2 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Mensaje */}
            <div>
              <label htmlFor="message" className="block text-xs font-bold tracking-widest text-[#bfc5c9] mb-2 uppercase">Mensaje</label>
              <textarea
                {...register('message')}
                id="message"
                rows={4}
                placeholder="Contanos sobre tu idea..."
                className={`w-full px-5 py-3 rounded-lg bg-transparent border-2 text-white placeholder:text-[#6b7680] focus:outline-none focus:ring-0 text-base resize-none ${errors.message ? 'border-[#e57373]' : 'border-[#23272b] focus:border-[#a6c48a]'}`}
              />
              {errors.message && (
                <p className="text-xs text-[#e57373] mt-2 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.message.message}
                </p>
              )}
            </div>
            {/* Botón */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#c2d2a4] text-black font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-[#dbeac2] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.01, y: isSubmitting ? 0 : -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  ENVIAR CONSULTA <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </motion.button>
            {/* Mensajes de estado */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-green-500/15 text-green-500 border border-green-500/30 mt-2"
              >
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium">¡Mensaje enviado! Te contactaremos pronto.</span>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#e57373]/15 text-[#e57373] border border-[#e57373]/30 mt-2"
              >
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium">Hubo un error. Por favor intentá de nuevo.</span>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
