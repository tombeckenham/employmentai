'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge' // Retained import for Badge
import {
  employmentDocumentTypeColorMap,
  employmentDocumentTypes
} from '@/lib/employmentDocumentTypes'
import { cn } from '@/lib/utils'

interface DocumentCardProps {
  id: string
  filename: string
  contentType: string
  createdAt: string
  documentType: string
  relatedPerson: string
  company: string
  thumbnailUrl?: string // Add this prop
}

export default function DocumentCard({
  id,
  filename,
  contentType,
  createdAt,
  documentType,
  relatedPerson,
  company,
  thumbnailUrl
}: DocumentCardProps) {
  const badgeColor = employmentDocumentTypeColorMap[documentType] || 'gray'

  return (
    <Link
      href={`/report/${id}`}
      className="block bg-white/20 backdrop-blur-lg rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Thumbnail Section */}
        {thumbnailUrl ? (
          <div className="w-full h-48 relative mb-4">
            <Image
              src={thumbnailUrl}
              alt="Document Thumbnail"
              fill
              className="object-contain rounded-md" // Removed any border classes
            />
          </div>
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-md mb-4">
            <p className="text-gray-500">No Preview Available</p>
          </div>
        )}

        <div className="flex-1">
          {/* Removed the <File> icon */}
          <h3 className="text-lg font-semibold text-white truncate">
            {filename}
          </h3>
          <p className="text-sm text-white mb-1">
            Uploaded on {new Date(createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-white mb-3">Type: {contentType}</p>

          {/* Replaced Document Type Label with shadcn Badge and dynamic colors */}
          <Badge
            className={cn('rounded-full mb-4 px-2 py-1 text-xs font-medium', {
              'bg-indigo-600/20 text-indigo-400': badgeColor === 'indigo',
              'bg-green-600/20 text-green-400': badgeColor === 'green',
              'bg-yellow-600/20 text-yellow-400': badgeColor === 'yellow',
              'bg-purple-600/20 text-purple-400': badgeColor === 'purple',
              'bg-gray-600/20 text-gray-400': badgeColor === 'gray'
              // Add more mappings as needed
            })}
          >
            {documentType}
          </Badge>
        </div>

        {/* Action Section */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <ChevronRight className="size-5 text-indigo-500" />
            <span className="text-indigo-500 text-sm">View Details</span>
          </div>
          {/* Optional: Add a delete button if needed */}
          {/*
          <button className="text-red-400 hover:text-red-500">
            <Trash2 className="size-5" />
          </button>
          */}
        </div>
      </div>
    </Link>
  )
}
