import React from 'react'
import Link from 'next/link'

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Negotiate better with AI
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Getting the job was the hard part… Negotiating your contract
            shouldn&apos;t be. Find out your contract score today.
          </p>
          <Link
            href="#"
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            See your Score
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
