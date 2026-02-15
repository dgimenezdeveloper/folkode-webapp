import { PrismaClient, ProjectCategory, ProjectStatus, TransactionType, Role } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })


async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@folkode.com.ar' },
    update: {},
    create: {
      email: 'admin@folkode.com.ar',
      name: 'Administrador',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  })
  console.log('✅ Admin user created:', adminUser.email)

  // Create team members
  const teamMembers = [
    {
      name: 'Darío Sebastián',
      role: 'Lead Developer & Co-Founder',
      bio: 'Desarrollador full-stack con más de 8 años de experiencia. Apasionado por crear soluciones tecnológicas innovadoras.',
      github: 'https://github.com/darioseb',
      linkedin: 'https://linkedin.com/in/darioseb',
      order: 1,
    },
    {
      name: 'Giuliana',
      role: 'Project Manager & Co-Founder',
      bio: 'Gestora de proyectos con experiencia en metodologías ágiles y coordinación de equipos multidisciplinarios.',
      linkedin: 'https://linkedin.com/in/giuliana',
      order: 2,
    },
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: member.name.toLowerCase().replace(' ', '-') },
      update: member,
      create: {
        ...member,
        active: true,
      },
    })
  }
  console.log('✅ Team members created')

  // Create sample clients
  const clients = [
    {
      name: 'Juan Pérez',
      email: 'juan@empresa.com',
      phone: '+54 9 11 1234-5678',
      company: 'Empresa S.A.',
      website: 'https://empresa.com.ar',
    },
    {
      name: 'María González',
      email: 'maria@tienda.com',
      phone: '+54 9 11 9876-5432',
      company: 'Mi Tienda Online',
      website: 'https://mitienda.com.ar',
    },
    {
      name: 'Carlos Rodríguez',
      email: 'carlos@startup.io',
      phone: '+54 9 11 5555-4444',
      company: 'StartupTech',
    },
  ]

  const createdClients = []
  for (const client of clients) {
    const created = await prisma.client.create({
      data: client,
    })
    createdClients.push(created)
  }
  console.log('✅ Sample clients created')

  // Create sample projects
  const projects = [
    {
      title: 'Congreso de Tecnología',
      slug: 'congreso',
      description: 'Sitio web completo para un congreso de tecnología con sistema de registro, información de disertantes, programa del evento y más.',
      shortDesc: 'Plataforma web para congreso de tecnología',
      category: ProjectCategory.WEB,
      status: ProjectStatus.COMPLETED,
      featured: true,
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL']),
      liveUrl: 'https://congreso.folkode.com.ar',
      clientId: createdClients[0].id,
    },
    {
      title: 'Luminova - Sistema de Gestión',
      slug: 'luminova',
      description: 'Sistema de gestión empresarial completo con módulos de ventas, producción, depósito, compras y administración.',
      shortDesc: 'Sistema de gestión empresarial integral',
      category: ProjectCategory.SOFTWARE,
      status: ProjectStatus.IN_DEVELOPMENT,
      featured: true,
      technologies: JSON.stringify(['React', 'Node.js', 'Express', 'PostgreSQL', 'Redis']),
      clientId: createdClients[1].id,
    },
    {
      title: 'Mi Cocina Sin TACC',
      slug: 'mi-cocina-sin-tacc',
      description: 'E-commerce especializado en productos sin gluten con catálogo de productos, carrito de compras y pasarela de pagos.',
      shortDesc: 'E-commerce de productos sin gluten',
      category: ProjectCategory.ECOMMERCE,
      status: ProjectStatus.COMPLETED,
      featured: false,
      technologies: JSON.stringify(['Next.js', 'Stripe', 'Tailwind CSS', 'MongoDB']),
      liveUrl: 'https://micocinasintacc.com.ar',
      clientId: createdClients[2].id,
    },
    {
      title: 'El Arca Gym',
      slug: 'el-arca-gym',
      description: 'Landing page para gimnasio con información de servicios, horarios, planes y formulario de contacto.',
      shortDesc: 'Landing page para gimnasio',
      category: ProjectCategory.LANDING_PAGE,
      status: ProjectStatus.COMPLETED,
      featured: false,
      technologies: JSON.stringify(['React', 'Tailwind CSS', 'Framer Motion']),
      liveUrl: 'https://elarcagym.com.ar',
    },
    {
      title: 'Radio GO',
      slug: 'radio-go',
      description: 'Plataforma multimedia para emisora de radio con reproductor en vivo, programación, podcasts y sección de noticias.',
      shortDesc: 'Plataforma web para radio online',
      category: ProjectCategory.MULTIMEDIA,
      status: ProjectStatus.MAINTENANCE,
      featured: true,
      technologies: JSON.stringify(['Next.js', 'Socket.io', 'AWS S3', 'FFmpeg']),
      liveUrl: 'https://radiogo.com.ar',
    },
  ]

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    })
  }
  console.log('✅ Sample projects created')

  // Create sample transactions
  const transactions = [
    {
      type: TransactionType.INCOME,
      amount: 250000,
      description: 'Pago inicial - Congreso de Tecnología',
      date: new Date('2024-01-15'),
      category: 'Desarrollo web',
      clientId: createdClients[0].id,
    },
    {
      type: TransactionType.INCOME,
      amount: 180000,
      description: 'Desarrollo Mi Cocina Sin TACC - Fase 1',
      date: new Date('2024-02-01'),
      category: 'Desarrollo web',
      clientId: createdClients[2].id,
    },
    {
      type: TransactionType.EXPENSE,
      amount: 15000,
      description: 'Hosting y dominio - Vercel',
      date: new Date('2024-02-10'),
      category: 'Hosting',
    },
    {
      type: TransactionType.INCOME,
      amount: 350000,
      description: 'Sistema Luminova - Anticipo',
      date: new Date('2024-03-01'),
      category: 'Software',
      clientId: createdClients[1].id,
    },
    {
      type: TransactionType.EXPENSE,
      amount: 8500,
      description: 'Licencia de software - Figma',
      date: new Date('2024-03-05'),
      category: 'Herramientas',
    },
    {
      type: TransactionType.INCOME,
      amount: 45000,
      description: 'Mantenimiento mensual - Radio GO',
      date: new Date('2024-03-15'),
      category: 'Mantenimiento',
    },
    {
      type: TransactionType.EXPENSE,
      amount: 25000,
      description: 'Servidor AWS - Marzo',
      date: new Date('2024-03-20'),
      category: 'Hosting',
    },
  ]

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    })
  }
  console.log('✅ Sample transactions created')

  // Create sample testimonials
  const testimonials = [
    {
      content: 'Excelente trabajo. El sitio del congreso quedó espectacular y el equipo de Folkode siempre estuvo disponible para cualquier consulta.',
      rating: 5,
      featured: true,
      clientId: createdClients[0].id,
    },
    {
      content: 'El e-commerce superó nuestras expectativas. Las ventas aumentaron un 40% desde el lanzamiento.',
      rating: 5,
      featured: true,
      clientId: createdClients[2].id,
    },
    {
      content: 'Profesionales y comprometidos. El sistema de gestión que desarrollaron nos ayudó a optimizar todos nuestros procesos.',
      rating: 5,
      featured: false,
      clientId: createdClients[1].id,
    },
  ]

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    })
  }
  console.log('✅ Sample testimonials created')

  console.log('')
  console.log('🎉 Seed completed successfully!')
  console.log('')
  console.log('📧 Admin login credentials:')
  console.log('   Email: admin@folkode.com.ar')
  console.log('   Password: admin123')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
