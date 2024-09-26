import { NextResponse } from 'next/server'
import { createCanvas } from '@napi-rs/canvas'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.node.js'
import { getDocumentById } from '@/app/actions/getDocuments'

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

    // Fetch the PDF from the blob URL
    const response = await fetch(blobUrl)
    if (!response.ok) {
      throw new Error('Failed to fetch PDF from blob URL')
    }
    const arrayBuffer = await response.arrayBuffer()

    // Read the PDF document using pdfjs
    const loadingTask = getDocument({ data: arrayBuffer })
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(1) // Pages are one-indexed in pdfjs
    const scale = 1.5
    const viewport = page.getViewport({ scale })

    // Create a canvas with the right dimensions
    const canvas = createCanvas(viewport.width, viewport.height)
    const context = canvas.getContext('2d')

    // Render the PDF page on the canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    }

    await page.render(renderContext).promise

    // Convert the canvas to a PNG buffer
    const pngBuffer = canvas.toBuffer('image/png')

    // Return the PNG image
    return new NextResponse(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, immutable' // Cache for 1 day
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