import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { Readable } from 'stream'
import { auth } from '@/auth'
import { sql } from '@vercel/postgres'
import { generateContractReport } from '@/lib/reportGenerator'

// Define a type for our progress callback
type ProgressCallback = (progress: number) => void

// Create a singleton for storing upload progress
class UploadProgressTracker {
  private static instance: UploadProgressTracker
  private progress: number = 0

  private constructor() {}

  public static getInstance(): UploadProgressTracker {
    if (!UploadProgressTracker.instance) {
      UploadProgressTracker.instance = new UploadProgressTracker()
    }
    return UploadProgressTracker.instance
  }

  public getProgress(): number {
    return this.progress
  }

  public setProgress(progress: number): void {
    this.progress = progress
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  // Check if the user is authenticated
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  try {
    const filename = `${Date.now()}-${file.name}`
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const blob = await uploadWithProgress(filename, buffer, progress => {
      UploadProgressTracker.getInstance().setProgress(progress)
    })
    // Store document metadata in the database
    const result = await sql`
      INSERT INTO documents (user_id, filename, blob_url, content_type)
      VALUES (${session.user.id}, ${file.name}, ${blob.url}, ${file.type})
      RETURNING id
    `

    const documentId = result.rows[0].id
    // Generate the report
    // TODO: Do this in the background
    const reportText = await generateContractReport(blob.url)

    // Store document metadata in the database
    const reportResult = await sql`
     INSERT INTO reports (document_id, summary, key_points, sentiment, entities)
      VALUES (
        ${documentId},
        ${reportText},
        ${JSON.stringify({})},
         ${JSON.stringify({})},
         ${JSON.stringify({})},
      )
   `

    return NextResponse.json({
      message: 'File uploaded successfully',
      documentId: result.rows[0].id
    })
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

async function uploadWithProgress(
  filename: string,
  buffer: Buffer,
  progressCallback: ProgressCallback
) {
  const totalSize = buffer.length
  let uploadedSize = 0

  const readable = new Readable({
    read(size) {
      if (uploadedSize < totalSize) {
        const chunk = buffer.slice(uploadedSize, uploadedSize + size)
        this.push(chunk)
        uploadedSize += chunk.length
        const progress = Math.round((uploadedSize / totalSize) * 100)
        progressCallback(progress)
      } else {
        this.push(null)
      }
    }
  })

  return await put(filename, readable, { access: 'public' })
}
