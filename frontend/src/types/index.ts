// Types para proyectos
export interface ModalData {
  title: string
  sections: Section[]
}

export interface Section {
  key: string
  title: string
  description: string
  images?: string[]
  subsections?: Subsection[]
}

export interface Subsection {
  key: string
  title: string
  description: string
  images: string[]
}

export interface ProjectCardData {
  id: string
  title: string
  slug: string
  shortDesc: string
  category: ProjectCategory
  status: ProjectStatus
  featured: boolean
  demoUrl?: string
  liveUrl?: string
  technologies: string[]
  images: { url: string; alt?: string }[]
}

export type ProjectCategory = 
  | 'ECOMMERCE'
  | 'LANDING_PAGE'
  | 'CORPORATIVO'
  | 'MULTIMEDIA'
  | 'WEB'
  | 'SOFTWARE'

export type ProjectStatus = 
  | 'IN_DEVELOPMENT'
  | 'COMPLETED'
  | 'MAINTENANCE'
  | 'PAUSED'

export const PROJECT_CATEGORIES: Record<ProjectCategory, string> = {
  ECOMMERCE: 'E-commerce',
  LANDING_PAGE: 'Landing page',
  CORPORATIVO: 'Corporativo',
  MULTIMEDIA: 'Multimedia',
  WEB: 'Web',
  SOFTWARE: 'Software',
}

export const PROJECT_STATUS: Record<ProjectStatus, string> = {
  IN_DEVELOPMENT: 'En desarrollo',
  COMPLETED: 'Completado',
  MAINTENANCE: 'En mantenimiento',
  PAUSED: 'Pausado',
}

// Types para equipo
export interface TeamMemberData {
  id: string
  name: string
  role: string
  bio?: string
  image?: string
  github?: string
  linkedin?: string
  twitter?: string
}

// Types para testimonios
export interface TestimonialData {
  id: string
  content: string
  rating: number
  client: {
    name: string
    company?: string
    avatar?: string
  }
  projectName?: string
}

// Types para servicios
export interface ServiceData {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
}

// Types para tecnologías
export interface TechnologyData {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'database' | 'mobile' | 'devops' | 'ai'
}

// Types para contacto
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}

// Types para finanzas
export interface TransactionData {
  id: string
  type: 'INCOME' | 'EXPENSE'
  amount: number
  description: string
  date: Date
  category?: string
  projectId?: string
  clientId?: string
}

export interface FinancialSummary {
  totalIncome: number
  totalExpense: number
  balance: number
  monthlyData: {
    month: string
    income: number
    expense: number
  }[]
}
