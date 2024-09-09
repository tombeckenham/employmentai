'use server'

import { sql } from '@vercel/postgres'
import { ContractReport, Section } from '@/lib/types'

export async function getReportForDocument(
  documentId: string
): Promise<ContractReport | null> {
  try {
    // Check if the table exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'organizations'
      );
    `

    if (!tableExists.rows[0].exists) {
      console.error('The "organizations" table does not exist.')
      // Handle the error appropriately, maybe return an error message or throw an error
      return { error: 'Database schema issue: organizations table not found' }
    }

    // If the table exists, proceed with your original query
    const result = await sql`
      SELECT 
        dr.id, dr.document_type, dr.role, dr.salary, dr.salary_currency, 
        dr.job_description, dr.contract_type, dr.contract_date,
        dr.summary_start_date, dr.summary_vacation_days, dr.summary_notice_period,
        o.name as organization_name,
        e.name as employee_name
      FROM document_reports dr
      JOIN organizations o ON dr.organization_id = o.id
      JOIN employees e ON dr.employee_id = e.id
      WHERE dr.document_id = ${documentId}
    `

    if (result.rows.length === 0) {
      return null
    }

    const reportData = result.rows[0]

    const highlightsResult = await sql`
      SELECT type, content
      FROM highlights
      WHERE report_id = ${reportData.id}
    `

    const highlights = {
      positive: [] as string[],
      negative: [] as string[]
    }

    for (const row of highlightsResult.rows) {
      if (row.type === 'positive') {
        highlights.positive.push(row.content)
      } else if (row.type === 'negative') {
        highlights.negative.push(row.content)
      }
    }

    const sectionsResult = await sql`
      SELECT section_title, evaluation, reason, normal_practice, risk_level, recommendation
      FROM sections
      WHERE report_id = ${reportData.id}
    `

    const sections: Section[] = sectionsResult.rows.map(row => ({
      sectionTitle: row.section_title,
      evaluation: row.evaluation,
      reason: row.reason,
      normalPractice: row.normal_practice,
      riskLevel: row.risk_level,
      recommendation: row.recommendation
    }))

    const report: ContractReport = {
      documentType: reportData.document_type,
      employer: reportData.employer_name,
      employee: reportData.employee_name,
      role: reportData.role,
      salary: reportData.salary,
      salaryCurrency: reportData.salary_currency,
      jobDescription: reportData.job_description,
      contractType: reportData.contract_type,
      contractDate: reportData.contract_date,
      summary: {
        startDate: reportData.summary_start_date,
        vacationDays: reportData.summary_vacation_days,
        noticePeriod: reportData.summary_notice_period
      },
      highlights: highlights,
      sections: sections
    }

    return report
  } catch (error) {
    console.error('Error in getReportForDocument:', error)
    return { error: 'An error occurred while fetching the report' }
  }
}
