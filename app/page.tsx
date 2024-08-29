import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, DollarSign, Zap, Briefcase } from 'lucide-react'

const LandingPage = async () => {
  return (
    <>
      <main className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
            Unlock Your Career Potential
          </h1>
          <p className="text-xl mb-8 text-white">
            Harness the power of AI to navigate your career and maximize your
            earning potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-white rounded-lg shadow-xl p-8 relative">
              <h3 className="text-2xl font-bold mb-6">Salary Estimate Tool</h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="occupation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Occupation
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. New York"
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center">
                  Get Your Estimate <ArrowRight className="ml-2" />
                </button>
              </form>
            </div>
            <div className="absolute -top-12 -right-12 size-24 bg-yellow-300 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl rotate-12 z-10">
              Free!
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <DollarSign className="text-green-500 mr-4" size={32} />
              <div>
                <h4 className="text-xl font-semibold mb-1">
                  Maximize Your Worth
                </h4>
                <p className="text-gray-600">
                  Get AI-driven insights to negotiate better compensation.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <Zap className="text-yellow-500 mr-4" size={32} />
              <div>
                <h4 className="text-xl font-semibold mb-1">
                  Stay Ahead of Trends
                </h4>
                <p className="text-gray-600">
                  Access real-time market data and industry insights.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <Briefcase className="text-indigo-500 mr-4" size={32} />
              <div>
                <h4 className="text-xl font-semibold mb-1">
                  Career Navigation
                </h4>
                <p className="text-gray-600">
                  Get personalized career path recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">How Employment AI Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-indigo-100 rounded-full p-4 inline-block mb-4">
                <svg
                  className="size-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Your Details</h3>
              <p className="text-gray-600">
                Provide your job title, location, and experience.
              </p>
            </div>
            <div>
              <div className="bg-pink-100 rounded-full p-4 inline-block mb-4">
                <svg
                  className="size-8 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI processes market data and your information.
              </p>
            </div>
            <div>
              <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                <svg
                  className="size-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
              <p className="text-gray-600">
                Receive personalized salary estimates and career advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Elevate Your Career?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of professionals using AI to make informed career
            decisions.
          </p>
          <button className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-indigo-50 transition duration-300">
            Get Started For Free
          </button>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; 2024 Employment AI. All rights reserved. Empowering careers
            with artificial intelligence.
          </p>
        </div>
      </footer>
    </>
  )
}

export default LandingPage
