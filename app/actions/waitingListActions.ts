'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  email: z.string().email()
})

export async function addToWaitingList(formData: FormData) {
  const email = formData.get('email')

  const result = schema.safeParse({ email })

  if (!result.success) {
    // Handle validation errors
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  try {
    // TODO: Implement the actual logic to add the email to your waiting list
    // This could involve saving to a database, calling an API, etc.
    console.log('Adding email to waiting list:', email)

    // Revalidate the page to show updated data
    revalidatePath('/')

    return { success: true }
  } catch (error) {
    console.error('Error adding email to waiting list:', error)
    return {
      success: false,
      error: 'An error occurred while adding you to the waiting list.'
    }
  }
}
