import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Import images
import heroBackground from '@/public/images/hero-background.png'
import ctaBackground from '@/public/images/cta-background.png'
import contractAnalysisImage from '@/public/images/contract-analysis.png'
import negotiationAssistanceImage from '@/public/images/negotiation-assistance.png'
import salaryOptimizationImage from '@/public/images/salary-optimization.png'
import severanceAnalysisImage from '@/public/images/severance-analysis.png'
import careerTransitionImage from '@/public/images/career-transition.png'
import legalRightsImage from '@/public/images/legal-rights.png'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-4">Be Invincible at Work</h1>
            <p className="text-xl mb-8">
              Your AI-powered ally for career success and security
            </p>
            <Link href="/dashboard" passHref>
              <button className="bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-300 transition duration-300 flex items-center">
                Get Your Contract Score <ArrowRight className="ml-2" />
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-blue-600">
            Elevate Your Career Potential
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              title="Smart Contract Analysis"
              description="Decode job offers with expert-level insights"
              image={contractAnalysisImage}
            />
            <FeatureCard
              title="Negotiation Assistance"
              description="Secure the compensation you deserve"
              image={negotiationAssistanceImage}
            />
            <FeatureCard
              title="Salary Optimization"
              description="Maximize your market value and benefits"
              image={salaryOptimizationImage}
            />
          </div>
        </div>
      </section>

      {/* Section for Layoff/Redundancy Support */}
      <section className="bg-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Navigate Uncertainty with Confidence
          </h2>
          <p className="text-xl mb-16 text-center">
            Facing career transitions? We&apos;ve got your back.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              title="Severance Package Analysis"
              description="Ensure fair compensation during transitions"
              image={severanceAnalysisImage}
            />
            <FeatureCard
              title="Career Transition Guidance"
              description="Chart your path to new opportunities"
              image={careerTransitionImage}
            />
            <FeatureCard
              title="Legal Rights Assessment"
              description="Understand and protect your workplace rights"
              image={legalRightsImage}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Secure Your Professional Future?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of professionals taking control of their careers
          </p>
          <Link href="/dashboard" passHref>
            <button className="bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-300 transition duration-300 flex items-center mx-auto">
              Get Your Contract Score <ArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 text-center">
        <p>
          &copy; 2024 Employment AI. All rights reserved. Empowering
          professionals to navigate their careers with confidence.
        </p>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  image: StaticImageData
}

const FeatureCard: React.FC<FeatureCardProps> = ({
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
      <h3 className="text-xl font-bold mb-2 text-blue-600">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  </div>
)

export default LandingPage
