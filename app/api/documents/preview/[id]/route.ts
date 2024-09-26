import { NextResponse } from 'next/server'
import { createCanvas, SKRSContext2D } from '@napi-rs/canvas'
import { getDocumentById } from '@/app/actions/getDocuments'

// @ts-ignore
import * as pdfjs from 'pdfjs-dist/build/pdf.mjs'

import path from 'path'

// Configure pdfjs worker
/* GlobalWorkerOptions.workerSrc = path.join(
  process.cwd(),
  'node_modules',
  'pdfjs-dist',
  'legacy',
  'build',
  'pdf.worker.min.js'
)
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    // Fetch the document URL from Postgres
    const document = await getDocumentById(id)
    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    const blobUrl = document.blob_url
    if (!blobUrl) {
      return NextResponse.json({ error: 'Blob URL not found' }, { status: 404 })
    }

    // Fetch the PDF from the blob URL using the global fetch
    const response = await fetch(blobUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch PDF from blob URL')
    }
    const arrayBuffer = await response.arrayBuffer()

    // Make sure the worker is loaded
    // @ts-ignore
    await import('pdfjs-dist/build/pdf.worker.min.mjs')

    const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(0) // Pages are zero-indexed in pdfjs
    const viewport = page.getViewport({ scale: 1.5 })
    const canvas = createCanvas(viewport.width, viewport.height)
    const context = canvas.getContext('2d') as ExtendedContext2D

    // Implement the missing method as a no-op
    if (!context.drawFocusIfNeeded) {
      context.drawFocusIfNeeded = () => {
        // No operation needed
      }
    }

    await page.render({
      canvasContext: context as unknown as CanvasRenderingContext2D,
      viewport: viewport
    }).promise

    const pngBuffer = canvas.toBuffer('image/png')

    return new NextResponse(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, immutable'
      }
    })
  } catch (err) {
    console.error('Error generating preview:', err)
    return NextResponse.json(
      { error: 'Failed to generate preview' },
      { status: 500 }
    )
  }
}

interface ExtendedContext2D extends SKRSContext2D {
  drawFocusIfNeeded?: () => void
}
