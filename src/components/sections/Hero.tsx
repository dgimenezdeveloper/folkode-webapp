'use client'

import { ChevronRight, Sparkles, User, Building2, Factory } from 'lucide-react'

export default function Hero() {
  return (
    <section className="spacing relative pt-48 pb-24 overflow-hidden min-h-screen flex items-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-[#a3b18a]/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-[#003d5b]/20 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative w-full">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-[#a3b18a]/20 text-[10px] font-extrabold tracking-[0.3em] text-[#a3b18a] mb-8 uppercase">
            <Sparkles className="w-3 h-3" />
            Software Factory • Hecho en Argentina
          </div>
          
          <h1 className="text-6xl md:text-[100px] font-black mb-8 tracking-tighter leading-[0.9] text-white">
            Si lo podes pensar,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3b18a] via-white to-[#003d5b] text-glow-green">
              lo podemos programar
            </span>
          </h1>
          
          <p className="spacing max-w-3xl text-lg md:text-2xl text-white/50 mb-16 leading-relaxed font-medium">
            Transformamos ideas<br />
            en soluciones reales e innovadoras
          </p>
          
          <div className=" spacing flex flex-wrap justify-center gap-4 md:gap-8 mb-24">
            <a 
              href="https://wa.me/5491167906178" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-brand px-10 py-5 text-white rounded-2xl font-bold text-lg flex items-center gap-4 group"
            >
              <User className="w-6 h-6" />
              Emprendedor
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="https://wa.me/5491169695436" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-[#a3b18a] transition-all flex items-center gap-4 group"
            >
              <Building2 className="w-6 h-6" />
              Empresa
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="https://wa.me/5491165020777" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-5 glass text-white rounded-2xl font-bold text-lg hover:border-[#a3b18a]/50 transition-all flex items-center gap-4 group"
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
              <div className="aspect-[21/9] w-full rounded-[3rem] overflow-hidden bg-black relative">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000"
                  alt="Folkode Studio" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-12 text-left">
                  <span className="text-[#a3b18a] font-black tracking-[0.5em] text-[10px] uppercase mb-4">
                    Nuestro Espacio de Trabajo
                  </span>
                  <h3 className="text-4xl font-black text-white max-w-xl">
                    Donde las ideas se convierten en líneas de código perfectas.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
