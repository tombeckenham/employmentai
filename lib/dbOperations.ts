import { sql } from '@vercel/postgres' // Import Vercel Postgres
import { ContractReport } from './types'

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
    sections
  } = report

  // Insert employer
  const employerResult = await sql`
    INSERT INTO employers (name)
    VALUES (${employer})
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `
  const employerId = employerResult.rows[0]?.id

  // Insert employee
  const employeeResult = await sql`
    INSERT INTO employees (name)
    VALUES (${employee})
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `

  console.log(report)

  const employeeId = employeeResult.rows[0]?.id
  // Insert document report (without highlights)
  const reportResult = await sql`
    INSERT INTO document_reports (
      document_id, document_type, employer_id, employee_id,
      role, salary, salary_currency, job_description, contract_type, contract_date,
      summary_start_date, summary_vacation_days, summary_notice_period
    )
    VALUES (
      ${documentId}, ${documentType}, ${employerId}, ${employeeId},
      ${role}, ${salary}, ${salaryCurrency}, ${jobDescription}, ${contractType}, ${contractDate},
      ${startDate}, ${vacationDays}, ${noticePeriod}
    )
    RETURNING id
  `

  const reportId = reportResult.rows[0]?.id

  // Insert highlights
  const insertHighlight = async (
    type: 'positive' | 'negative',
    content: string
  ) => {
    await sql`
      INSERT INTO highlights (report_id, type, content)
      VALUES (${reportId}, ${type}, ${content})
    `
  }

  for (const highlight of highlights.positive) {
    await insertHighlight('positive', highlight)
  }

  for (const highlight of highlights.negative) {
    await insertHighlight('negative', highlight)
  }

  // Insert sections
  for (const section of sections) {
    await sql`
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
  }

  return {
    employerId,
    employeeId,
    reportId
  }
}
