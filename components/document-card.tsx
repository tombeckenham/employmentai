'use client'

import Link from 'next/link'
import { File, ArrowRight } from 'lucide-react'

interface DocumentCardProps {
  id: string
  filename: string
  contentType: string
  createdAt: string
  // Removed onDelete prop
  documentType: string
  relatedPerson: string
  company: string
}

export default function DocumentCard({
  id,
  filename,
  contentType,
  createdAt,
  // Removed onDelete prop
  documentType,
  relatedPerson,
  company
}: DocumentCardProps) {
  // Removed handleDelete and related state

  return (
    // Made the entire card clickable by wrapping with Link
    <Link
      href={`/report/${id}`}
      className="block bg-white bg-opacity-20 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <File className="size-8 text-blue-500 mr-3" />
          <h3 className="text-lg font-semibold text-white truncate">
            {filename}
          </h3>
        </div>
        <p className="text-sm text-white mb-2">
          Uploaded on {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-white mb-4">Type: {contentType}</p>

        {/* Added Document Type Label */}
        <div className="px-4 py-2 bg-white bg-opacity-10 rounded-lg mb-4">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full">
            {documentType}
          </span>
        </div>

        {/* Added Preview of the First Page */}
        <div className="preview-container">
          <img
            src={`/api/documents/preview/${id}`}
            alt="Document Preview"
            className="w-full h-40 object-cover rounded-md"
          />
        </div>
      </div>
      {/* 
      Removed the footer containing the View Report link and Delete button
      */}
    </Link>
  )
}
