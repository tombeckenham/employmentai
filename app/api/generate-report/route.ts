import { NextRequest } from 'next/server'
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs'
import { processGenerateContractReport } from '@/lib/reportGenerator'

// Set max duration to 60 seconds
export const maxDuration = 60

async function handler(req: NextRequest) {
  const body = await req.json()
  const { documentId } = body
  await processGenerateContractReport(documentId)
  return new Response('OK', { status: 200 })
}

const hasQstashKeys =
  process.env.QSTASH_CURRENT_SIGNING_KEY &&
  process.env.QSTASH_NEXT_SIGNING_KEY

export const POST = hasQstashKeys ? verifySignatureAppRouter(handler) : handler
