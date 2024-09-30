import { sql } from '@vercel/postgres' // Import Vercel Postgres
import { ContractReport } from './types'

const chkUnk = (value: any) => {
  if (value === null || value === undefined || value === 'unknown') {
    return null
  }
  return value
}

export async function storeReportInDB(
  documentId: string,
  report: ContractReport
) {
  const {
    documentType,
    employer,
    employee,
    role,
    salary,
    salaryCurrency,
    jobDescription,
    contractType,
    contractDate,
    startDate,
    vacationDays,
    noticePeriod,
    highlights,
    sections,
    contractText,
    analysisPrompt
  } = report
  console.log('report', report)

  // Insert employer
  const employerResult = await sql`
    INSERT INTO employers (name)
    VALUES (${employer})
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `

  console.log('employerResult', employerResult)
  const employerId = employerResult.rows[0]?.id
  console.log('employerId', employerId)
  // Insert employee
  const employeeResult = await sql`
    INSERT INTO employees (name)
    VALUES (${employee})
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `
  console.log('employeeResult', employeeResult)
  const employeeId = employeeResult.rows[0]?.id
  console.log('employeeId', employeeId)

  console.log(
    'about to insert report',
    documentId,
    documentType,
    employerId,
    employeeId,
    role,
    salary,
    salaryCurrency,
    jobDescription,
    contractType,
    contractDate,
    startDate,
    vacationDays,
    noticePeriod
  )

  // Insert document report (with contractText and analysisPrompt)
  const reportResult = await sql`
    INSERT INTO document_reports (
      document_id, document_type, employer_id, employee_id,
      role, salary, salary_currency, job_description, contract_type, contract_date,
      summary_start_date, summary_vacation_days, summary_notice_period,
      contract_text, analysis_prompt
    )
    VALUES (
      ${documentId}, ${documentType}, ${employerId}, ${employeeId},
      ${chkUnk(role)}, ${chkUnk(salary)}, ${chkUnk(salaryCurrency)}, ${chkUnk(
        jobDescription
      )}, ${chkUnk(contractType)}, ${chkUnk(contractDate)},
      ${chkUnk(startDate)}, ${chkUnk(vacationDays)}, ${chkUnk(noticePeriod)},
      ${contractText}, ${analysisPrompt}
    )
    RETURNING id
  `
  console.log('reportResult', reportResult)
  const reportId = reportResult.rows[0]?.id
  console.log('reportId', reportId)
  // Insert highlights
  const insertHighlight = async (
    type: 'positive' | 'negative',
    content: string
  ) => {
    await sql`
      INSERT INTO highlights (report_id, type, content)
      VALUES (${reportId}, ${type}, ${content})
    `
    console.log('highlightResult', reportId, type, content)
  }

  for (const highlight of highlights.positive) {
    await insertHighlight('positive', highlight)
  }

  for (const highlight of highlights.negative) {
    await insertHighlight('negative', highlight)
  }

  // Insert sections
  for (const section of sections) {
    const sectionResult = await sql`
      INSERT INTO sections (
        report_id, section_title, evaluation, reason, normal_practice,
        risk_level, recommendation
      )
      VALUES (
        ${reportId}, ${section.sectionTitle}, ${section.evaluation},
        ${section.reason}, ${section.normalPractice}, ${section.riskLevel},
        ${section.recommendation}
      )
    `
    console.log('sectionResult', sectionResult)
  }

  console.log('report stored in DB')

  return {
    employerId,
    employeeId,
    reportId
  }
}

export async function updateDocumentThumbnail(
  documentId: string,
  thumbnailUrl: string
) {
  await sql`
    UPDATE documents
    SET thumbnail_url = ${thumbnailUrl}
    WHERE id = ${documentId}
  `
}

export async function getDocUrl(documentId: string) {
  const { rows } = await sql`
    SELECT blob_url FROM documents WHERE id = ${documentId}
  `
  const blobUrl = rows[0]?.blob_url

  if (!blobUrl) {
    throw new Error(`No blob URL found for document ID: ${documentId}`)
  }
  return blobUrl
}
