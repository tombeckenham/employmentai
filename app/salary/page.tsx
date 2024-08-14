// File: app/salary-calculator/page.tsx
import React from 'react'
import SalaryCalculator from '../../components/salary-calculator'

export default function SalaryCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <SalaryCalculator />
        </div>
      </main>
    </div>
  )
}
