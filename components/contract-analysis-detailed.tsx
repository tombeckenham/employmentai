'use client'

import React, { useState } from 'react'
import {
  Briefcase,
  Building,
  Download,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'

const ContractAnalysis = () => {
  const [viewMode, setViewMode] = useState('summary')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Contract Analysis
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Briefcase className="text-purple-600 mr-2" size={24} />
              <h2 className="text-2xl font-semibold text-gray-800">
                Software Engineer
              </h2>
            </div>
            <div className="flex items-center">
              <Building className="text-purple-600 mr-2" size={24} />
              <span className="text-xl text-gray-700">TechCorp Inc.&apos;</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Clock className="text-purple-600 mr-2" size={20} />
              <select className="border rounded px-2 py-1 text-gray-700">
                <option>Version 2.0 (2024-06-01)</option>
              </select>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center">
              <Download size={20} className="mr-2" />
              Download Contract
            </button>
          </div>

          <div className="mb-6">
            <button
              onClick={() =>
                setViewMode(viewMode === 'summary' ? 'detailed' : 'summary')
              }
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center"
            >
              {viewMode === 'summary' ? 'View Detailed Report' : 'View Summary'}
              {viewMode === 'summary' ? (
                <ChevronDown size={20} className="ml-2" />
              ) : (
                <ChevronUp size={20} className="ml-2" />
              )}
            </button>
          </div>

          {viewMode === 'summary' ? (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Contract Summary
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-600">Salary</span>
                  <span className="text-gray-800">$75,000 per year</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-600">Start Date</span>
                  <span className="text-gray-800">September 1, 2024</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-600">
                    Vacation Days
                  </span>
                  <span className="text-gray-800">15 days per year</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-600">
                    Notice Period
                  </span>
                  <span className="text-gray-800">2 weeks</span>
                </div>
              </div>
              <div className="bg-gray-50 border-l-4 border-purple-500 p-4 rounded-md">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="text-purple-500 mr-2" size={24} />
                  <h4 className="text-lg font-semibold text-purple-700">
                    Highlights
                  </h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle
                      className="text-green-500 mr-2 shrink-0"
                      size={20}
                    />
                    <span className="text-green-700">
                      Competitive salary for the position
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle
                      className="text-green-500 mr-2 shrink-0"
                      size={20}
                    />
                    <span className="text-green-700">
                      Company is experiencing rapid growth
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="text-red-500 mr-2 shrink-0" size={20} />
                    <span className="text-red-700">
                      Limited flexibility for remote work
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="text-red-500 mr-2 shrink-0" size={20} />
                    <span className="text-red-700">
                      Non-compete clause is overly broad
                    </span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Detailed Contract Analysis
              </h3>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Compensation
                </h4>
                <p className="text-gray-600 mb-2">
                  The base salary of $75,000 per year is competitive for a
                  mid-level software engineer in this area. There&apos;s also a
                  performance-based bonus structure that could add up to 15% of
                  your base salary annually.
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-600 mr-2">
                    Fairness:
                  </span>
                  <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Fair
                  </span>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Benefits
                </h4>
                <p className="text-gray-600 mb-2">
                  The contract offers 15 days of paid vacation, health insurance
                  with 80% employer contribution, and a 401(k) plan with 3%
                  employer match. These benefits are in line with industry
                  standards.
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-600 mr-2">
                    Fairness:
                  </span>
                  <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Fair
                  </span>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Work Arrangements
                </h4>
                <p className="text-gray-600 mb-2">
                  The contract stipulates a 40-hour work week with occasional
                  overtime as needed. However, there&apos;s no mention of remote
                  work possibilities, which is increasingly common in the tech
                  industry.
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-600 mr-2">
                    Fairness:
                  </span>
                  <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    Slightly Favors Employer
                  </span>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Intellectual Property
                </h4>
                <p className="text-gray-600 mb-2">
                  All work produced during employment, including outside of work
                  hours, is considered company property. This clause is quite
                  broad and may limit your ability to work on personal projects.
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-600 mr-2">
                    Fairness:
                  </span>
                  <span className="px-2 py-1 rounded-full text-sm bg-red-100 text-red-800">
                    Favors Employer
                  </span>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Non-Compete Clause
                </h4>
                <p className="text-gray-600 mb-2">
                  The non-compete clause prohibits working for competitors for 2
                  years after leaving the company, within a 100-mile radius.
                  This seems overly restrictive for the software industry and
                  may limit future job opportunities.
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-600 mr-2">
                    Fairness:
                  </span>
                  <span className="px-2 py-1 rounded-full text-sm bg-red-100 text-red-800">
                    Strongly Favors Employer
                  </span>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2">
                  Termination and Severance
                </h4>
                <p className="text-gray-600 mb-2">
                  The contract allows for at-will employment, meaning either
                  party can terminate the agreement at any time. There&apos;s a
                  2-week notice period, but no mention of severance pay in case
                  of company-initiated termination without cause.
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-600 mr-2">
                    Fairness:
                  </span>
                  <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    Slightly Favors Employer
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {viewMode === 'summary' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Chat with AI
            </h2>
            <div className="h-64 bg-gray-100 rounded-lg p-4 mb-4 overflow-y-auto">
              <div className="mb-2 text-left">
                <span className="inline-block p-2 rounded-lg bg-blue-100 text-blue-800">
                  I&apos;ve analyzed your contract. Would you like to discuss
                  any specific aspects or concerns?
                </span>
              </div>
            </div>
            <div className="flex">
              <input
                type="text"
                className="grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Ask about your contract..."
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition duration-300">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContractAnalysis
