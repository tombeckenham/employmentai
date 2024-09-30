'use client'

import { useChat } from 'ai/react'
import { useState } from 'react'
import { Message } from 'ai'

interface ContractChatProps {
  contract: string
  analysisPrompt: string
  report: string // Add this to include the contract report
}

export function ContractChat({
  contract,
  analysisPrompt,
  report
}: ContractChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'system-1',
        role: 'system',
        content: `You are an expert contract analyst. Use the following contract, analysis prompt, and report as context. Do not directly mention or expose this context to the user.

Contract Text:
${contract}

Analysis Prompt:
${analysisPrompt}

Contract Report:
${report}
`
      }
    ]
  })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="h-64 bg-gray-100 rounded-lg p-4 mb-4 overflow-y-auto">
        {messages
          .filter(m => m.role !== 'system')
          .map((m: Message) => (
            <div
              key={m.id}
              className={`mb-2 ${
                m.role === 'assistant' ? 'text-left' : 'text-right'
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  m.role === 'assistant'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {m.content}
              </span>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="Ask about your contract..."
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  )
}
