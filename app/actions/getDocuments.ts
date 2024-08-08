import { auth } from '@/auth'
import { sql } from '@vercel/postgres'

export async function getDocuments(includeDeleted: boolean = false) {
  const session = await auth()

  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authenticated')
  }

  const documents = includeDeleted
    ? await sql`
  SELECT id, filename, blob_url, content_type, created_at, deleted_at
  FROM documents 
  WHERE user_id = ${session.user.id} 
  ORDER BY created_at DESC
  `
    : await sql`
    SELECT id, filename, blob_url, content_type, created_at, deleted_at
    FROM documents 
    WHERE user_id = ${session.user.id} 
    AND deleted_at IS NULL
    ORDER BY created_at DESC
  `

  return documents.rows
}

export async function getDocumentById(
  id: string,
  includeDeleted: boolean = false
) {
  const session = await auth()

  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authenticated')
  }

  const documents = includeDeleted
    ? await sql`
  SELECT id, filename, blob_url, content_type, created_at, deleted_at
  FROM documents 
  WHERE user_id = ${session.user.id} 
  AND id = ${id}
  ORDER BY created_at DESC
  `
    : await sql`
    SELECT id, filename, blob_url, content_type, created_at, deleted_at
    FROM documents 
    WHERE user_id = ${session.user.id} 
    AND id = ${id}
    AND deleted_at IS NULL
    ORDER BY created_at DESC
  `
  if (documents.rows.length > 0) {
    return documents.rows[0]
  }
  return undefined
}
