'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass py-3 shadow-lg'
          : 'bg-transparent py-5'
      )}
    >
      <nav className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            {!logoError ? (
              <div className="flex items-center gap-3">
                <div className="relative w-[100px] h-[56px] md:w-[64px] md:h-[64px]">
                  <Image
                    src="/folkode-oscuro-no-bg.webp"
                    alt="Folkode Logo"
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    priority
                    onError={() => setLogoError(true)}
                  />
                </div>
                <span className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
                  Folkode
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gradient">Folkode</span>
            )}
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                'relative text-sm xl:text-base font-semibold transition-colors duration-200 py-2',
                activeSection === link.href.replace('#', '')
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {link.label}
              {activeSection === link.href.replace('#', '') && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-primary)] rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <motion.a
            href="#contacto"
            onClick={(e) => handleNavClick(e, '#contacto')}
            className="btn btn-gradient text-sm xl:text-base px-6 py-2.5 font-semibold shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(134, 168, 105, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            Cotizar proyecto
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden p-2.5 text-[var(--color-text-primary)] rounded-xl hover:bg-[var(--color-surface)] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass overflow-hidden border-t border-[var(--color-border)]"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'text-base font-semibold py-3.5 px-4 rounded-xl transition-colors',
                    activeSection === link.href.replace('#', '')
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                onClick={(e) => handleNavClick(e, '#contacto')}
                className="btn btn-gradient mt-3 w-full font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Cotizar proyecto
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
