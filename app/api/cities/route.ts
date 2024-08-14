import { NextResponse } from 'next/server'

// Ensure you have set up your Google Places API key in your environment variables
const API_KEY = process.env.GOOGLE_PLACES_API_KEY

if (!API_KEY) {
  throw new Error('GOOGLE_PLACES_API_KEY is not set in environment variables')
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query
      )}&types=(cities)&key=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch cities')
    }

    const data = await response.json()

    return NextResponse.json({
      predictions: data.predictions.map((prediction: any) => ({
        description: prediction.description,
        placeId: prediction.place_id
      }))
    })
  } catch (error) {
    console.error('Error fetching cities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    )
  }
}
