'use client'

import React, { useState, useEffect } from 'react'
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
import { ContractReport } from '@/lib/types'
import { getReportForDocument } from '@/app/actions/reportFetcher'

const ContractAnalysis = ({ report }: { report: ContractReport }) => {
  const [viewMode, setViewMode] = useState('summary')

  if (!report) {
    return <div>Loading...</div>
  }

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
                {report.role}
              </h2>
            </div>
            <div className="flex items-center">
              <Building className="text-purple-600 mr-2" size={24} />
              <span className="text-xl text-gray-700">
                {report.organization}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Clock className="text-purple-600 mr-2" size={20} />
              <span className="text-gray-700">{report.employee}</span>
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
                  <span className="text-gray-800">
                    {report.salary} {report.salaryCurrency}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-600">Start Date</span>
                  <span className="text-gray-800">
                    {report.summary.startDate}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-600">
                    Vacation Days
                  </span>
                  <span className="text-gray-800">
                    {report.summary.vacationDays}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-600">
                    Notice Period
                  </span>
                  <span className="text-gray-800">
                    {report.summary.noticePeriod}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-600">
                    Contract Type
                  </span>
                  <span className="text-gray-800">{report.contractType}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 py-2">
                  <span className="font-medium text-gray-600">
                    Contract Date
                  </span>
                  <span className="text-gray-800">{report.contractDate}</span>
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
                  {report.highlights.positive.map((item, index) => (
                    <li key={`positive-${index}`} className="flex items-start">
                      <CheckCircle
                        className="text-green-500 mr-2 shrink-0"
                        size={20}
                      />
                      <span className="text-green-700">{item}</span>
                    </li>
                  ))}
                  {report.highlights.negative.map((item, index) => (
                    <li key={`negative-${index}`} className="flex items-start">
                      <XCircle
                        className="text-red-500 mr-2 shrink-0"
                        size={20}
                      />
                      <span className="text-red-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Detailed Contract Analysis
              </h3>

              {report.sections.map((section, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    {section.sectionTitle}
                  </h4>
                  <p className="text-gray-600 mb-2">{section.reason}</p>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-600 mr-2">
                      Evaluation:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${getFairnessColor(section.evaluation)}`}
                    >
                      {section.evaluation}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-gray-600">
                      Normal Practice:{' '}
                    </span>
                    <span className="text-gray-800">
                      {section.normalPractice}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-gray-600">
                      Risk Level:{' '}
                    </span>
                    <span className="text-gray-800">{section.riskLevel}</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-gray-600">
                      Recommendation:{' '}
                    </span>
                    <span className="text-gray-800">
                      {section.recommendation}
                    </span>
                  </div>
                </div>
              ))}
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

// Helper function to determine the color of the fairness badge
function getFairnessColor(fairness: string) {
  switch (fairness.toLowerCase()) {
    case 'fair':
      return 'bg-green-100 text-green-800'
    case 'slightly favors employer':
      return 'bg-yellow-100 text-yellow-800'
    case 'favors employer':
    case 'strongly favors employer':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default ContractAnalysis
