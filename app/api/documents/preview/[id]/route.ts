import { NextResponse } from 'next/server'
import { createCanvas, SKRSContext2D } from '@napi-rs/canvas'
import { getDocument, PDFDocumentProxy } from 'pdfjs-dist'
import { getDocumentById } from '@/app/actions/getDocuments'

// Create a wrapper for SKRSContext2D to satisfy pdfjs-dist requirements
class CanvasRenderingContext2DAdapter {
  private ctx: SKRSContext2D;

  constructor(ctx: SKRSContext2D) {
    this.ctx = ctx;
  }

  // Implement missing methods as no-ops or with basic functionality
  drawFocusIfNeeded() {}
  isPointInPath() { return false; }
  isPointInStroke() { return false; }

  // Proxy all other method calls to the underlying context
  [key: string]: any;
}

// Custom promise creation function to replace Promise.withResolvers()
function createResolvablePromise<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

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

    // Create an adapter for the context
    const contextAdapter = new Proxy(new CanvasRenderingContext2DAdapter(context), {
      get(target, prop) {
        if (prop in target) {
          return (target as any)[prop];
        }
        return (context as any)[prop];
      }
    });

    // Render the PDF page on the canvas
    const renderContext = {
      canvasContext: contextAdapter,
      viewport: viewport
    }

    const { promise, resolve, reject } = createResolvablePromise<void>();
    page.render(renderContext as any).then(resolve, reject);
    await promise;

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