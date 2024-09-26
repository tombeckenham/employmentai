import { put } from '@vercel/blob'
import { updateDocumentThumbnail } from '@/lib/dbOperations'
import { createCanvas, SKRSContext2D } from '@napi-rs/canvas'
// @ts-ignore
import * as pdfjs from 'pdfjs-dist/build/pdf.mjs'

// Add the new thumbnail processing function
export async function processCreateThumbnail(
  documentId: string,
  blobUrl: string
) {
  // Fetch the PDF from the blob URL
  const response = await fetch(blobUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch PDF for thumbnail creation')
  }
  const arrayBuffer = await response.arrayBuffer()

  // Render the first page of the PDF to an image using pdfjs and canvas
  // @ts-ignore
  await import('pdfjs-dist/build/pdf.worker.min.mjs')
  // Configure workerSrc if necessary
  // pdfjs.GlobalWorkerOptions.workerSrc = 'path/to/pdf.worker.js'

  const loadingTask = pdfjs.getDocument({ data: arrayBuffer })
  const pdf = await loadingTask.promise
  const page = await pdf.getPage(1) // Render first page

  const viewport = page.getViewport({ scale: 1.5 })
  const canvas = createCanvas(viewport.width, viewport.height)
  const context = canvas.getContext('2d') as SKRSContext2D

  await page.render({
    canvasContext: context as unknown as CanvasRenderingContext2D,
    viewport
  }).promise

  const imageBuffer = canvas.toBuffer('image/png')

  // Upload the thumbnail to Vercel Blob
  const thumbnailFilename = `thumbnails/${documentId}.png`
  const thumbnailBlob = await put(thumbnailFilename, imageBuffer, {
    access: 'public'
  })

  await updateDocumentThumbnail(documentId, thumbnailBlob.url)
}
