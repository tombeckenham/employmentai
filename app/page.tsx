import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FeatureCardProps {
  title: string
  description: string
  image: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  image
}) => (
  <div className="flex flex-col md:flex-row items-center">
    <div className="md:w-1/2 mb-8 md:mb-0">
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className="rounded-lg"
      />
    </div>
    <div className="md:w-1/2 md:pl-12">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 text-lg">{description}</p>
    </div>
  </div>
)

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Negotiate better
          <br />
          with AI
        </h1>
        <p className="text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
          Employment AI is your personal assistant for analyzing contracts,
          decoding offers, and negotiating like a pro.
        </p>
        <Link
          href="/documents"
          className="inline-block bg-gradient-button text-gray-800 font-bold text-lg px-8 py-3 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg relative overflow-hidden group"
        >
          <span className="relative z-10">Get your score</span>
          <span className="shine-effect group-hover:animate-shine"></span>
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center">
            Uncover the features that make Employment AI your ultimate career
            ally
          </h2>
          <div className="space-y-32">
            <FeatureCard
              title="Contract and Offer Analysis"
              description="Our AI-powered scanner provides a detailed summary of your entire contract or job offer in words you can understand. Each section is broken down and scored from 'Very Fair' to 'Strongly Favors Employer'."
              image="/images/contract-analysis.png"
            />
            <FeatureCard
              title="Layoff and Severance Support"
              description="Facing a layoff can be overwhelming, especially when you're given little time to review complex severance terms. We break down your severance agreement, highlight critical points, and help you understand what's negotiable - all within minutes."
              image="/images/negotiation.png"
            />
            <FeatureCard
              title="Decode Complex Terms"
              description="From stock options and RSUs to non-compete clauses and intellectual property rights, we explain every aspect of your offer or severance package in plain English. No more confusion about what you're agreeing to."
              image="/images/decode-offers.png"
            />
            <FeatureCard
              title="Know Your Worth"
              description="Whether you're negotiating a new offer or a severance package, understand how it compares to industry standards. We analyze your role, location, experience, and more to identify key areas for negotiation."
              image="/images/know-your-worth.png"
            />
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Your Privacy is Our Priority
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              At Employment AI, we understand the sensitive nature of your
              employment documents. That&apos;s why we&apos;ve implemented
              state-of-the-art security measures to ensure your data remains
              private and secure:
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-300">
              <li>End-to-end encryption for all uploaded documents</li>
              <li>Strict access controls and authentication protocols</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>
                Compliance with GDPR, CCPA, and other data protection
                regulations
              </li>
              <li>Option to delete your data at any time</li>
            </ul>
            <p className="mt-6 text-lg">
              Your trust is important to us. We never share, sell, or use your
              data for any purpose other than providing you with the best
              possible contract analysis and negotiation support.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to level up your career?
          </h2>
          <p className="text-xl mb-8 text-gray-400">
            Don&apos;t leave money on the table. Get AI-powered insights for
            your next career move.
          </p>
          <Link
            href="/documents"
            className="inline-block bg-gradient-button text-gray-800 font-bold text-lg px-8 py-3 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Start your analysis</span>
            <span className="shine-effect group-hover:animate-shine"></span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
