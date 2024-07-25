import { auth } from '@/auth'
import { ContractAnalysisBasic } from '@/components/ContractAnalysis'
import ContractUpload from '@/components/ContractUploader'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <ContractUpload />
      <ContractAnalysisBasic />
    </div>
  )
}
