'use server'

import { sql } from '@vercel/postgres'

export async function getReportForDocument(id: string): Promise<string | null> {
  try {
    const { rows } = await sql`
      SELECT summary FROM reports WHERE document_id = ${id}
    `
    return rows[0]?.summary || null
  } catch (error) {
    console.error('Error fetching report:', error)
    return null
  }
}
