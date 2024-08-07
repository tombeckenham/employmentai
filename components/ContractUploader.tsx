'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, Upload, FileText, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FileWithPreview extends File {
  preview: string
}

const ContractUpload: React.FC = () => {
  const [file, setFile] = useState<FileWithPreview | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(
        Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile)
        })
      )
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        ['.docx']
    },
    multiple: false
  })

  const removeFile = () => {
    if (file) {
      URL.revokeObjectURL(file.preview)
    }
    setFile(null)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
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

      // This is the document URL we need to pass to the RAG creation API
      console.log('File uploaded:', data.documentId)

      // Redirect to the contract analysis page
      router.push('/report')
    } catch (error) {
      console.error('Upload failed:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Upload Your Contract
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-300 hover:border-purple-500'
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="relative inline-block">
                <FileText size={64} className="text-purple-500 mx-auto mb-4" />
                <button
                  onClick={e => {
                    e.stopPropagation()
                    removeFile()
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <Upload size={64} className="text-gray-400 mx-auto mb-4" />
            )}
            {file ? (
              <p className="text-sm text-gray-600">{file.name}</p>
            ) : (
              <p className="text-gray-500">
                Drag and drop your contract here, or click to select a file
              </p>
            )}
          </div>

          {file && (
            <div className="mt-6 text-center">
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className={`px-6 py-3 rounded-lg text-white transition-colors ${
                  isUploading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader className="animate-spin inline-block mr-2" />
                    Uploading...
                  </>
                ) : (
                  'Upload Contract'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContractUpload
