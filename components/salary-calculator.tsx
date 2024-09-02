'use client'
import React from 'react'
import { JobDetailsForm } from './job-details-form'
import { EmployeeDetailsForm } from './employee-details-form'
import { SalaryEstimate } from './salary-estimate'
import { SalaryCalculatorProvider } from '../lib/hooks/use-salary-calculator'

export default function SalaryCalculator() {
  return (
    <SalaryCalculatorProvider>
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What are you worth?
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Discover your true market value with our AI-powered salary
            calculator.
          </p>
          <div className="mt-12">
            <JobDetailsForm />
            <EmployeeDetailsForm />
            <SalaryEstimate />
          </div>
        </div>
      </section>
    </SalaryCalculatorProvider>
  )
}
