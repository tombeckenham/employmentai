import { Client } from '@upstash/qstash'

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!
})

export async function triggerBackgroundJob(jobType: string, data: any) {
  const webhookUrl = `https://${process.env.WEBHOOK_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/process-job`

  const response = await qstash.publishJSON({
    url: webhookUrl,
    body: { jobType, ...data }
  })
}
