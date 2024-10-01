import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    newUser: '/signup'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user

      const isOnSignIn = nextUrl.pathname.startsWith('/login')
      const isOnSignUp = nextUrl.pathname.startsWith('/signup')

      // Let the user get to this page
      const isOnSalary = nextUrl.pathname.startsWith('/salary')
      if (isOnSalary) {
        return true
      }

      const isOnHome = nextUrl.pathname === '/'

      if (isLoggedIn) {
        if (isOnSignIn || isOnSignUp || isOnHome) {
          return Response.redirect(new URL('/documents', nextUrl))
        }
      } else {
        if (isOnHome) {
          return Response.redirect(new URL('/login', nextUrl))
        } else if (isOnSignIn || isOnSignUp) {
          return true
        }
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
