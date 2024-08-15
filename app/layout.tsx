import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Head from 'next/head'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import DemoNotice from '@/components/demo-notice'
import { HeaderScroll } from '@/components/header-scroll'

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'Employment AI',
    template: `%s - Employment AI`
  },
  description: 'An AI-powered employment assistant.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-gray-800 font-sans">
            <Header />
            <HeaderScroll />
            <main className="flex flex-col flex-1 bg-muted/50">{children}</main>
            <DemoNotice /> {/* Include the DemoNotice component */}
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
