import Link from 'next/link'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { sql } from '@vercel/postgres'
import { getDocuments } from '@/app/actions/getDocuments'

export default async function DocumentList() {
  const session = (await auth()) as Session

  if (!session || !session.user) {
    return <div>Please log in to view your documents.</div>
  }

  const documents = await getDocuments(false)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Documents</h2>
      {documents.length === 0 ? (
        <p>You haven&apos;t uploaded any documents yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {documents.map(doc => (
            <li key={doc.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.filename}
                  </p>
                  <p className="text-sm text-gray-500">
                    Uploaded on {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Link
                    href={doc.blob_url}
                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
