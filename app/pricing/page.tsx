import React from 'react'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">Choose Your Plan</h1>
        <p className="text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
          Unlock the full potential of your career with our AI-powered
          negotiation tools
        </p>
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

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to level up your career?
          </h2>
          <p className="text-xl mb-8 text-gray-400">
            Don&apos;t leave money on the table. Get AI-powered insights for
            your next career move.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gradient-button text-gray-800 font-bold text-lg px-8 py-3 rounded-full transition-all duration-300 ease-in-out hover:shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Get started now</span>
            <span className="shine-effect group-hover:animate-shine"></span>
          </Link>
        </div>
      </section>
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
    className={`w-full md:w-80 p-6 rounded-lg ${
      highlighted ? 'bg-gray-800 border-2 border-indigo-500' : 'bg-gray-900'
    }`}
  >
    <h3
      className={`text-2xl font-bold mb-2 ${
        highlighted ? 'text-indigo-400' : 'text-white'
      }`}
    >
      {title}
    </h3>
    <div className="text-4xl font-bold mb-2 text-white">{price}</div>
    <p className="text-gray-400 mb-6">{description}</p>
    <ul className="mb-6 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-300">
          <Check className="text-green-500 mr-2" size={20} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Link
      href={buttonLink}
      className={`inline-block w-full text-center py-2 px-4 rounded-full font-bold ${
        highlighted
          ? 'bg-gradient-button text-gray-800 relative overflow-hidden group'
          : 'bg-gray-700 text-white hover:bg-gray-600'
      } transition-all duration-300 ease-in-out hover:shadow-lg`}
    >
      <span className="relative z-10">{buttonText}</span>
      {highlighted && (
        <span className="shine-effect group-hover:animate-shine"></span>
      )}
    </Link>
  </div>
)

export default PricingPage
