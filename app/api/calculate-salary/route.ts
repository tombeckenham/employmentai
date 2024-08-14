// File: app/api/calculate-salary/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { StringOutputParser } from '@langchain/core/output_parsers'

// Initialize the ChatOpenAI model
const model = new ChatOpenAI({
  modelName: 'gpt-4o-mini',
  temperature: 0.0,
  openAIApiKey: process.env.OPENAI_API_KEY
})

// Define the prompt template
const template = `You are an AI assistant specialized in estimating salaries based on job and candidate information. 
Given the following details, provide an estimated annual salary range and a brief explanation for your estimate.

Job Details:
- Job Title: {jobTitle}
- Company: {company}
- Job Description: {jobDescription}
- Location: {location}
- Company Funding Stage: {fundingStage}
- Company Sector: {sector}
- Company Size: {companySize}

Additional Information:
- Candidate Northstar Companies: {northstarCompanies}
- Unusual Role Requirements: {unusualRequirements}

Candidate Details:
- Years of Experience: {experience}
- Sector Experience: {sectorExperience}
- Management Experience: {managementExperience}

Please provide your salary estimate in the following format:
Estimated Salary Range: $X - $Y
Explanation: [Your detailed explanation here]

Be sure to consider all factors, including location, company size, funding stage, and the candidate's experience when making your estimate.`

const promptTemplate = PromptTemplate.fromTemplate(template)

// Create the LCEL chain
const chain = RunnableSequence.from([
  promptTemplate,
  model,
  new StringOutputParser()
])

export async function POST(request: NextRequest) {
  try {
    const { jobDetails, employeeDetails, companyAnalysis } =
      await request.json()

    const {
      jobTitle,
      company,
      jobDescription,
      location,
      northstarCompanies,
      unusualRequirements
    } = jobDetails

    const {
      experience,
      sector: sectorExperience,
      management: managementExperience
    } = employeeDetails

    const { fundingStage, sector, companySize } = companyAnalysis

    const result = await chain.invoke({
      jobTitle,
      company,
      jobDescription,
      location,
      fundingStage,
      sector,
      companySize,
      northstarCompanies,
      unusualRequirements,
      experience,
      sectorExperience,
      managementExperience
    })

    const [salaryRange, explanation] = result.split('Explanation:')

    return NextResponse.json({
      salaryRange: salaryRange.replace('Estimated Salary Range:', '').trim(),
      explanation: explanation.trim()
    })
  } catch (error) {
    console.error('Error calculating salary:', error)
    return NextResponse.json(
      { error: 'Failed to calculate salary' },
      { status: 500 }
    )
  }
}
