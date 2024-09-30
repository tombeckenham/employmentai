import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { Document } from 'langchain/document'

export async function getDocsFromPDF(pdfURL: string): Promise<Document[]> {
  const response = await fetch(pdfURL)
  if (!response.ok) {
    throw new Error('Failed to fetch PDF')
  }
  const blob = await response.blob()
  const loader = new PDFLoader(blob)
  const docs = await loader.load()
  return splitDocsIntoChunks(docs)
}

async function splitDocsIntoChunks(
  docs: Document[],
  chunkSize = 2000,
  overlap = 300
): Promise<Document[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: chunkSize,
    chunkOverlap: overlap
  })
  return await splitter.splitDocuments(docs)
}
