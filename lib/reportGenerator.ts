import { processPDFsAndAnswerQuestions } from './documentAnalysis'
import { ContractReport } from './types'

const employmentDocumentTypes = [
  'employment contract',
  'offer letter',
  'termination letter',
  'performance review',
  'pay slip',
  'other document'
]

const prompt = `
  You are an expert in employment documents. Please classify the following document into one of the following types: ${employmentDocumentTypes.join(', ')}.
  Extract the type of employment document, the name of organization, and the name of the person it is related to. Store those values in the documentType, organization, and relatedPerson fields respectively.
  If the document is an employment contract, go through the contract section by section and indicate if each section is fair, favors the employer, or favors the employee and why. Indicate if it is normal practice or not. Return the results in the following JSON format:
  {
    "documentType": "type",
    "organization": "organization",
    "relatedPerson": "person",
    "sections": [
      {
        "sectionTitle": "title",
        "evaluation": "fair/favors employer/favors employee",
        "reason": "reason for evaluation",
        "normalPractice": "yes/no"
      },
      ...
    ]
  }
  Example:
  {
    "documentType": "employment contract",
    "organization": "ABC Corp",
    "relatedPerson": "John Doe",
    "sections": [
      {
        "sectionTitle": "Compensation",
        "evaluation": "favors employer",
        "reason": "The compensation is below industry standards.",
        "normalPractice": "no"
      },
      {
        "sectionTitle": "Termination",
        "evaluation": "fair",
        "reason": "The termination clause is standard and follows legal requirements.",
        "normalPractice": "yes"
      }
    ]
  }
  
  Document content: {context}
`

export async function generateContractReport(
  contractURL: string
): Promise<ContractReport> {
  const text = await processPDFsAndAnswerQuestions([contractURL], prompt)
  const report = JSON.parse(text)
  return report
}
