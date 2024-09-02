import { auth } from '@/auth'
import { ContractAnalysisBasic } from '@/components/ContractAnalysis'
import ContractUpload from '@/components/ContractUploader'
import { Session } from '@/lib/types'

export default async function Dashboard() {
  const session = (await auth()) as Session

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Your Contract Dashboard
        </h1>

        <section className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Upload New Contract
          </h2>
          <ContractUpload />
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Contract Analysis
          </h2>
          <ContractAnalysisBasic />
        </section>
      </main>
    </div>
  )
}
