import { getDocsFromPDF } from './documentAnalysis'
import { ContractReport, ContractData } from './types'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { JsonOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { Document } from '@langchain/core/documents'
import { LangChainTracer } from 'langchain/callbacks'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from '@langchain/openai'

import { z } from 'zod'

const employmentDocumentTypes = [
  'employment contract',
  'offer letter',
  'termination letter',
  'performance review',
  'pay slip',
  'other'
]

const prompt = `
  You are an expert in employment documents. Analyze the document and firstly determine the type of document it is. It should be one of the following types: ${employmentDocumentTypes.join(', ')}.
  If it is not one of the following types or is not employment related, please respond with "other".
  If it is some sort of employment related document, then determine who the employer and employee are. The employer will often be referred to as "Company" or "Employer" in the document. The employee will be referred to as "Employee". The company will often include a company registration number or company address in the document.
  For an employment contract, the employer and employee will be listed as the parties to the contract. The contract is between the employer and employee. Look for a title or section that refers to these parties and use that to determine who the employer and employee are.
  If you are unable to determine who the employer or employee is, please respond with "unknown".
 
  If it is an employment contract, then analyze the document and provide a detailed report with the following sections:

  1. Document Classification:
     - Classify the document into one of the following types: ${employmentDocumentTypes.join(', ')}.
     - Extract the following information:
       * Employer: The company name who the document is created by
       * Employee: The full name of the person being hired
       * Role/Position: The job title of the employee
       * Salary: Including the amount and 3-character currency code
       * Job Description: A brief summary of the role

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
    "employer": "Company Name (the hiring entity)",
    "employee": "Employee Full Name",
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

  Important: The 'employer' field must contain only the name of the company that is hiring, typically referred to as "Company" or "Employer" in the contract. Do not include any other entities mentioned in the contract.

  Document content: {context}
`

const contractSchema = z.object({
  documentType: z
    .enum([
      'employment contract',
      'offer letter',
      'termination letter',
      'performance review',
      'pay slip',
      'other'
    ])
    .optional()
    .describe('Type of employment document'),
  employer: z.string().optional().describe('Company Name (the hiring entity)'),
  employee: z.string().optional().describe('Employee Full Name'),
  role: z.string().optional().describe('Job Title'),
  salary: z.number().optional().describe('Salary amount'),
  salaryCurrency: z.string().optional().describe('Salary currency code'),
  jobDescription: z.string().optional().describe('Brief job description'),
  contractType: z
    .enum(['Full-time', 'Part-time', 'Contract'])
    .optional()
    .describe('Contract type'),
  contractDate: z.string().optional().describe('YYYY-MM-DD'),
  startDate: z.string().optional().describe('YYYY-MM-DD'),
  vacationDays: z.string().optional().describe('Number of days'),
  noticePeriod: z.string().optional().describe('Notice period duration')
})

const model = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
  temperature: 0
})

const structuredLlm = model.withStructuredOutput(contractSchema)

const extractionPrompt = PromptTemplate.fromTemplate(`
You are an expert in employment documents. Extract the following information from the given document:

{format_instructions}

Document content: {context}
`)

const extractionOutputParser = new JsonOutputParser<ContractData>()

const tracer = new LangChainTracer()

const extractionChain = RunnableSequence.from([
  extractionPrompt,
  new ChatOpenAI({ modelName: 'gpt-4o-mini', temperature: 0 }),
  extractionOutputParser
]).withConfig({ callbacks: [tracer] })

const analysisPrompt = PromptTemplate.fromTemplate(`
You are an expert in analyzing employment contracts. Given the following extracted contract data and full document content, provide an analysis including highlights and an evaluation of each section:

Contract Data:
{contract_data}

Full Document Content:
{full_content}

Provide your analysis in the following format:

{format_instructions}
`)

const analysisOutputParser = new JsonOutputParser<ContractReport>()

const analysisChain = RunnableSequence.from([
  analysisPrompt,
  new ChatOpenAI({ modelName: 'gpt-4o-mini', temperature: 0 }),
  analysisOutputParser
]).withConfig({ callbacks: [tracer] })

async function getDocumentContent(contractUrl: string): Promise<Document[]> {
  return await getDocsFromPDF(contractUrl)
}

async function splitDocumentsIntoChunks(docs: Document[]): Promise<Document[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100
  })
  return await splitter.splitDocuments(docs)
}

function mergePartialData(partialData: ContractData[]): ContractData {
  return partialData.reduce(
    (merged, current) => ({
      ...merged,
      ...current
    }),
    {} as ContractData
  )
}

function mergePartialReports(
  partialReports: ContractReport[]
): Partial<ContractReport> {
  return partialReports.reduce(
    (merged, current) => ({
      ...merged,
      ...current,
      highlights: {
        positive: [
          ...(merged.highlights?.positive || []),
          ...(current.highlights?.positive || [])
        ].filter((v, i, a) => a.indexOf(v) === i),
        negative: [
          ...(merged.highlights?.negative || []),
          ...(current.highlights?.negative || [])
        ].filter((v, i, a) => a.indexOf(v) === i)
      },
      sections: [
        ...(merged.sections || []),
        ...(current.sections || [])
      ].filter(
        (section, index, self) =>
          index === self.findIndex(t => t.sectionTitle === section.sectionTitle)
      )
    }),
    { highlights: { positive: [], negative: [] } } as Partial<ContractReport>
  )
}

// New function to create and populate the vector store
async function createVectorStore(docs: Document[]): Promise<MemoryVectorStore> {
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings()
  )
  return vectorStore
}

async function queryVectorStore(
  vectorStore: MemoryVectorStore,
  query: string,
  llm: ChatOpenAI
): Promise<string> {
  const relevantDocs = await vectorStore.similaritySearch(query, 3)
  const context = relevantDocs.map(doc => doc.pageContent).join('\n\n')

  const response = await llm.invoke(
    `Based on the following context, ${query}\n\nContext: ${context}`
  )

  return response.content.toString()
}

export async function generateContractReport(
  contractUrl: string
): Promise<ContractReport> {
  try {
    /*
    const docs = await getDocumentContent(contractUrl)
    const chunks = await splitDocumentsIntoChunks(docs)
    const vectorStore = await createVectorStore(chunks)

    const llm = new ChatOpenAI({ modelName: 'gpt-4o-mini', temperature: 0 })

    // Extract data using vector store and LLM
    const extractionQueries = [
      'What is the document type?',
      'Who is the employer?',
      'Who is the employee?',
      "What is the employee's role or position?",
      'What is the salary and currency?',
      'What is the job description?',
      'What is the contract type?',
      'What is the contract date?',
      'What is the start date?',
      'How many vacation days are provided?',
      'What is the notice period?'
    ]

    const extractedInfo = await Promise.all(
      extractionQueries.map(query => queryVectorStore(vectorStore, query, llm))
    )

    console.log('Extracted info:', extractedInfo)
    const extractedData = await structuredLlm.invoke(
      `Analyze this employment document information and return only the information you can determine accurately, otherwise omit the field. Don't return any other text or null values: ${extractedInfo.join(' ')}`
    )

    console.log('Extracted data:', extractedData)

    // Analyze the document
    const analysisQueries = [
      'What are the positive aspects of the contract?',
      'What are the potential concerns or negative aspects of the contract?',
      'Analyze the compensation section',
      'Analyze the benefits section',
      'Analyze the work arrangements section',
      'Analyze the intellectual property section',
      'Analyze the non-compete clause',
      'Analyze the termination and severance section'
    ]

    const analysisInfo = await Promise.all(
      analysisQueries.map(query => queryVectorStore(vectorStore, query, llm))
    )

    const analysisResult = await analysisChain.invoke({
      contract_data: JSON.stringify(extractedData),
      full_content: analysisInfo.join('\n\n'),
      format_instructions: analysisOutputParser.getFormatInstructions()
    })

    console.log('Analysis result:', analysisResult)
    */
    // Return dummy data for testing purposes
    const dummyData: ContractReport = {
      documentType: 'employment contract',
      employer: 'Acme Corporation',
      employee: 'John Doe',
      role: 'Software Engineer',
      salary: 80000,
      salaryCurrency: 'USD',
      jobDescription: 'Develop and maintain software applications',
      contractType: 'Full-time',
      contractDate: '2023-07-01',
      startDate: '2023-07-15',
      vacationDays: '20 days per year',
      noticePeriod: '30 days',
      highlights: {
        positive: ['Competitive salary', 'Generous vacation policy'],
        negative: ['Long working hours', 'Strict non-compete clause']
      },
      sections: [
        {
          sectionTitle: 'Compensation',
          evaluation: 'Fair',
          reason: 'Salary is competitive for the industry and role',
          normalPractice: 'Similar to other companies in the tech sector',
          riskLevel: 'Low',
          recommendation: 'Consider negotiating for performance bonuses'
        },
        {
          sectionTitle: 'Benefits',
          evaluation: 'Slightly Favors Employer',
          reason: 'Standard benefits package, but lacks some modern perks',
          normalPractice:
            'Many tech companies offer more comprehensive benefits',
          riskLevel: 'Medium',
          recommendation:
            'Inquire about additional benefits like remote work options'
        }
      ]
    }

    console.log('Returning dummy data:', dummyData)

    return dummyData
  } catch (error) {
    console.error('Error generating contract report:', error)
    throw error
  }
}
