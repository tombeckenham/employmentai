'use client'

import { analyzeContract } from '@/lib/contractAnalysis'
import { useState } from 'react'

export function ContractAnalysisBasic() {
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (contractUrl: string) => {
    setLoading(true)
    try {
      const result = await analyzeContract(contractUrl)
      setAnalysis(result)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <p>Analyzing contract...</p>}
      {analysis && (
        <div>
          <h2>Contract Analysis</h2>
          <pre>{analysis}</pre>
        </div>
      )}
    </div>
  )
}
