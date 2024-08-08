import { processPDFsAndAnswerQuestions } from './documentAnalysis'

const prompt =
  'Please go through this contract, extract the key points, then let me know for each section it favors the employer, favors me, or is fair. Please ensure that each part of the contract abides by the employment regulation in my area. Finally let me know if there are any red flag, and areas I should negotiate. Please keep this contract confidential'

export async function generateContractReport(
  contractURL: string
): Promise<string> {
  const text = await processPDFsAndAnswerQuestions([contractURL], prompt)
  return text
}
