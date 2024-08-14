// File: components/employee-details-form.tsx
'use client'

import React from 'react'

import { useSalaryCalculator } from '../lib/hooks/use-salary-calculator'

export function EmployeeDetailsForm() {
  const { employeeDetails, setEmployeeDetails } = useSalaryCalculator()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setEmployeeDetails(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="mt-10">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Employee Details
      </h3>
      <div className="mt-5 border-t border-gray-200 pt-5">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Years of Experience
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={employeeDetails.experience}
              onChange={handleInputChange}
              required
              min="0"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="sector"
              className="block text-sm font-medium text-gray-700"
            >
              Industry Sector
            </label>
            <select
              id="sector"
              name="sector"
              value={employeeDetails.sector}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a sector</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="management"
              className="block text-sm font-medium text-gray-700"
            >
              Management Experience
            </label>
            <select
              id="management"
              name="management"
              value={employeeDetails.management}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select management experience</option>
              <option value="None">None</option>
              <option value="Team Lead">Team Lead</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  )
}
