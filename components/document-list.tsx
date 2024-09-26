import DocumentCard from '@/components/document-card'
import { getDocuments } from '../app/actions/getDocuments'
import { softDeleteDocument } from '../app/actions/softDeleteDocument'

async function DocumentList() {
  // Removed handleDelete since deletion is moved to the report page

  const documents = await getDocuments()

  const classifiedDocuments = documents.reduce(
    (acc: Record<string, Record<string, any[]>>, doc: any) => {
      const { employer, employee } = doc
      if (!acc[employer]) {
        acc[employer] = {}
      }
      if (!acc[employer][employee]) {
        acc[employer][employee] = []
      }
      acc[employer][employee].push(doc)
      return acc
    },
    {}
  )

  return (
    <div className="space-y-6">
      {Object.entries(classifiedDocuments).map(([company, people]) => (
        <div key={company} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-black">{company}</h2>
          {Object.entries(people).map(([person, docs]) => (
            <div key={person} className="ml-4">
              <h3 className="text-lg font-semibold mb-2 text-black">
                {person}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docs.map((doc: any) => (
                  <DocumentCard
                    key={doc.id}
                    id={doc.id}
                    filename={doc.filename}
                    contentType={doc.content_type}
                    createdAt={doc.created_at}
                    // Removed the onDelete prop
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
