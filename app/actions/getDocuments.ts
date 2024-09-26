'use server'
import { auth } from '@/auth'
import { sql } from '@vercel/postgres'

const baseDocumentQuery = `
  SELECT 
    d.id, 
    d.filename, 
    d.blob_url, 
    d.content_type, 
    d.created_at, 
    d.deleted_at,
    d.thumbnail_url,
    e.name AS employee, 
    emp.name AS employer,
    dr.document_type AS document_type,
    CASE
      WHEN dr.id IS NULL THEN 'pending'
      ELSE 'completed'
    END AS report_status
  FROM documents d
  LEFT JOIN document_reports dr ON d.id = dr.document_id
  LEFT JOIN employees e ON dr.employee_id = e.id
  LEFT JOIN employers emp ON dr.employer_id = emp.id
  WHERE d.user_id = $1
`

export async function getDocuments() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('User not authenticated')
  }

  const { rows: documents } = await sql.query(
    `${baseDocumentQuery}
    AND d.deleted_at IS NULL
    ORDER BY d.created_at DESC`,
    [session.user.id]
  )

  return documents
}

export async function getDocumentById(
  id: string,
  includeDeleted: boolean = false
) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('User not authenticated')
  }

  const query = `${baseDocumentQuery}
    AND d.id = $2
    ${includeDeleted ? '' : 'AND d.deleted_at IS NULL'}
    ORDER BY d.created_at DESC
    LIMIT 1`

  const { rows } = await sql.query(query, [session.user.id, id])

  return rows[0] || undefined
}
