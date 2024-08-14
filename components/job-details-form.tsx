// File: components/job-details-form.tsx
'use client'

import React, { useState } from 'react'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import { useSalaryCalculator } from '../lib/hooks/use-salary-calculator'

export function JobDetailsForm() {
  const { jobDetails, setJobDetails } = useSalaryCalculator()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [cities, setCities] = useState<string[]>([])

  const fetchCities = async (input: string) => {
    if (input) {
      const response = await fetch(`/api/cities?query=${input}`)
      const data = await response.json()
      setCities(
        data.predictions.map((prediction: any) => prediction.description)
      )
    } else {
      setCities([])
    }
  }

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id: 'location-autocomplete',
    options: cities,
    getOptionLabel: option => option,
    onInputChange: (event, value) => fetchCities(value),
    onChange: (event, newValue) => {
      setJobDetails(prev => ({ ...prev, location: newValue || '' }))
    }
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setJobDetails(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form className="space-y-6">
      <div>
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={jobDetails.jobTitle}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company (or website)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={jobDetails.company}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="jobDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description
        </label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          value={jobDetails.jobDescription}
          onChange={handleInputChange}
          required
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="location-autocomplete"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <div {...getRootProps()}>
          <input
            {...getInputProps()}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {groupedOptions.length > 0 ? (
            <ul
              {...getListboxProps()}
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm /5"
            >
              {(groupedOptions as typeof cities).map((option, index) => (
                <li
                  {...getOptionProps({ option, index })}
                  key={option}
                  className="cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                >
                  {option}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
        </button>
      </div>
      {showAdvanced && (
        <>
          <div>
            <label
              htmlFor="northstarCompanies"
              className="block text-sm font-medium text-gray-700"
            >
              Candidate Northstar Companies
            </label>
            <input
              type="text"
              id="northstarCompanies"
              name="northstarCompanies"
              value={jobDetails.northstarCompanies}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="unusualRequirements"
              className="block text-sm font-medium text-gray-700"
            >
              Unusual Role Requirements
            </label>
            <input
              type="text"
              id="unusualRequirements"
              name="unusualRequirements"
              value={jobDetails.unusualRequirements}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </>
      )}
    </form>
  )
}
