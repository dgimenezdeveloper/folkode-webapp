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
    <section className="py-20 md:py-32 bg-[var(--color-background)] overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_0%_50%,rgba(134,168,105,0.04),transparent_50%)]" />
        <div className="absolute bottom-1/3 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_100%_50%,rgba(51,131,183,0.04),transparent_50%)]" />
      </div>
      
      <div className="container mx-auto px-4 mb-16 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-gradient text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            Tecnologías que impulsan tu proyecto
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Expertos en las herramientas que transforman ideas en soluciones digitales
          </p>
        </motion.div>

        {/* Platform tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className="glass px-6 py-3 rounded-full flex items-center gap-3 cursor-default hover:border-[var(--color-primary)] border-2 border-transparent transition-all shadow-md hover:shadow-lg"
            >
              <span className="text-2xl">{platform.icon}</span>
              <span className="text-sm md:text-base font-semibold text-[var(--color-text-primary)]">{platform.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Infinite Marquee - Estilo folkode.com.ar */}
      <div className="relative">
        {/* Gradient overlays for smooth fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none" />
        
        {/* Marquee Row 1 */}
        <div className="mb-8 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-track animate-marquee">
              {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                <TechItem key={`row1-${index}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>

        {/* Marquee Row 2 - Reverse direction */}
        <div className="overflow-hidden">
          <div className="marquee-container">
            <div className="marquee-track animate-marquee-reverse">
              {[...technologies.slice().reverse(), ...technologies.slice().reverse(), ...technologies.slice().reverse()].map((tech, index) => (
                <TechItem key={`row2-${index}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 mt-24"
      >
        <div className="glass rounded-3xl p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 text-center border-2 border-[var(--color-border)] shadow-xl">
          {[
            { value: '27+', label: 'Tecnologías' },
            { value: '6+', label: 'Plataformas' },
            { value: '4+', label: 'Años de experiencia' },
            { value: '∞', label: 'Posibilidades' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-gradient mb-3 drop-shadow-lg">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-[var(--color-text-secondary)] font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function TechItem({ tech }: { tech: typeof technologies[0] }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-4 px-7 py-4 mx-4 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 hover:scale-110 cursor-default shadow-lg hover:shadow-xl">
      <tech.icon 
        className="w-8 h-8 flex-shrink-0" 
        style={{ color: tech.color }} 
      />
      <span className="text-base font-semibold text-[var(--color-text-primary)] whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  )
}
