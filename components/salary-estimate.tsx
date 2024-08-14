import React, { useState } from 'react'
import { useSalaryCalculator } from '../lib/hooks/use-salary-calculator'
import ReactMarkdown from 'react-markdown'

export function SalaryEstimate() {
  const { jobDetails, employeeDetails } = useSalaryCalculator()
  const [estimatedSalary, setEstimatedSalary] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculateSalary = async () => {
    setLoading(true)
    setError(null)

    try {
      // First, analyze the company
      const companyResponse = await fetch('/api/analyze-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: jobDetails.company,
          jobTitle: jobDetails.jobTitle,
          jobDescription: jobDetails.jobDescription
        })
      })

      if (!companyResponse.ok) {
        throw new Error('Company analysis failed')
      }

      const companyAnalysis = await companyResponse.json()

      // Then, calculate the salary
      const salaryResponse = await fetch('/api/calculate-salary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDetails,
          employeeDetails,
          companyAnalysis
        })
      })

      if (!salaryResponse.ok) {
        throw new Error('Salary calculation failed')
      }

      const data = await salaryResponse.json()
      setEstimatedSalary(data.salaryRange)
      setExplanation(data.explanation)
    } catch (error) {
      console.error('Error calculating salary:', error)
      setError('Failed to calculate salary. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-900">
        Estimated Salary
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-indigo-600 text-lg">
            Calculating your estimated salary...
          </p>
        ) : estimatedSalary ? (
          <>
            <p className="text-4xl font-bold text-indigo-600 mb-4">
              {estimatedSalary} per year
            </p>
            <ReactMarkdown className="text-gray-600">
              {explanation}
            </ReactMarkdown>
          </>
        ) : (
          <p className="text-gray-600">
            Fill in the job and employee details to see your estimated salary.
          </p>
        )}
        {error && <p className="text-red-600 mt-2">{error}</p>}
        <button
          onClick={calculateSalary}
          disabled={
            loading || !jobDetails.jobTitle || !employeeDetails.experience
          }
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Calculating...' : 'Calculate Salary'}
        </button>
      </div>
    </div>
  )
}
