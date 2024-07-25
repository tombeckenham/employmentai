import { NextRequest } from 'next/server'
import { cache } from 'react'

// Create a simple cache to store upload progress
const getUploadProgress = cache(() => new Map<string, number>())

export async function GET(request: NextRequest) {
  const uploadId = request.nextUrl.searchParams.get('uploadId') || 'default'
  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()
  const encoder = new TextEncoder()

  const send = (data: any) => {
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
  }

  // Send initial progress
  send({ progress: 0 })

  const intervalId = setInterval(() => {
    const progress = getUploadProgress().get(uploadId) || 0
    send({ progress })

    if (progress === 100) {
      clearInterval(intervalId)
      writer.close()
      // Clear the progress from the cache
      getUploadProgress().delete(uploadId)
    }
  }, 100)

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    }
  })
}

// Helper function to update progress (to be used in the upload route)
export function updateUploadProgress(uploadId: string, progress: number) {
  getUploadProgress().set(uploadId, progress)
}
