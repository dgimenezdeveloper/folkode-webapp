'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { 
  FaGithub, 
  FaDiscord, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaWhatsapp 
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/FolkodeGroup', label: 'GitHub' },
  { icon: FaDiscord, href: 'https://discord.gg/6Q2WrVtfHj', label: 'Discord' },
  { icon: FaFacebook, href: 'https://www.facebook.com/folkode', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/fol.kode', label: 'Instagram' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/folkode', label: 'LinkedIn' },
  { icon: FaWhatsapp, href: 'https://wa.me/541162193426', label: 'WhatsApp' },
]

const quickLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Sobre nosotros' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

const services = [
  'Desarrollo Web',
  'E-commerce',
  'Automatización',
  'Apps Móviles',
  'Consultoría IT',
  'Integraciones API',
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [logoError, setLogoError] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-[var(--color-surface)] border-t-2 border-[var(--color-border)]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/70 to-transparent pointer-events-none" />
      
      <div className="container mx-auto py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:col-span-1"
          >
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] p-0.5 group-hover:scale-110 transition-transform shadow-lg">
                <div className="w-full h-full rounded-[10px] bg-[var(--color-surface)] flex items-center justify-center">
                  {!logoError ? (
                    <Image
                      src="/folkode-logo.webp"
                      alt="Folkode Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <span className="text-2xl font-bold text-gradient">F</span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold text-[var(--color-text-primary)]">Folkode</span>
                <p className="text-xs text-[var(--color-text-tertiary)]">Software Factory</p>
              </div>
            </Link>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Transformamos ideas en soluciones digitales reales e innovadoras.
              Somos una software factory colaborativa argentina.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-[var(--color-background)] border-2 border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 transition-all duration-300 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 text-[var(--color-text-primary)]">
              Links Rápidos
            </h3>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-3 group text-base"
                  >
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] group-hover:scale-150 transition-transform" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 text-[var(--color-text-primary)]">
              Servicios
            </h3>
            <ul className="space-y-3.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-[var(--color-text-secondary)] flex items-center gap-3 text-base">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 text-[var(--color-text-primary)]">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contactofolkode@gmail.com"
                  className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-background)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all duration-300 group shadow-md hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MdEmail size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[var(--color-text-tertiary)] mb-0.5 font-medium">Email</p>
                    <p className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors truncate font-medium">
                      contactofolkode@gmail.com
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/541162193426"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-background)] border-2 border-[var(--color-border)] hover:border-green-500/50 transition-all duration-300 group shadow-md hover:shadow-lg"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaWhatsapp size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-tertiary)] mb-0.5 font-medium">WhatsApp</p>
                    <p className="text-sm text-[var(--color-text-primary)] group-hover:text-green-500 transition-colors font-medium">
                      +54 11 6219-3426
                    </p>
                  </div>
                </a>
              </li>
            </ul>
            
            {/* CTA */}
            <div className="mt-5">
              <motion.a
                href="#contacto"
                onClick={(e) => handleNavClick(e, '#contacto')}
                className="btn btn-gradient w-full px-6 py-3 text-base font-semibold shadow-lg"
                whileHover={{ scale: 1.02, y: -2, boxShadow: '0 0 25px rgba(134, 168, 105, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                ¿Tenés un proyecto en mente?
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t-2 border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-[var(--color-text-secondary)] text-sm">
            © {currentYear} Folkode. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
              Políticas de privacidad
            </Link>
            <Link href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors">
              Términos de servicio
            </Link>
          </div>
          <p className="text-[var(--color-text-secondary)] text-sm flex items-center gap-2">
            Diseñado con <span className="text-red-500">❤️</span> por <span className="text-[var(--color-primary)] font-bold">Folkode</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
