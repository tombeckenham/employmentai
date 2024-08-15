'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { JobDetailsForm } from './job-details-form'
import { EmployeeDetailsForm } from './employee-details-form'
import { SalaryEstimate } from './salary-estimate'
import { SalaryCalculatorProvider } from '../lib/hooks/use-salary-calculator'

const SalaryCalculator: React.FC = () => {
  const { data: session } = useSession()
  const [showSignUpPrompt, setShowSignUpPrompt] = useState(false)

  const handleCalculate = () => {
    if (session) {
      // Perform salary calculation
    } else {
      setShowSignUpPrompt(true)
    }
  }

  return (
    <SalaryCalculatorProvider>
      <div className="bg-white shadow-md rounded-lg p-6">
        <JobDetailsForm />
        <EmployeeDetailsForm />
        {showSignUpPrompt ? (
          <div className="mt-6 text-center">
            <p className="text-lg text-gray-700 mb-4">
              Sign up or log in to see your personalized salary estimate!
            </p>
            <a
              href="/signup"
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
            >
              Sign Up Now
            </a>
          </div>
        ) : (
          <button
            onClick={handleCalculate}
            className="mt-6 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
          >
            {session ? 'Calculate Salary' : 'See Your Estimate'}
          </button>
        )}
        {session && <SalaryEstimate />}
      </div>
    </SalaryCalculatorProvider>
  )
}

export default SalaryCalculator
