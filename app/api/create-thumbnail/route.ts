import { NextRequest } from 'next/server'
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs'
import { processCreateThumbnail } from '@/lib/thumbnailGenerator'

async function handler(req: NextRequest) {
  const body = await req.json()
  const { documentId } = body
  await processCreateThumbnail(documentId)
  return new Response('OK', { status: 200 })
}

const hasQstashKeys =
  process.env.QSTASH_CURRENT_SIGNING_KEY &&
  process.env.QSTASH_NEXT_SIGNING_KEY

export const POST = hasQstashKeys ? verifySignatureAppRouter(handler) : handler
