import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Briefcase,
  TrendingUp,
  DollarSign,
  Scale
} from 'lucide-react'

// Import images
import heroBackground from '@/public/images/hero-background.png'
import contractAnalysisImage from '@/public/images/contract-analysis.png'
import severanceAnalysisImage from '@/public/images/severance-analysis.png'
import careerTransitionImage from '@/public/images/career-transition.png'
import salaryOptimizationImage from '@/public/images/salary-optimization.png'
import negotiationAssistanceImage from '@/public/images/negotiation-assistance.png'
import legalRightsImage from '@/public/images/legal-rights.png'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-4">Be Invincible at Work</h1>
            <p className="text-xl mb-6">
              Understand the true value of your employment terms. Get your FREE
              favorability score for your contract or severance package now!
            </p>
            <Link href="/dashboard" passHref>
              <button className="bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-300 transition duration-300 flex items-center">
                Get Your Score <ArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src={heroBackground}
              alt="Empowered professionals"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* Value Proposition Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
            Why You Need Our Favorability Score
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ValueProp
              title="Understand Your Position"
              description="Get a clear picture of how favorable your contract or severance terms are compared to industry standards."
            />
            <ValueProp
              title="Identify Improvement Areas"
              description="Pinpoint specific clauses or terms that could be negotiated for better outcomes."
            />
            <ValueProp
              title="Negotiate with Confidence"
              description="Use data-driven insights to back your requests during negotiations."
            />
            <ValueProp
              title="Protect Your Interests"
              description="Ensure you're not overlooking any crucial details in your employment terms."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-blue-600">
            Comprehensive Employment Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Shield className="size-12 text-teal-500" />}
              title="Contract Favorability Score"
              description="Our AI assesses your job offer or contract, providing a clear favorability rating and highlighting areas for improvement."
              image={contractAnalysisImage}
            />
            <FeatureCard
              icon={<Briefcase className="size-12 text-blue-500" />}
              title="Severance Package Evaluation"
              description="Get an objective assessment of your severance terms, ensuring you're receiving a fair deal during transitions."
              image={severanceAnalysisImage}
            />
            <FeatureCard
              icon={<TrendingUp className="size-12 text-amber-500" />}
              title="Career Transition Guidance"
              description="Receive personalized advice for your next career move based on your current contract terms and industry trends."
              image={careerTransitionImage}
            />
            <FeatureCard
              icon={<DollarSign className="size-12 text-green-500" />}
              title="Compensation Optimization"
              description="Understand how your salary and benefits stack up, and get tips to maximize your total compensation package."
              image={salaryOptimizationImage}
            />
            <FeatureCard
              icon={<ArrowRight className="size-12 text-purple-500" />}
              title="Negotiation Strategy"
              description="Leverage your favorability score to develop a strong negotiation strategy for better terms."
              image={negotiationAssistanceImage}
            />
            <FeatureCard
              icon={<Scale className="size-12 text-red-500" />}
              title="Legal Rights Assessment"
              description="Understand the legal implications of your contract terms and how they align with employment laws."
              image={legalRightsImage}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Understand Your True Work Value?
          </h2>
          <p className="text-xl mb-8">
            Whether you&apos;re reviewing a new contract or assessing a
            severance package, our favorability score gives you the insights you
            need. It&apos;s quick, easy, and free to start!
          </p>
          <Link href="/dashboard" passHref>
            <button className="bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-300 transition duration-300 flex items-center mx-auto">
              Get Your Score <ArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 text-center">
        <p>
          &copy; 2024 Employment AI. All rights reserved. Empowering
          professionals to understand and maximize their employment terms.
        </p>
      </footer>
    </div>
  )
}

interface ValuePropProps {
  title: string
  description: string
}

const ValueProp: React.FC<ValuePropProps> = ({ title, description }) => (
  <div className="flex items-start">
    <CheckCircle className="text-green-500 mr-4 mt-1 shrink-0" size={24} />
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  </div>
)

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  image: StaticImageData
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  image
}) => (
  <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
    <Image
      src={image}
      alt={title}
      width={400}
      height={200}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-blue-600">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  </div>
)

export default LandingPage
