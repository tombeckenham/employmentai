export async function createRAG(fileUrl: string): Promise<void> {
  const response = await fetch('/api/create-rag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ fileUrl })
  })

  if (!response.ok) {
    throw new Error('RAG creation failed')
  }
}
