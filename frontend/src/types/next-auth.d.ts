import 'next-auth'
import { Role } from '@/lib/db/types'

declare module 'next-auth' {
  interface User {
    role?: Role
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    id?: string
  }
}
