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

export interface ContractReport {
  documentType: string
  organization: string
  employee: string // Changed from relatedPerson
  role: string
  salary: number
  salaryCurrency: string
  jobDescription: string
  contractType: string
  contractDate: string
  summary: {
    startDate: string
    vacationDays: string
    noticePeriod: string
  }
  highlights: {
    positive: string[]
    negative: string[]
  }
  sections: Section[]
}
