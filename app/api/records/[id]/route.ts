import { NextResponse } from 'next/server'
import { updateRecord, deleteRecord } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updates = await request.json()
  await updateRecord(params.id, updates)
  return NextResponse.json({ success: true })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await deleteRecord(params.id)
  return NextResponse.json({ success: true })
}
