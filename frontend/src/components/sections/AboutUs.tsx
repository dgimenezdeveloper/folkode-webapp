'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Lightbulb, Users, Award, Target, Heart, Zap } from 'lucide-react'

const values = [
	{
		icon: Lightbulb,
		title: 'Innovación constante',
		description:
			'Usamos las últimas tecnologías para soluciones robustas y escalables.',
		gradient: 'from-yellow-500 to-orange-500',
	},
	{
		icon: Users,
		title: 'Colaboración activa',
		description:
			'Trabajamos junto a nuestros clientes para entender y superar expectativas.',
		gradient: 'from-blue-500 to-cyan-500',
	},
	{
		icon: Award,
		title: 'Compromiso con la calidad',
		description:
			'Cada línea de código refleja nuestra dedicación a la excelencia.',
		gradient: 'from-purple-500 to-pink-500',
	},
]

const features = [
	{
		icon: Target,
		title: 'Enfoque en resultados',
		description: 'Nos orientamos a objetivos medibles y resultados concretos.',
	},
	{
		icon: Heart,
		title: 'Pasión por el código',
		description: 'Amamos lo que hacemos y eso se refleja en cada proyecto.',
	},
	{
		icon: Zap,
		title: 'Agilidad',
		description: 'Metodologías ágiles para entregas rápidas y efectivas.',
	},
]

export default function AboutUs() {
	const [imageError, setImageError] = useState(false)

	return (
		<section id="nosotros" className="section relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)]" />

			<div className="container mx-auto relative z-10">
				{/* Section header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="section-title"
				>
					<h2 className="text-gradient">Sobre Nosotros</h2>
					<p className="text-[var(--color-text-secondary)] text-lg">
						Conocé al equipo detrás de Folkode
					</p>
				</motion.div>

				{/* Main content grid */}
				<div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
					{/* Text content */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="space-y-6"
					>
						<h3 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
							Creamos soluciones digitales{' '}
							<span className="text-gradient">modernas y funcionales</span>
						</h3>

						<p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
							Somos un equipo apasionado por el desarrollo web y el diseño UX/UI.
							Combinamos tecnología de vanguardia con una estética cuidada para
							crear productos que realmente funcionen.
						</p>

						<p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
							Trabajamos junto a clientes y empresas para entender sus
							necesidades, identificar sus dolencias y transformar esas
							dificultades en herramientas digitales eficientes, seguras y
							fáciles de usar.
						</p>

						<blockquote className="border-l-4 border-[var(--color-primary)] pl-6 py-4 my-8 bg-[var(--color-primary)]/5 rounded-r-xl">
							<p className="text-xl italic text-[var(--color-text-primary)] font-medium">
								&ldquo;Si lo podés pensar, nosotros lo podemos programar.&rdquo;
							</p>
							<p className="text-base text-[var(--color-primary)] mt-3 font-semibold">
								— Nuestra filosofía
							</p>
						</blockquote>

						<p className="text-[var(--color-text-secondary)] text-lg">
							En Folkode,{' '}
							<span className="text-[var(--color-primary)] font-bold text-xl">
								tu visión es nuestra misión
							</span>
							.
						</p>
					</motion.div>

					{/* Image */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="relative"
					>
						<div className="relative rounded-3xl overflow-hidden border-2 border-[var(--color-border)] shadow-2xl">
							{!imageError ? (
								<Image
									src="/images/grupo.png"
									alt="Equipo Folkode"
									width={600}
									height={400}
									className="object-cover w-full h-auto"
									onError={() => setImageError(true)}
								/>
							) : (
								<div className="w-full aspect-[3/2] bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] flex items-center justify-center">
									<div className="text-center text-white">
										<Users size={64} className="mx-auto mb-3 opacity-80" />
										<p className="text-2xl font-bold">Equipo Folkode</p>
									</div>
								</div>
							)}
							{/* Overlay gradient */}
							<div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/60 via-transparent to-transparent" />
						</div>

						{/* Floating badge */}
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="absolute -bottom-6 -right-6 glass rounded-2xl p-6 shadow-2xl border-2 border-[var(--color-border)]"
						>
							<div className="text-4xl md:text-5xl font-bold text-gradient mb-1">13+</div>
							<div className="text-base text-[var(--color-text-secondary)] font-medium">
								Profesionales
							</div>
						</motion.div>
					</motion.div>
				</div>

				{/* Values section */}
				<div className="mt-24 mb-24">
					<div className="grid md:grid-cols-3 gap-8">
						{values.map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="card group text-center border-[var(--color-accent)] hover:scale-105 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
							>
								{/* Decorative gradient overlay on hover */}
								<div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								<div className="relative z-10 flex items-center gap-4">
									<div
										className={`w-24 h-12 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
									>
										<value.icon className="w-6 h-6 text-white" />
									</div>
									<div>
										<h4 className="text-xl md:text-2xl font-bold mb-4 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
											{value.title}
										</h4>
										<p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
											{value.description}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Features section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="rounded-3xl p-10 md:p-14 mt-20 border-1| border-[var(--color-border)]"
				>
					<h3 className="text-3xl md:text-4xl font-bold text-center mb-14 text-[var(--color-text-primary)] ">
						¿Qué nos hace diferentes?
					</h3>
					<div className="grid md:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
								className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-md hover:border-[var(--color-primary)]/50 hover:shadow-xl transition-all duration-300 group"
							>
								<div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[var(--color-primary)]/15 flex items-center justify-center group-hover:scale-110 transition-transform">
									<feature.icon className="w-8 h-8 text-[var(--color-primary-hover)]" />
								</div>
								<div>
									<h4 className="font-bold text-xl text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
										{feature.title}
									</h4>
									<p className="text-base text-[var(--color-text-inverse)] leading-relaxed">
										{feature.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
