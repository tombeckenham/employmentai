import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function Home() {
  const session = await auth()

  if (session) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
}
