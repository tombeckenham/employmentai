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
  evaluation: 'fair' | 'favors employer' | 'favors employee'
  reason: string
  normalPractice: 'yes' | 'no'
}

export interface ContractReport {
  documentType: string
  organization: string
  relatedPerson: string
  sections: Section[]
}
