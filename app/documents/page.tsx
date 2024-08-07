import { Suspense } from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import { sql } from '@vercel/postgres'
import { Upload, File, ArrowRight } from 'lucide-react'
import DocumentUpload from '@/components/document-upload'

async function DocumentList() {
  const session = await auth()

  if (!session || !session.user) {
    return <div>Please log in to view your documents.</div>
  }

  const documents = await sql`
    SELECT id, filename, content_type, created_at 
    FROM documents 
    WHERE "user_id" = ${session.user.id} 
    ORDER BY created_at DESC
  `

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.rows.map(doc => (
        <div
          key={doc.id}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center mb-4">
              <File className="size-8 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {doc.filename}
              </h3>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Uploaded on {new Date(doc.created_at).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Type: {doc.content_type}
            </p>
          </div>
          <Link
            href={`/report/${doc.id}`}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Report <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Your Documents
          </h1>

          <div className="mb-8 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Upload a New Document
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Upload a new document to get an AI-powered analysis and
                  report.
                </p>
              </div>
              <div className="mt-5">
                <DocumentUpload />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Uploaded Documents
          </h2>
          <Suspense
            fallback={
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full size-8 border-y-2 border-blue-500"></div>
                <p className="mt-2 text-gray-500">Loading your documents...</p>
              </div>
            }
          >
            <DocumentList />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
