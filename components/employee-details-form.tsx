import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { useSalaryCalculator } from '../lib/hooks/use-salary-calculator'

export function EmployeeDetailsForm() {
  const { employeeDetails, setEmployeeDetails } = useSalaryCalculator()
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('cv', file)

    try {
      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setEmployeeDetails(data)
    } catch (error) {
      console.error('Error uploading CV:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setUploading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setEmployeeDetails(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-900">Your Details</h2>

      {/* Manual Input Fields */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Years of Experience
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={employeeDetails.experience}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="sector"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sector
          </label>
          <input
            type="text"
            id="sector"
            name="sector"
            value={employeeDetails.sector}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="management"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Management Experience
          </label>
          <select
            id="management"
            name="management"
            value={employeeDetails.management}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select...</option>
            <option value="None">None</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
      </div>
      <div />
      {/* Optional CV Upload */}
      {/*    <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Optional: Upload Your CV
        </h3>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto size-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="cv-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload your CV</span>
                <input
                  id="cv-upload"
                  name="cv-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
          </div>
        </div>
      </div>
      {file && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {uploading ? 'Uploading...' : 'Upload CV'}
        </button>
      )} */}
    </div>
  )
}
