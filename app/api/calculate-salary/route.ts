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

// Define the base prompt template
const baseTemplate = `You are an AI assistant specialized in estimating salaries based on job and candidate information. 
Given the following details, provide an estimated annual salary range and a brief explanation for your estimate.

Job Details:
- Job Title: {jobTitle}
- Location: {location}
{optionalJobDetails}

{optionalCandidateDetails}

Please provide your salary estimate in the following format - but in local currency:
Estimated Salary Range: $X - $Y USD
Explanation: [Your detailed explanation here]

Be sure to consider all provided factors when making your estimate.`

// Function to generate the full template based on provided fields
function generateFullTemplate(fields: Record<string, string | undefined>) {
  let optionalJobDetails = ''
  let optionalCandidateDetails = ''

  if (fields.company) optionalJobDetails += `- Company: {company}\n`
  if (fields.jobDescription)
    optionalJobDetails += `- Job Description: {jobDescription}\n`
  if (fields.fundingStage)
    optionalJobDetails += `- Company Funding Stage: {fundingStage}\n`
  if (fields.sector) optionalJobDetails += `- Company Sector: {sector}\n`
  if (fields.companySize)
    optionalJobDetails += `- Company Size: {companySize}\n`
  if (fields.northstarCompanies)
    optionalJobDetails += `- Employer pays a premium for candidates who have relevant work experience at these &apos;North Star&apos; companies: {northstarCompanies}\n`
  if (fields.unusualRequirements)
    optionalJobDetails += `- Employer pays a premium for candidates who have these specific skills: {unusualRequirements}\n`

  if (
    fields.experience ||
    fields.sectorExperience ||
    fields.managementExperience
  ) {
    optionalCandidateDetails = 'Candidate Details:\n'
    if (fields.experience)
      optionalCandidateDetails += `- Years of Experience: {experience}\n`
    if (fields.sectorExperience)
      optionalCandidateDetails += `- Sector Experience: {sectorExperience}\n`
    if (fields.managementExperience)
      optionalCandidateDetails += `- Management Experience: {managementExperience}\n`
  }

  return baseTemplate
    .replace('{optionalJobDetails}', optionalJobDetails)
    .replace('{optionalCandidateDetails}', optionalCandidateDetails)
}

export async function POST(request: NextRequest) {
  try {
    const { jobDetails, employeeDetails, companyAnalysis } =
      await request.json()

    // Check for required fields
    if (!jobDetails.jobTitle || !jobDetails.location) {
      return NextResponse.json(
        { error: 'Job title and location are required fields' },
        { status: 400 }
      )
    }

    const fields = {
      jobTitle: jobDetails.jobTitle,
      location: jobDetails.location,
      company: jobDetails.company,
      jobDescription: jobDetails.jobDescription,
      northstarCompanies: jobDetails.northstarCompanies,
      unusualRequirements: jobDetails.unusualRequirements,
      experience: employeeDetails?.experience,
      sectorExperience: employeeDetails?.sector,
      managementExperience: employeeDetails?.management,
      fundingStage: companyAnalysis?.fundingStage,
      sector: companyAnalysis?.sector,
      companySize: companyAnalysis?.companySize
    }

    const fullTemplate = generateFullTemplate(fields)
    const promptTemplate = PromptTemplate.fromTemplate(fullTemplate)

    // Create the LCEL chain
    const chain = RunnableSequence.from([
      promptTemplate,
      model,
      new StringOutputParser()
    ])

    const result = await chain.invoke(fields)

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
