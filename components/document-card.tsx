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

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useState } from 'react'

interface DocumentCardProps {
  id: string
  filename: string
  contentType: string
  createdAt: string
  documentType: string
  relatedPerson: string
  company: string
  thumbnailUrl?: string // Ensure this prop is handled
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
  const isPending = !company || !relatedPerson
  const [showFullName, setShowFullName] = useState(false)

  const toggleFullName = () => {
    setShowFullName(!showFullName)
  }

  return (
    <Link href={`/report/${id}`} className="block">
      <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`${filename} thumbnail`}
            width={100}
            height={100}
            className="mb-2 rounded border size-24 object-cover" // Consistent height and width, object-cover
          />
        ) : (
          <div className="mb-2 size-24 flex items-center justify-center bg-gray-200 rounded border">
            <span className="text-gray-500 text-sm">No Preview</span>{' '}
            {/* Placeholder for missing preview */}
          </div>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <h3
              className="text-lg font-bold truncate cursor-pointer"
              onClick={toggleFullName}
            >
              {filename}
            </h3>
          </TooltipTrigger>
          <TooltipContent>
            <span>{filename}</span>
          </TooltipContent>
        </Tooltip>
        {showFullName && <p className="text-sm text-gray-700">{filename}</p>}
        <p className="text-sm text-gray-500">{contentType}</p>
        <p className="text-sm text-gray-500">
          Uploaded:{' '}
          {new Date(createdAt).toLocaleString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}{' '}
        </p>

        {isPending ? (
          <Badge color="yellow" variant="default" className="mt-2">
            Pending
          </Badge>
        ) : (
          <Badge
            color={employmentDocumentTypeColorMap[documentType]}
            variant="outline"
          >
            {documentType}
          </Badge>
        )}
        <div className="mt-2 text-right text-blue-500">
          <ChevronRight className="inline-block size-4" />
        </div>
      </div>
    </Link>
  )
}
