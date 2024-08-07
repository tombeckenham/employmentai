import { Suspense } from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import { sql } from '@vercel/postgres'
import { Upload, File, ArrowRight, Trash2 } from 'lucide-react'
import DocumentUpload from '@/components/document-upload'
import { getDocuments } from '../actions/getDocuments'
import { softDeleteDocument } from '../actions/softDeleteDocument'
import DocumentCard from '@/components/document-card'

async function DocumentList() {
  const documents = await getDocuments()

  async function handleDelete(id: string) {
    'use server'
    await softDeleteDocument(id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map(doc => (
        <DocumentCard
          key={doc.id}
          id={doc.id}
          filename={doc.filename}
          contentType={doc.content_type}
          createdAt={doc.created_at}
          onDelete={handleDelete}
        />
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
