import { ChatAnthropic } from '@langchain/anthropic' // Use langchain's Anthropic integration
import { VoyageEmbeddings } from '@langchain/community/embeddings/voyage'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { Document } from '@langchain/core/documents'

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { ChatPromptTemplate } from '@langchain/core/prompts'

import { createRetrievalChain } from 'langchain/chains/retrieval'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'

// Initialize Anthropic client
const model = new ChatAnthropic({
  model: 'claude-3-sonnet-20240229'
})

// Initialize Voyage AI Embeddings
const embeddings = new VoyageEmbeddings({
  inputType: 'document',
  modelName: 'voyage-large-2'
})

// Function to extract text from PDF using PDF.js
async function getDocsFromPDF(pdfURL: string) {
  // Create a blob from the URL
  const response = await fetch(pdfURL)
  if (!response.ok) {
    throw new Error('Failed to fetch PDF')
  }
  const blob = await response.blob()
  // Create a new PDFLoader instance
  const loader = new PDFLoader(blob, {
    // pdfjs: () => import('pdfjs-dist/legacy/build/pdf.mjs'),
    splitPages: false
  })

  // load the doc
  return loader.load()
}

// Function to extract text from PDF using PDF.js
async function extractTextFromPDF(pdfURL: string): Promise<string> {
  try {
    // load the doc
    const docs = await getDocsFromPDF(pdfURL)

    // get the text content
    const text = docs[0].pageContent

    return text
  } catch (error) {
    console.error('Error extracting text from PDF:', error)
    return ''
  }
}

function splitDocsIntoChunks(
  docs: Document[],
  chunkSize = 1000,
  overlap = 200
): Promise<Document[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: chunkSize,
    chunkOverlap: overlap
  })
  return splitter.splitDocuments(docs)
}

const systemTemplate = [
  `You are an employment lawyer reviewing employee documents on behalf of an employee.`,
  `You should not provide legal advice or make any decisions on behalf of the employee.`,
  `You should provide information on the policies and how they may affect the employee.`,
  `If you don't know the answer to a question, you can say "I don't know" or "I'm not sure".`,
  `\n\n`,
  `{context}`
].join('')

const prompt = ChatPromptTemplate.fromMessages([
  ['system', systemTemplate],
  ['human', '{input}']
])

// Main function to process PDFs and answer questions
export async function processPDFsAndAnswerQuestions(
  pdfURLs: string[],
  question: string
): Promise<string> {
  // Load all the docs then flatten
  const docs = (
    await Promise.all(pdfURLs.map(pdfURL => getDocsFromPDF(pdfURL)))
  ).flat()

  const splits = await splitDocsIntoChunks(docs)

  // Create and store embeddings
  const vectorStore = await MemoryVectorStore.fromDocuments(splits, embeddings)

  // Get a retriever
  const retriever = vectorStore.asRetriever()

  // Create the question-answer chain
  const questionAnswerChain = await createStuffDocumentsChain({
    llm: model,
    prompt
  })
  // Create the retrieval chain
  const ragChain = await createRetrievalChain({
    retriever,
    combineDocsChain: questionAnswerChain
  })
  // Invoke the chain
  const results = await ragChain.invoke({
    input: question
  })

  // If you want to see the docs that were referenced
  // console.log(results.context);

  return results.answer
}
