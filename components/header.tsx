import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'

export async function UserOrLogin() {
  const session = (await auth()) as Session
  return (
    <>
      <div className="flex items-center">
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <div className="flex items-center">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-block bg-gradient-button text-gray-800 font-bold text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Sign up</span>
              <span className="shine-effect group-hover:animate-shine"></span>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              Maximize.work
            </Link>
            <div className="hidden md:block">
              <nav className="ml-10 flex items-baseline space-x-4"></nav>
            </div>
          </div>
          <div className="flex items-center">
            <React.Suspense fallback={<div>Loading...</div>}>
              <UserOrLogin />
            </React.Suspense>
          </div>
        </div>
      </div>
    </header>
  )
}
