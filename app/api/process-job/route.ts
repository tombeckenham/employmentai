import { NextRequest } from 'next/server'
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs'
import { processJob } from '@/lib/processJobs'

async function handler(req: NextRequest) {
  const body = await req.json()
  await processJob(body)
  return new Response('OK', { status: 200 })
}

export const POST = verifySignatureAppRouter(handler)
