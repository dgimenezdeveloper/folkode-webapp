'use client'

import Image from 'next/image'
import { motion } from "motion/react"
import { ChevronRight, Sparkles, User, Building2, Factory } from 'lucide-react'

export default function Hero() {
  return (
    <section
      className="spacing relative overflow-hidden min-h-screen flex items-center justify-center"
      style={{ minHeight: '100vh' }}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-[#a3b18a]/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-[#003d5b]/20 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div
            className=" inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-[#a3b18a]/20 text-[10px] font-extrabold tracking-[0.3em] text-[#a3b18a] mb-8 uppercase"
            style={{ marginTop: '2rem', marginBottom: '2rem' }}
          >
            <Sparkles className="!m-2 w-3 h-3" />
            Software Factory • Hecho en Argentina
          </div>

          <h1
            className="text-6xl md:text-[100px] font-black mb-8 tracking-tighter leading-[1.1] text-white"
            style={{ lineHeight: '1.2', marginBottom: '2rem' }}
          >
            Si lo podes pensar,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3b18a] via-white to-[#003d5b] text-glow-green">
              lo podemos programar
            </span>
          </h1>

          <p
            className="max-w-3xl text-lg md:text-2xl text-white/50 mb-16 font-medium"
            style={{ lineHeight: '1.6', marginBottom: '2rem' }}
          >
            Transformamos ideas<br />
            en soluciones reales e innovadoras
          </p>

          <div
            className=" flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-24"
            style={{ marginBottom: '3rem' }}
          >
            <a
              href="https://wa.me/5491167906178"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-brand button-text px-10 py-5 text-white rounded-2xl font-bold text-lg flex items-center gap-4 group"
            >
              <User className="w-6 h-6" />
              Emprendedor
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://wa.me/5491169695436"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-animated px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-[#a3b18a] transition-all flex items-center gap-4 group button-text:hover"
            >
              <Building2 className="w-6 h-6" />
              Empresa
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://wa.me/5491165020777"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-animated px-10 py-5 glass text-white rounded-2xl font-bold text-lg hover:border-[#a3b18a]/50 transition-all flex items-center gap-4 group"
            >
              <Factory className="w-6 h-6" />
              Pyme
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Featured Element */}
          <div className="w-full max-w-6xl mx-auto mt-12 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#a3b18a]/20 to-[#003d5b]/20 blur-2xl opacity-50" />
            <div className="relative glass rounded-[4rem] border-white/5 p-4 md:p-8 shadow-2xl overflow-hidden group">
              <div className="w-full flex justify-center items-center rounded-[3rem] bg-black relative" style={{ minHeight: '400px' }}>
                <Image
                  src="/images/hero-featured.jpg"
                  alt="Folkode Studio"
                  fill
                  style={{ objectFit: 'contain' }}
                  className="opacity-90 group-hover:scale-110 transition-transform duration-1500"
                />
                <div className="title-space absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-[2rem_!important] text-left ">
                  <span className="text-[#a3b18a] font-black tracking-[0.5em] text-[10px] uppercase w-[100%_!important]">
                    Nuestro Espacio de Trabajo
                  </span>
                  <h3 className="text-4xl font-black text-white max-w-xl m-[0_!important]">
                    Donde las ideas se convierten en líneas de código perfectas.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Mobile styles for vertical spacing */}
      <style jsx>{`
        @media (max-width: 640px) {
          section {
            min-height: 100vh;
            padding-top: 3rem;
            padding-bottom: 3rem;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          }
          .spacing {
            margin-top: 0;
            margin-bottom: 0;
          }
          h1 {
            font-size: 2.2rem;
            line-height: 1.25;
            margin-bottom: 1.5rem;
          }
          p {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }
          .btn {
            margin-bottom: 1.2rem !important;
            width: 100%;
            max-width: 350px;
          }
          .btn:last-child {
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
