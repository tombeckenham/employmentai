import { put } from '@vercel/blob'
import { updateDocumentThumbnail } from '@/lib/dbOperations'
import { renderPdfToPng } from './pdfjs'

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

  const imageBuffer = await renderPdfToPng(arrayBuffer)

  // Upload the thumbnail to Vercel Blob
  const thumbnailFilename = `thumbnails/${documentId}.png`
  const thumbnailBlob = await put(thumbnailFilename, imageBuffer, {
    access: 'public'
  })

  await updateDocumentThumbnail(documentId, thumbnailBlob.url)
}
