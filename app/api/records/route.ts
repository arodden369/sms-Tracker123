import { NextResponse } from 'next/server'
import { getAllRecords, addRecord } from '@/lib/db'
import { OutreachRecord } from '@/lib/types'

export async function GET() {
  const records = await getAllRecords()
  return NextResponse.json(records)
}

export async function POST(request: Request) {
  const record: OutreachRecord = await request.json()
  await addRecord(record)
  return NextResponse.json({ success: true })
}
