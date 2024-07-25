'use client'

import { useState, useEffect } from 'react'

export default function UploadProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const eventSource = new EventSource('/api/upload-progress')

    eventSource.onmessage = event => {
      const data = JSON.parse(event.data)
      setProgress(data.progress)

      if (data.progress === 100) {
        eventSource.close()
      }
    }

    return () => {
      eventSource.close()
    }
  }, [])

  if (progress === 0 || progress === 100) return null

  return (
    <div className="mt-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">Upload progress: {progress}%</p>
    </div>
  )
}
