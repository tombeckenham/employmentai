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
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-800 font-bold text-sm ">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold hover:bg-indigo-100 transition-colors"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export const Header = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className="absolute inset-0 bg-gradient-to-r from-pink-300/70 via-purple-300/70 to-indigo-400/70 backdrop-blur-md opacity-0 transition-opacity duration-300"
        id="header-bg"
      />
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <svg className="size-10 mr-2" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="url(#gradient)" />
            <path
              d="M40 15 v50 M32 23 h16 M32 57 h16 M32 40 h16"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M40 15 L30 40 L40 40 L25 65 L50 40 L40 40 L50 15 Z"
              fill="#FFFFFF"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-2xl font-bold">Employment AI</span>
        </div>
        <UserOrLogin />
      </nav>
    </header>
  )
}
