// File: components/salary-estimate.tsx
'use client'

import React, { useState } from 'react'
import { useSalaryCalculator } from '../lib/hooks/use-salary-calculator'

export function SalaryEstimate() {
  const { jobDetails, employeeDetails } = useSalaryCalculator()
  const [estimatedSalary, setEstimatedSalary] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)
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
    <div className="mt-10">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Estimated Salary
      </h3>
      <div className="mt-5 border-t border-gray-200 pt-5">
        {loading ? (
          <p className="text-gray-600">Calculating your estimated salary...</p>
        ) : estimatedSalary ? (
          <>
            <p className="text-3xl font-bold text-indigo-600">
              {estimatedSalary} per year
            </p>
            <p className="mt-2 text-sm text-gray-500">{explanation}</p>
          </>
        ) : (
          <p className="text-gray-600">
            Fill in the job and employee details to see your estimated salary.
          </p>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          onClick={calculateSalary}
          disabled={
            loading || !jobDetails.jobTitle || !employeeDetails.experience
          }
          className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Calculating...' : 'Calculate Salary'}
        </button>
      </div>
    </div>
  )
}
