import React from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { ArrowRight, Upload, FileText, MessageSquare } from 'lucide-react'

// Import images
import heroBackground from '@/public/images/hero-background.png'
import contractAnalysisImage from '@/public/images/contract-analysis.png'
import decodeOffersImage from '@/public/images/decode-offers.png'
import knowYourWorthImage from '@/public/images/know-your-worth.png'
import negotiationImage from '@/public/images/negotiation.png'
import layoffSupportImage from '@/public/images/layoff-support.png'

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h1 className="text-5xl font-bold mb-4">
              Negotiate better with AI
            </h1>
            <p className="text-xl mb-6">
              Whether you&apos;re starting a new job or facing a layoff,
              we&apos;re here to help. Get the clarity and confidence you need
              to negotiate fair terms.
            </p>
            <ul className="list-none space-y-2 mb-6">
              <StepItem
                icon={<Upload size={20} />}
                text="Upload your contract, offer, or severance agreement"
              />
              <StepItem
                icon={<FileText size={20} />}
                text="Get your favorability score and detailed report"
              />
              <StepItem
                icon={<MessageSquare size={20} />}
                text="Negotiate with AI-powered insights"
              />
            </ul>
            <Link href="/dashboard" passHref>
              <button className="bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-300 transition duration-300 flex items-center">
                Get Your Analysis <ArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src={heroBackground}
              alt="AI-powered negotiation"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-blue-600">
            How We Help You Navigate Your Career
          </h2>
          <div className="space-y-24">
            <FeatureCard
              title="Contract and Offer Analysis"
              description="Our AI-powered scanner provides a detailed summary of your entire contract or job offer in words you can understand. Each section is broken down and scored from 'Very Fair' to 'Strongly Favors Employer'."
              image={contractAnalysisImage}
              imagePosition="right"
            />
            <FeatureCard
              title="Layoff and Severance Support"
              description="Facing a layoff can be overwhelming, especially when you're given little time to review complex severance terms. We break down your severance agreement, highlight critical points, and help you understand what's negotiable - all within minutes."
              image={layoffSupportImage}
              imagePosition="left"
            />
            <FeatureCard
              title="Decode Complex Terms"
              description="From stock options and RSUs to non-compete clauses and intellectual property rights, we explain every aspect of your offer or severance package in plain English. No more confusion about what you're agreeing to."
              image={decodeOffersImage}
              imagePosition="right"
            />
            <FeatureCard
              title="Know Your Worth"
              description="Whether you're negotiating a new offer or a severance package, understand how it compares to industry standards. We analyze your role, location, experience, and more to identify key areas for negotiation."
              image={knowYourWorthImage}
              imagePosition="left"
            />
            <FeatureCard
              title="AI-Powered Negotiation Assistance"
              description="Negotiating can be stressful, especially during layoffs. Let us help you. Get tailored email templates and talking points to negotiate the best possible terms, whether for a new job or a fair severance package."
              image={negotiationImage}
              imagePosition="right"
            />
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <p className="text-xl mb-4">
              &ldquo;When I was unexpectedly laid off, I felt lost and pressured
              to sign the severance agreement quickly. Employment AI helped me
              understand my rights and negotiate a much fairer package. I
              can&apos;t thank them enough for their support during such a
              stressful time.&rdquo;
            </p>
            <p className="font-semibold">
              - Sarah K., Former Marketing Manager
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Don&apos;t Face Career Decisions Alone
          </h2>
          <p className="text-xl mb-8">
            Whether you&apos;re reviewing a new offer or navigating a layoff,
            get the insights you need to make informed decisions.
          </p>
          <Link href="/dashboard" passHref>
            <button className="bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-300 transition duration-300 flex items-center mx-auto">
              Analyze Your Agreement <ArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </section>

      {/* Waiting List Section */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">
            We&apos;re Just Getting Started...
          </h2>
          <p className="text-xl mb-8">
            Join our waiting list to be the first to know about new features and
            updates!
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-r-full hover:bg-blue-700 transition duration-300"
              >
                Join Waitlist
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  image: StaticImageData
  imagePosition: 'left' | 'right'
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  image,
  imagePosition
}) => (
  <div
    className={`flex flex-col ${imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
  >
    <div className="md:w-1/2 mb-8 md:mb-0">
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        className="rounded-lg shadow-lg"
      />
    </div>
    <div
      className={`md:w-1/2 ${imagePosition === 'right' ? 'md:pl-12' : 'md:pr-12'}`}
    >
      <h3 className="text-3xl font-bold mb-4 text-blue-600">{title}</h3>
      <p className="text-xl text-slate-700">{description}</p>
    </div>
  </div>
)

const StepItem: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text
}) => (
  <li className="flex items-center space-x-2">
    <span className="text-amber-400">{icon}</span>
    <span>{text}</span>
  </li>
)

export default LandingPage
