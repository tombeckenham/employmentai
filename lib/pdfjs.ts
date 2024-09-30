'use server'
// @ts-expect-error pdfjs is not typed
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.min.mjs'

import { createCanvas } from 'canvas'

// **Set the workerSrc**
export async function renderPdfToPng(pdfBuffer: ArrayBuffer): Promise<Buffer> {
  // @ts-expect-error pdfjs worker is not typed
  await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs')

  // **Load the PDF from the Uint8Array**
  const loadingTask = pdfjsLib.getDocument({ data: pdfBuffer })
  const pdf = await loadingTask.promise

  // **Get the first page**
  const page = await pdf.getPage(1)

  const viewport = page.getViewport({ scale: 2.0 })
  const canvas = createCanvas(viewport.width, viewport.height)
  const context = canvas.getContext('2d')

  const renderContext = {
    canvasContext: context,
    viewport: viewport
  }

  await page.render(renderContext).promise

  // **Convert canvas to PNG buffer**
  return canvas.toBuffer('image/png')
}
