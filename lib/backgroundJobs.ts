import { Client } from '@upstash/qstash'

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!
})

export async function triggerBackgroundJob(jobType: string, data: any) {
  let apiRoute = '404'

  switch (jobType) {
    case 'createThumbnail':
      apiRoute = 'create-thumbnail'
      break
    case 'generateReport':
      apiRoute = 'generate-report'
      break
    default:
      throw new Error('Invalid job type')
  }
  const domain =
    process.env.WEBHOOK_URL ||
    (process.env.NODE_ENV === 'production'
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_URL)

  const webhookUrl = `https://${domain}/api/${apiRoute}`

  await qstash.publishJSON({
    url: webhookUrl,
    body: { jobType, ...data }
  })
}
