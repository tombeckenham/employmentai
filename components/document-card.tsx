'use client'

import { useState } from 'react'
import Link from 'next/link'
import { File, ArrowRight, Trash2 } from 'lucide-react'

interface DocumentCardProps {
  id: string
  filename: string
  contentType: string
  createdAt: string
  onDelete: (id: string) => Promise<void>
}

export default function DocumentCard({
  id,
  filename,
  contentType,
  createdAt,
  onDelete
}: DocumentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(id)
      // TODO: change to a client component update
      window.location.reload()
    } catch (error) {
      console.error('Failed to delete document:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-4">
          <File className="size-8 text-blue-500 mr-3" />
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {filename}
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          Uploaded on {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 mb-4">Type: {contentType}</p>
      </div>
      <div className="flex justify-between items-center">
        <Link
          href={`/report/${id}`}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View Report <ArrowRight className="ml-2 size-4" />
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex items-center justify-center p-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          <Trash2 className="size-5" />
        </button>
      </div>
    </div>
  )
}
