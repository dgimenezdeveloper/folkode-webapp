import type { NextAuthConfig } from 'next-auth'

// This configuration is used in the middleware (Edge Runtime)
// It does NOT include the Prisma adapter since Prisma doesn't work in Edge
export default {
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  providers: [], // Providers are added in auth.ts with full config
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith('/admin')
      const isLoginPage = nextUrl.pathname === '/admin/login'

      if (isAdminRoute && !isLoginPage) {
        if (isLoggedIn) {
          // Check for VIEWER role restriction
          const user = auth?.user
          if (user?.role === 'VIEWER') {
            return Response.redirect(new URL('/', nextUrl))
          }
          return true
        }
        return false // Redirect to login
      } else if (isLoginPage && isLoggedIn) {
        // Redirect logged in users away from login page
        return Response.redirect(new URL('/admin', nextUrl))
      }
      return true
    },
  },
} satisfies NextAuthConfig
