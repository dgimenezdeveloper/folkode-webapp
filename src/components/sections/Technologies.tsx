'use client'

import { motion } from 'motion/react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiDjango,
  SiFlask,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiHtml5,
  SiCss3,
  SiVuedotjs,
  SiAngular,
  SiKotlin,
  SiGraphql,
  SiOpenai,
  SiFastapi,
  SiNestjs,
  SiAstro,
  SiGnubash,
  SiC,
  SiCplusplus,
  SiGnometerminal,
} from 'react-icons/si'

const technologies = [
  { name: 'React.js', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Django', icon: SiDjango, color: '#092E20' },
  { name: 'Flask', icon: SiFlask, color: '#FFFFFF' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'SQLite', icon: SiSqlite, color: '#003B57' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Angular', icon: SiAngular, color: '#DD0031' },
  { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'OpenAI', icon: SiOpenai, color: '#412991' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Nest.js', icon: SiNestjs, color: '#E0234E' },
  { name: 'Astro', icon: SiAstro, color: '#FF5D01' },
  { name: 'Bash', icon: SiGnubash, color: '#4EAA25' },
  { name: 'C', icon: SiC, color: '#A8B9CC' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'Terminal', icon: SiGnometerminal, color: '#5391FE' },
]

const platforms = [
  { name: 'Website', icon: '🌐' },
  { name: 'Android', icon: '📱' },
  { name: 'iOS', icon: '🍎' },
  { name: 'Watch', icon: '⌚' },
  { name: 'TV', icon: '📺' },
  { name: 'IA', icon: '🤖' },
]

export default function Technologies() {
  return (
    <section className="py-40 relative bg-black/40 flex justify-center items-center w-full">
      <div className="max-w-7xl w-full flex flex-col items-center px-6">
        <div className="text-center mb-24 w-full">
          <h2 className="text-[#a3b18a] font-black tracking-[0.5em] text-[10px] uppercase mb-6">
            Stack Tecnológico
          </h2>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Evolución <span className="text-[#a3b18a]">Constante</span>
          </h3>
        </div>

        {/* Plataformas (mantener visual) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-24 w-full justify-items-center">
          {platforms.map((platform, i) => (
            <div
              key={i}
              className="glass rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6 group hover:border-[#a3b18a]/40 bg-black/20"
            >
              <div className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 text-3xl mt-4 mb-2">
                {platform.icon}
              </div>
              <span className="text-center font-bold text-[10px] tracking-[0.3em] uppercase text-white/40 group-hover:text-white transition-colors">
                {platform.name}
              </span>
            </div>
          ))}
        </div>

        {/* Carrusel de tecnologías con íconos */}
        <div className="relative w-full overflow-hidden py-16 border-y border-white/5 flex justify-center">
          <div className="spacing flex animate-scroll whitespace-nowrap gap-20 px-10">
            {[...technologies, ...technologies].map((tech, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-6 opacity-30 hover:opacity-100 transition-opacity cursor-default transition-opacity group"
              >
                <tech.icon className="w-10 h-10" style={{ color: tech.color }} />
                <span className="text-3xl md:text-3xl font-black tracking-tighter text-white uppercase group-hover:text-[#a3b18a] transition-colors">
                  {tech.name}
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
