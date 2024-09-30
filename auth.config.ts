import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    newUser: '/signup'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      console.log('authorized', nextUrl)

      if (nextUrl.pathname.startsWith('/api')) {
        console.log('api call')
        return true
      }

      const isLoggedIn = !!auth?.user

      const isOnSignIn = nextUrl.pathname.startsWith('/login')
      const isOnSignUp = nextUrl.pathname.startsWith('/signup')

      // Let the user get to this page
      const isOnSalary = nextUrl.pathname.startsWith('/salary')
      if (isOnSalary) {
        return true
      }

      const isOnHome = nextUrl.pathname === '/'

      if (isOnSignIn || isOnSignUp || isOnHome) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/documents', nextUrl))
        }
        return true
      }

      return isLoggedIn
    },
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, id: user.id }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        const { id } = token as { id: string }
        const { user } = session

        session = { ...session, user: { ...user, id } }
      }

      return session
    }
  },
  providers: []
} satisfies NextAuthConfig
