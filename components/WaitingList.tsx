import React from 'react'
import { FormEvent } from 'react'
import { addToWaitingList } from '@/app/actions/waitingListActions'

const WaitingList: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          We&apos;re just getting started...
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Join our waiting list to be the first to know about new features and
          updates.
        </p>
        <form
          action={async (formData: FormData) => {
            await addToWaitingList(formData)
          }}
          className="max-w-md mx-auto"
        >
          <div className="flex">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
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
  )
}

export default WaitingList
