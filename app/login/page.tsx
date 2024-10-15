import { auth } from '@/auth'
import LoginForm from '@/components/login-form'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await auth()
  if (session) {
    redirect('/documents')
  }
  return (
    <main className="flex flex-col p-4">
      <LoginForm />
    </main>
  )
}
