import { Client } from '@upstash/qstash'
import { generateContractReport } from '@/lib/reportGenerator'
import { sql } from '@vercel/postgres'
import { storeReportInDB } from '@/lib/dbOperations'

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!
})

export async function triggerBackgroundJob(jobType: string, data: any) {
  const webhookUrl = `https://${'testemploymentai.requestcatcher.com' || process.env.VERCEL_URL || process.env.WEBHOOK_URL}/api/process-report`

  console.log('webhookUrl', webhookUrl, data)
  const response = await qstash.publishJSON({
    url: webhookUrl,
    body: { jobType, ...data }
  })

  console.log('response', response)
}

export async function processJob(data: any) {
  const { documentId } = data

  try {
    const { rows } = await sql`
      SELECT blob_url FROM documents WHERE id = ${documentId}
    `
    const blobUrl = rows[0]?.blob_url

    if (!blobUrl) {
      throw new Error(`No blob URL found for document ID: ${documentId}`)
    }

    const report = await generateContractReport(blobUrl)

    await storeReportInDB(documentId, report)
  } catch (error) {
    console.error('Error processing job:', error)
  }
}
