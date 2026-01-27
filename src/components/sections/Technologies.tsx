'use client'

import { Globe, Smartphone, Apple, Watch, Tv, Zap } from 'lucide-react'

const CATEGORIES = [
  { name: 'Website', icon: Globe, color: '#598392' },
  { name: 'Android', icon: Smartphone, color: '#a3b18a' },
  { name: 'iOS', icon: Apple, color: '#ffffff' },
  { name: 'Watch', icon: Watch, color: '#a3b18a' },
  { name: 'Tv', icon: Tv, color: '#598392' },
  { name: 'IA', icon: Zap, color: '#a3b18a' },
]

const STACK = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "FastAPI", "Nest.js", 
  "Angular", "Astro", "MySQL", "SQLite", "C++", "C", "CSS", "Bash", "Vuetify", "Flutter", "Swift"
]

export default function Technologies() {
  return (
    <section className="py-40 relative bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-[#a3b18a] font-black tracking-[0.5em] text-[10px] uppercase mb-6">
            Stack Tecnológico
          </h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Evolución <span className="text-[#a3b18a]">Constante</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon
            return (
              <div 
                key={i} 
                className="glass rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6 group hover:border-[#a3b18a]/40 bg-black/20"
              >
                <div className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Icon className="w-8 h-8" style={{ color: cat.color }} />
                </div>
                <span className="font-bold text-[10px] tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </div>
            )
          })}
        </div>

        <div className="relative w-full overflow-hidden py-16 border-y border-white/5">
          <div className="flex animate-scroll whitespace-nowrap gap-20 px-10">
            {[...STACK, ...STACK].map((tech, i) => (
              <div 
                key={i} 
                className="inline-flex items-center gap-6 opacity-30 hover:opacity-100 transition-opacity cursor-default group"
              >
                <div className="w-2 h-2 rounded-full bg-[#a3b18a]" />
                <span className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase group-hover:text-[#a3b18a] transition-colors">
                  {tech}
                </span>
              </div>
            ))}
          </div>
          {/* Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
