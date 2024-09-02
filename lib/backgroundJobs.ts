import { Client } from '@upstash/qstash'
import { generateContractReport } from '@/lib/reportGenerator'
import { sql } from '@vercel/postgres'

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!
})

export async function triggerBackgroundJob(jobType: string, data: any) {
  const webhookUrl = `https://${process.env.VERCEL_URL || process.env.WEBHOOK_URL}/api/process-report`

  console.log('webhookUrl', webhookUrl)
  await qstash.publishJSON({
    url: webhookUrl,
    body: { jobType, ...data }
  })
}

export async function processJob(data: any) {
  const { documentId } = data

  try {
    console.log('Processing job:', data)
    const { rows } = await sql`
      SELECT blob_url FROM documents WHERE id = ${documentId}
    `
    const blobUrl = rows[0]?.blob_url

    if (!blobUrl) {
      throw new Error(`No blob URL found for document ID: ${documentId}`)
    }

    const reportText = await generateContractReport(blobUrl)

    await sql`
      INSERT INTO reports (document_id, summary, key_points, sentiment, entities)
      VALUES (
        ${documentId},
        ${reportText},
        ${JSON.stringify({})},
        ${JSON.stringify({})},
        ${JSON.stringify({})}
      )
    `
  } catch (error) {
    console.error('Error processing job:', error)
  }
}
