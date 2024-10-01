'use client'
import React from 'react'
import Intercom from '@intercom/messenger-js-sdk'
import { useSession } from 'next-auth/react'

const ContractLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()
  const user = session?.user

  Intercom({
    app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID || '',
    user_id: user?.id, // IMPORTANT: Replace "user.id" with the variable you use to capture the user's ID
    name: user?.name || '', // IMPORTANT: Replace "user.name" with the variable you use to capture the user's name
    email: user?.email || '' // IMPORTANT: Replace "user.email" with the variable you use to capture the user's email
  })

  return <>{children}</>
}

export default ContractLayout
