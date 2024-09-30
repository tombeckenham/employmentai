import { NextRequest } from 'next/server'
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs'
import { processGenerateContractReport } from '@/lib/reportGenerator'

async function handler(req: NextRequest) {
  const body = await req.json()
  const { documentId } = body
  await processGenerateContractReport(documentId)
  return new Response('OK', { status: 200 })
}

export const POST = verifySignatureAppRouter(handler)
