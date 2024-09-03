import ContractAnalysis from '@/components/contract-analysis-detailed'
import { getReportForDocument } from '@/app/actions/reportFetcher'
import { getDocumentById } from '@/app/actions/getDocuments'

export default async function ReportPage({
  params
}: {
  params: { id: string }
}) {
  const document = await getDocumentById(params.id)

  if (!document) {
    return <div>Document not found</div>
  }

  const report = await getReportForDocument(document.id)

  if (!report) {
    return <div>Report generation in progress...</div>
  }

  return (
    <>
      <ContractAnalysis report={report} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Document Report</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              {document.filename}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Uploaded on {new Date(document.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Document Type
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {report.documentType}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Organization
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {report.organization}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Employee</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {report.employee}
                </dd>
              </div>
              {/* Add more fields as needed */}
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}
