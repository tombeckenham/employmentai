import React, { useState } from 'react'

const DocumentUpload = () => {
  const [file, setFile] = useState(null)

  const handleFileChange = event => {
    setFile(event.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        alert('File uploaded successfully!')
      } else {
        alert('Failed to upload file.')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file.')
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default DocumentUpload
