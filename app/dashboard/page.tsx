import { auth } from '@/auth'
import { ContractAnalysisBasic } from '@/components/ContractAnalysis'
import ContractUpload from '@/components/ContractUploader'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = (await auth()) as Session

  return (
    <div>
      <ContractUpload />
      <ContractAnalysisBasic />
    </div>
  )
}
