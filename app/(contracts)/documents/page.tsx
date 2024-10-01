import { Suspense } from 'react'
import Link from 'next/link'
import { auth } from '@/auth'
import { Upload, File, ArrowRight, Trash2 } from 'lucide-react'
import DocumentUpload from '@/components/document-upload'
import DocumentList from '@/components/document-list' // Updated import path

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-extrabold text-white mb-6 text-center">
            Your Document Hub 📚✨
          </h1>

          <div className="mb-8 bg-white bg-opacity/20 backdrop-blur-lg rounded-xl shadow-lg">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                Drop Your Docs Here! 🚀
              </h3>
              <div className="mt-2 max-w-xl text-lg text-black">
                <p>
                  Upload your employment docs and watch the AI magic happen! 🧙‍♂️
                </p>
              </div>
              <div className="mt-5">
                <DocumentUpload />
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Your Document Collection 🗂️
          </h2>
          <Suspense
            fallback={
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full size-12 border-4 border-white border-t-transparent"></div>
                <p className="mt-4 text-xl text-white">
                  Loading your awesome docs...
                </p>
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
