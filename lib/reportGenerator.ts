import { sql } from '@/lib/db'
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
  You are an expert in employment documents. Analyze the following employment contract and provide a detailed report with the following sections:

  1. Document Classification:
     - Classify the document into one of the following types: ${employmentDocumentTypes.join(', ')}.
     - Extract the name of the organization, the name of the employee, the role/position, salary (including 3 characters currency code), and job description.

  2. Contract Summary:
     - Salary (including 3 characters currency code)
     - Start Date
     - Vacation Days
     - Notice Period
     - Role/Position
     - Job Description (brief summary)
     - Contract Type (e.g., Full-time, Part-time, Contract)
     - Contract Date

  3. Highlights:
     - List 2-3 positive aspects of the contract
     - List 2-3 potential concerns or negative aspects

  4. Detailed Analysis:
     For each of the following sections, provide details and a fairness assessment (Fair, Slightly Favors Employer, Favors Employer, etc.):
     a. Compensation
     b. Benefits
     c. Work Arrangements
     d. Intellectual Property
     e. Non-Compete Clause
     f. Termination and Severance

  Provide the analysis in the following JSON format:

  {
    "documentType": "employment contract",
    "organization": "Company Name",
    "employee": "Employee Name",
    "role": "Job Title",
    "salary": 75000,
    "salaryCurrency": "USD",
    "jobDescription": "Brief job description",
    "contractType": "Full-time",
    "contractDate": "2023-05-15",
    "summary": {
      "startDate": "YYYY-MM-DD",
      "vacationDays": "Number of days",
      "noticePeriod": "Notice period duration"
    },
    "highlights": {
      "positive": ["Positive aspect 1", "Positive aspect 2"],
      "negative": ["Concern 1", "Concern 2"]
    },
    "sections": [
      {
        "sectionTitle": "Compensation",
        "evaluation": "Fair/Slightly Favors Employer/Favors Employer",
        "reason": "Detailed explanation of the evaluation",
        "normalPractice": "Description of normal practice in similar contracts",
        "riskLevel": "Low/Medium/High",
        "recommendation": "Recommendation for the employee"
      },
      // ... repeat for other sections ...
    ]
  }

  Document content: {context}
`

export async function generateContractReport(
  contractUrl: string
): Promise<ContractReport> {
  try {
    const text = await processPDFsAndAnswerQuestions([contractUrl], prompt)
    const reportData = JSON.parse(text)

    const report: ContractReport = {
      documentType: reportData.documentType,
      organization: reportData.organization,
      employee: reportData.employee, // Changed from relatedPerson
      role: reportData.role,
      salary: reportData.salary,
      salaryCurrency: reportData.salaryCurrency,
      jobDescription: reportData.jobDescription,
      contractType: reportData.contractType,
      contractDate: reportData.contractDate,
      summary: reportData.summary,
      highlights: reportData.highlights,
      sections: reportData.sections
    }

    return report
  } catch (error) {
    console.error('Error generating contract report:', error)
    throw error
  }
}
