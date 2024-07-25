import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { analyzeContractWithAI } from '@/lib/contractAnalysis'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { contractUrl } = await req.json()

  try {
    const analysis = await analyzeContractWithAI(contractUrl)
    return NextResponse.json({ analysis })
  } catch (error) {
    console.error('Contract analysis failed:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
