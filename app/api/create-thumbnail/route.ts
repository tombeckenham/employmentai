import { NextRequest } from 'next/server'
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs'
import { processCreateThumbnail } from '@/lib/thumbnailGenerator'

async function handler(req: NextRequest) {
  const body = await req.json()
  const { documentId } = body
  await processCreateThumbnail(documentId)
  return new Response('OK', { status: 200 })
}

export const POST = verifySignatureAppRouter(handler)
