'use client'

import DocumentCard from '@/components/document-card'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import type { Document } from '@/lib/types'
import { getDocuments } from '@/app/actions/getDocuments'

function DocumentList() {
  const { data: documents = [], error } = useSWR<Document[]>(
    '/api/documents',
    getDocuments,
    {
      refreshInterval: 5000,
      revalidateOnFocus: true
    }
  )

  if (error) return <div>Failed to load documents.</div>
  if (!documents.length) return <div>Loading...</div>

  const classifiedDocuments = documents.reduce(
    (acc: Record<string, Record<string, Document[]>>, doc: Document) => {
      const { employer, employee } = doc
      const isPending = !employer || !employee

      if (isPending) {
        // Categorize under 'Pending Reports'
        if (!acc['Pending Reports']) {
          acc['Pending Reports'] = {}
        }
        const person = 'Pending'
        if (!acc['Pending Reports'][person]) {
          acc['Pending Reports'][person] = []
        }
        acc['Pending Reports'][person].push(doc)
      } else {
        // Existing categorization by employer and employee
        if (!acc[employer]) {
          acc[employer] = {}
        }
        if (!acc[employer][employee]) {
          acc[employer][employee] = []
        }
        acc[employer][employee].push(doc)
      }

      return acc
    },
    {}
  )

  return (
    <div className="space-y-6">
      {Object.entries(classifiedDocuments).map(([company, people]) => (
        <div key={company} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-black">
            {company === 'Pending Reports' ? 'Pending Reports' : company}
          </h2>
          {Object.entries(people).map(([person, docs]) => (
            <div key={person} className="ml-4">
              <h3 className="text-lg font-semibold mb-2 text-black">
                {person}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docs.map((doc: Document) => (
                  <DocumentCard
                    key={doc.id}
                    id={doc.id}
                    filename={doc.filename}
                    contentType={doc.content_type}
                    createdAt={doc.created_at}
                    documentType={doc.document_type}
                    relatedPerson={doc.employee}
                    company={doc.employer}
                    thumbnailUrl={doc.thumbnail_url} // Pass the thumbnail URL
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default DocumentList
