import React from 'react'
import { Check, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl mb-6">
            Unlock the full potential of your career with our AI-powered tools
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <PricingCard
              title="Basic"
              price="Free"
              description="Get started with essential features"
              features={[
                'Summary Analysis',
                'Store Documents',
                'Favorability Score'
              ]}
              buttonText="Start Free"
              buttonLink="/signup"
            />
            <PricingCard
              title="Standard"
              price="$250"
              description="One-off payment for comprehensive support"
              features={[
                'Upload documents for a year',
                'Detailed Report',
                'Query via Chat',
                'Layoff support',
                'Personalized Negotiation'
              ]}
              buttonText="Choose Standard"
              buttonLink="/signup?plan=standard"
              highlighted={true}
            />
            <PricingCard
              title="Lifetime"
              price="$999"
              description="Unlimited access for your entire career"
              features={[
                'Unlimited roles',
                'All Standard features',
                'Priority support',
                'Early access to new features'
              ]}
              buttonText="Choose Lifetime"
              buttonLink="/signup?plan=lifetime"
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Elevate Your Career?
          </h2>
          <p className="text-xl mb-8">
            Choose a plan and start negotiating like a pro today.
          </p>
          <Link href="/signup" passHref>
            <button className="bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-300 transition duration-300 flex items-center mx-auto">
              Get Started Now <ArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </section>

      <footer className="bg-slate-800 text-white py-8 text-center">
        <p>
          &copy; 2024 Employment AI. All rights reserved. Empowering
          professionals to negotiate better contracts.
        </p>
      </footer>
    </div>
  )
}

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonLink: string
  highlighted?: boolean
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  buttonText,
  buttonLink,
  highlighted = false
}) => (
  <div
    className={`w-full md:w-80 p-6 rounded-lg shadow-xl ${
      highlighted ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'
    }`}
  >
    <h3
      className={`text-2xl font-bold mb-2 ${
        highlighted ? 'text-blue-600' : 'text-slate-900'
      }`}
    >
      {title}
    </h3>
    <div className="text-4xl font-bold mb-2">{price}</div>
    <p className="text-slate-600 mb-6">{description}</p>
    <ul className="mb-6 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="text-green-500 mr-2" size={20} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Link href={buttonLink} passHref>
      <button
        className={`w-full py-2 px-4 rounded-full font-bold ${
          highlighted
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
        } transition duration-300`}
      >
        {buttonText}
      </button>
    </Link>
  </div>
)

export default PricingPage
