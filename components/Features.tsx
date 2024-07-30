import React from 'react'
import {
  DocumentMagnifyingGlassIcon,
  PuzzlePieceIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    title: 'Contract Analysis',
    description:
      'Our AI-powered contract scanner provides a detailed summary of your entire contract... In words you can understand. Your contract is broken down into categories and scored anywhere from &apos;Very Fair&apos; to &apos;Strongly Favors Employer&apos;.',
    icon: DocumentMagnifyingGlassIcon
  },
  {
    title: 'Decode Complex Offers',
    description:
      'Gone are the days of a salary and some PTO. Tech companies are offering everything from salary, guaranteed bonus, discretionary bonus, commission, stock options, RSUs, flexible WFH policies, parental leave policies, and so much more. Understand exactly what is being offered with detailed explanations. Stock options vs RSUs, commission structures explained, etc.',
    icon: PuzzlePieceIcon
  },
  {
    title: 'Know Your Worth',
    description:
      'Unlock detailed insights on how your offer compares to your peers. Using comp comparison data, see exactly how &apos;fair&apos; your offer is. We take into account your role, geographical location, company stage, company size, your experience and more to break down your compensation and identify key areas for negotiation.',
    icon: ChartBarIcon
  },
  {
    title: 'AI-Powered Negotiation',
    description:
      'Negotiating can be awkward. Let us help you. Get tailored email templates and structured talking points to help negotiation the strongest offer possible. We leverage powerful industry data to get you the best possible outcome.',
    icon: ChatBubbleBottomCenterTextIcon
  }
]

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center mb-4">
                <feature.icon className="size-8 text-blue-600 mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
