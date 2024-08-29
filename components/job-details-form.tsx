import React, { useState } from 'react'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import { ChevronDown, ChevronUp } from 'lucide-react'
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
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-indigo-900">Job Details</h2>
      <div>
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-gray-700 mb-1"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="location-autocomplete"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location
        </label>
        <div {...getRootProps()}>
          <input
            {...getInputProps()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {groupedOptions.length > 0 ? (
            <ul
              {...getListboxProps()}
              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black/5 overflow-auto focus:outline-none sm:text-sm"
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
          className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center"
        >
          {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
          {showAdvanced ? (
            <ChevronUp className="ml-1 size-4" />
          ) : (
            <ChevronDown className="ml-1 size-4" />
          )}
        </button>
      </div>
      {showAdvanced && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="jobDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="northstarCompanies"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Candidate Northstar Companies
            </label>
            <input
              type="text"
              id="northstarCompanies"
              name="northstarCompanies"
              value={jobDetails.northstarCompanies}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="unusualRequirements"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Unusual Role Requirements
            </label>
            <input
              type="text"
              id="unusualRequirements"
              name="unusualRequirements"
              value={jobDetails.unusualRequirements}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  )
}
