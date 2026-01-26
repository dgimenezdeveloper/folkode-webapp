import { PrismaClient } from '../../../prisma/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'node:path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Use path relative to project root (same as .env DATABASE_URL)
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
  
  const adapter = new PrismaBetterSqlite3({
    url: dbPath,
  })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
