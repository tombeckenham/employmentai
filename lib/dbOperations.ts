import { sql } from '@vercel/postgres' // Import Vercel Postgres
import { ContractReport } from './types'

export async function storeReportInDB(
  documentId: string,
  report: ContractReport
) {
  const { documentType, organization, relatedPerson, sections } = report

  // Insert organization
  const orgResult = await sql`
    INSERT INTO organizations (name)
    VALUES (${organization})
    ON CONFLICT (name) DO NOTHING
    RETURNING id
  `
  const organizationId = orgResult.rows[0]?.id

  // Insert related person
  const personResult = await sql`
    INSERT INTO people (name)
    VALUES (${relatedPerson})
    ON CONFLICT (name) DO NOTHING
    RETURNING id
  `
  const relatedPersonId = personResult.rows[0]?.id

  // Insert document report
  const reportResult = await sql`
    INSERT INTO document_reports (document_id, document_type, organization_id, related_person_id)
    VALUES (${documentId}, ${documentType}, ${organizationId}, ${relatedPersonId})
    RETURNING id
  `
  const reportId = reportResult.rows[0]?.id

  // Insert sections
  for (const section of sections) {
    await sql`
      INSERT INTO sections (report_id, section_title, evaluation, reason, normal_practice)
      VALUES (${reportId}, ${section.sectionTitle}, ${section.evaluation}, ${section.reason}, ${section.normalPractice})
    `
  }

  return {
    organizationId,
    relatedPersonId,
    reportId
  }
}
