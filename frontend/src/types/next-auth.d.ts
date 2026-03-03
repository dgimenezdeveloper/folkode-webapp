import 'next-auth'
import { Role } from '@/lib/db/types'

declare module 'next-auth' {
  interface User {
    role?: Role
  }

  interface Session {
    accessToken?: string
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
    accessToken?: string
    role?: string
    id?: string
  }
}
