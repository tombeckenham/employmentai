import { sql } from '@vercel/postgres'
import DocumentCard from '@/components/document-card'
import { getDocuments } from '../app/actions/getDocuments'
import { softDeleteDocument } from '../app/actions/softDeleteDocument'

async function DocumentList() {
  const documents = await getDocuments()

  async function handleDelete(id: string) {
    'use server'
    await softDeleteDocument(id)
  }

  async function getClassifiedDocuments(): Promise<
    Record<string, Record<string, any[]>>
  > {
    const { rows: documents } = await sql`
      SELECT d.id, d.filename, d.content_type, d.created_at, dr.document_type AS documentType, o.name AS organization, p.name AS relatedPerson
      FROM documents d
      JOIN document_reports dr ON d.id = dr.document_id
      JOIN organizations o ON dr.organization_id = o.id
      JOIN people p ON dr.related_person_id = p.id
      WHERE d.deleted_at IS NULL
    `

    const groupedDocuments = documents.reduce((acc: any, doc: any) => {
      const { organization, relatedperson: relatedPerson } = doc
      if (!acc[organization]) {
        acc[organization] = {}
      }
      if (!acc[organization][relatedPerson]) {
        acc[organization][relatedPerson] = []
      }
      acc[organization][relatedPerson].push(doc)
      return acc
    }, {})

    return groupedDocuments
  }

  const classifiedDocuments = await getClassifiedDocuments()

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
                    onDelete={handleDelete}
                    documentType={doc.documentType} // Add document type as a label
                    relatedPerson={doc.relatedPerson}
                    company={doc.associatedCompany}
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
