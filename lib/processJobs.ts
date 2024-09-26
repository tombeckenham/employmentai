import { generateContractReport } from '@/lib/reportGenerator'
import { sql } from '@vercel/postgres'
import { storeReportInDB } from '@/lib/dbOperations'
import { processCreateThumbnail } from './thumbnailGenerator'

export async function processJob(data: any) {
  const { jobType, documentId } = data

  try {
    const { rows } = await sql`
      SELECT blob_url FROM documents WHERE id = ${documentId}
    `
    const blobUrl = rows[0]?.blob_url

    if (!blobUrl) {
      throw new Error(`No blob URL found for document ID: ${documentId}`)
    }

    if (jobType === 'generateReport') {
      const report = await generateContractReport(blobUrl)

      await storeReportInDB(documentId, report)
    } else if (jobType === 'createThumbnail') {
      await processCreateThumbnail(documentId, blobUrl)
    }
  } catch (error) {
    console.error('Error processing job:', error)
  }

  // ... other job types ...
}
