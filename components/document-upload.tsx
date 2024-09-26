'use client'

import { useState } from 'react'

export default function DocumentUpload() {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Upload a document
      </label>
      <div className="mt-1 flex items-center">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={uploading}
          className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full max-w-xs" // Added max-w-xs
        />
        {uploading && <p className="ml-3">Uploading...</p>}
      </div>
    </div>
  )
}
