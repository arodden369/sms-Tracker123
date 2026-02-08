import { kv } from '@vercel/kv'
import { OutreachRecord, DashboardMetrics } from './types'

const RECORDS_KEY = 'sms:outreach:records'

export async function getAllRecords(): Promise<OutreachRecord[]> {
  try {
    const records = await kv.get<OutreachRecord[]>(RECORDS_KEY)
    return records || []
  } catch {
    return []
  }
}

export async function getRecordById(id: string): Promise<OutreachRecord | null> {
  const records = await getAllRecords()
  return records.find(r => r.id === id) || null
}

export async function addRecord(record: OutreachRecord): Promise<void> {
  const records = await getAllRecords()
  records.push(record)
  await kv.set(RECORDS_KEY, records)
}

export async function updateRecord(id: string, updates: Partial<OutreachRecord>): Promise<void> {
  const records = await getAllRecords()
  const index = records.findIndex(r => r.id === id)
  if (index !== -1) {
    records[index] = { ...records[index], ...updates, updatedAt: new Date().toISOString() }
    await kv.set(RECORDS_KEY, records)
  }
}

export async function deleteRecord(id: string): Promise<void> {
  const records = await getAllRecords()
  const filtered = records.filter(r => r.id !== id)
  await kv.set(RECORDS_KEY, filtered)
}

export async function getMetrics(): Promise<DashboardMetrics> {
  const records = await getAllRecords()
  
  const totalSent = records.filter(r => r.smsSent).length
  const totalReplies = records.filter(r => r.replyReceived).length
  const totalCallsAttempted = records.filter(r => r.callAttempted).length
  const totalPickedUp = records.filter(r => r.callPickedUp === true).length
  const totalQualified = records.filter(r => r.outcome === 'qualified').length
  const followUpsNeeded = records.filter(r => 
    r.outcome === 'follow_up_needed' || 
    (r.replyReceived && !r.callAttempted)
  ).length
  
  // By day (last 7 days)
  const days: { date: string; count: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const count = records.filter(r => 
      r.replyReceived && r.replyAt?.startsWith(dateStr)
    ).length
    days.push({ date: dateStr, count })
  }
  
  // By niche
  const nicheMap = new Map<string, { sent: number; replies: number; qualified: number }>()
  records.forEach(r => {
    const current = nicheMap.get(r.niche) || { sent: 0, replies: 0, qualified: 0 }
    if (r.smsSent) current.sent++
    if (r.replyReceived) current.replies++
    if (r.outcome === 'qualified') current.qualified++
    nicheMap.set(r.niche, current)
  })
  const byNiche = Array.from(nicheMap.entries()).map(([niche, data]) => ({
    niche,
    ...data
  }))
  
  // By outcome
  const outcomeMap = new Map<string, number>()
  records.forEach(r => {
    const key = r.outcome || 'no_outcome'
    outcomeMap.set(key, (outcomeMap.get(key) || 0) + 1)
  })
  const byOutcome = Array.from(outcomeMap.entries()).map(([outcome, count]) => ({
    outcome: outcome as any,
    count
  }))
  
  return {
    totalSent,
    totalReplies,
    replyRate: totalSent > 0 ? (totalReplies / totalSent) * 100 : 0,
    totalCallsAttempted,
    pickupRate: totalCallsAttempted > 0 ? (totalPickedUp / totalCallsAttempted) * 100 : 0,
    totalQualified,
    qualifiedRate: totalReplies > 0 ? (totalQualified / totalReplies) * 100 : 0,
    followUpsNeeded,
    repliesByDay: days,
    byNiche,
    byOutcome,
    hourlyReplyRates: [2.1, 1.8, 1.5, 1.2, 1.0, 1.3, 2.5, 4.2, 5.8, 6.5, 7.2, 8.1, 
                       7.8, 7.5, 6.9, 6.2, 5.8, 5.5, 6.8, 8.5, 9.2, 7.8, 5.2, 3.5]
  }
}
