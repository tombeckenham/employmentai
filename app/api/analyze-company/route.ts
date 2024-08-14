// File: app/api/analyze-company/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { StringOutputParser } from '@langchain/core/output_parsers'

const model = new ChatOpenAI({
  modelName: 'gpt-4-0613',
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY
})

const template = `You are an AI assistant specialized in analyzing companies based on limited information. 
Given the following details about a company, estimate its funding stage, sector, and size.

Company: {company}
Job Title: {jobTitle}
Job Description: {jobDescription}

Please provide your analysis in the following format:
Funding Stage: [Seed/Series A/Series B/Series C/Series D+/Public]
Sector: [Technology/Finance/Healthcare/etc.]
Company Size: [Startup (<50 employees)/Small (50-250 employees)/Medium (251-1000 employees)/Large (1000+ employees)]

Explanation: [Brief explanation for your estimates]`

const promptTemplate = PromptTemplate.fromTemplate(template)

// Create the LCEL chain
const chain = RunnableSequence.from([
  promptTemplate,
  model,
  new StringOutputParser()
])

export async function POST(request: NextRequest) {
  try {
    const { company, jobTitle, jobDescription } = await request.json()

    const result = await chain.invoke({
      company,
      jobTitle,
      jobDescription
    })

    const lines = result.split('\n')
    const fundingStage = lines[0].split(':')[1].trim()
    const sector = lines[1].split(':')[1].trim()
    const companySize = lines[2].split(':')[1].trim()
    const explanation = lines.slice(4).join('\n').trim()

    return NextResponse.json({
      fundingStage,
      sector,
      companySize,
      explanation
    })
  } catch (error) {
    console.error('Error analyzing company:', error)
    return NextResponse.json(
      { error: 'Failed to analyze company' },
      { status: 500 }
    )
  }
}
