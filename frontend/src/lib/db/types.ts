// Type definitions for the application
// These types mirror the database schema but are defined independently
// to avoid dependency on Prisma client in the frontend

export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER'
}

export enum ProjectCategory {
  ECOMMERCE = 'ECOMMERCE',
  LANDING_PAGE = 'LANDING_PAGE',
  CORPORATIVO = 'CORPORATIVO',
  MULTIMEDIA = 'MULTIMEDIA',
  WEB = 'WEB',
  SOFTWARE = 'SOFTWARE'
}

export enum ProjectStatus {
  IN_DEVELOPMENT = 'IN_DEVELOPMENT',
  COMPLETED = 'COMPLETED',
  MAINTENANCE = 'MAINTENANCE',
  PAUSED = 'PAUSED'
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export enum MessageStatus {
  PENDING = 'PENDING',
  READ = 'READ',
  REPLIED = 'REPLIED',
  ARCHIVED = 'ARCHIVED'
}

// Model types
export interface User {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  image: string | null
  password: string | null
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface Account {
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  sessionToken: string
  userId: string
  expires: Date
  createdAt: Date
  updatedAt: Date
}

export interface VerificationToken {
  identifier: string
  token: string
  expires: Date
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  shortDesc: string | null
  category: ProjectCategory
  status: ProjectStatus
  featured: boolean
  demoUrl: string | null
  liveUrl: string | null
  githubUrl: string | null
  technologies: string
  clientId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ProjectImage {
  id: string
  url: string
  alt: string | null
  order: number
  projectId: string
  createdAt: Date
}

export interface ProjectSection {
  id: string
  key: string
  title: string
  description: string
  order: number
  images: string
  projectId: string
  createdAt: Date
}

export interface ProjectSubsection {
  id: string
  key: string
  title: string
  description: string
  images: string
  order: number
  sectionId: string
  createdAt: Date
}

export interface Client {
  id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  website: string | null
  avatar: string | null
  notes: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  date: Date
  category: string | null
  projectId: string | null
  clientId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  content: string
  rating: number
  featured: boolean
  clientId: string
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string
  status: MessageStatus
  createdAt: Date
  updatedAt: Date
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string | null
  image: string | null
  order: number
  github: string | null
  linkedin: string | null
  twitter: string | null
  active: boolean
  createdAt: Date
  updatedAt: Date
}
