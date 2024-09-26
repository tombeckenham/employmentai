import { Message } from 'ai'

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface Section {
  sectionTitle: string
  evaluation: string
  reason: string
  normalPractice: string
  riskLevel: string
  recommendation: string
}

export interface ContractData {
  documentType:
    | 'employment contract'
    | 'offer letter'
    | 'termination letter'
    | 'performance review'
    | 'pay slip'
    | 'other'
    | undefined
  employer: string | undefined
  employee: string | undefined
  role: string | undefined
  salary: number | undefined
  salaryCurrency: string | undefined
  jobDescription: string | undefined
  contractType: string | undefined
  contractDate: string | undefined
  startDate: string | undefined
  vacationDays: string | undefined
  noticePeriod: string | undefined
}

export interface ContractReport extends ContractData {
  highlights: {
    positive: string[]
    negative: string[]
  }
  sections: Section[]
}

export interface Document {
  id: string
  filename: string
  content_type: string
  created_at: string
  document_type: string
  employee: string
  employer: string
  thumbnail_url?: string
}
