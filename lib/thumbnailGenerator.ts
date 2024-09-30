import { put } from '@vercel/blob'
import { updateDocumentThumbnail, getDocUrl } from '@/lib/dbOperations'
import { renderPdfToPng } from './pdfjs'
// Add the new thumbnail processing function
export async function processCreateThumbnail(documentId: string) {
  const blobUrl = await getDocUrl(documentId)
  const response = await fetch(blobUrl)
  const arrayBuffer = await response.arrayBuffer()

  const imageBuffer = await renderPdfToPng(arrayBuffer)

  // Upload the thumbnail to Vercel Blob
  const thumbnailFilename = `thumbnails/${documentId}.png`
  const thumbnailBlob = await put(thumbnailFilename, imageBuffer, {
    access: 'public'
  })

  await updateDocumentThumbnail(documentId, thumbnailBlob.url)
}
