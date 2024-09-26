import { NextRequest, NextResponse } from 'next/server'
import { getDocuments } from '@/app/actions/getDocuments'
import type { Document } from '@/lib/types'

export const dynamic = 'force-dynamic' // ➡️ Add this line

export async function GET(request: NextRequest) {
  try {
    const documents: Document[] = await getDocuments()
    return NextResponse.json(documents)
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}
