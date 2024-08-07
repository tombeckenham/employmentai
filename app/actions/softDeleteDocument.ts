import { auth } from '@/auth'
import { sql } from '@vercel/postgres'

export async function softDeleteDocument(documentId: string) {
  const session = await auth()

  if (!session || !session.user || !session.user.id) {
    throw new Error('User not authenticated')
  }

  const result = await sql`
    UPDATE documents
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = ${documentId} AND user_id = ${session.user.id}
    RETURNING id
  `

  if (result.rowCount === 0) {
    throw new Error('Document not found or user not authorized to delete')
  }

  return result.rows[0].id
}
