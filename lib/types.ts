export interface OutreachRecord {
  id: string
  date: string
  contractorName: string
  businessName: string
  niche: string
  phone: string
  state: string
  
  // SMS Stage
  smsSent: boolean
  smsSentAt?: string
  smsTemplate?: string
  replyReceived: boolean
  replyAt?: string
  replyContent?: string
  
  // Call Stage  
  callAttempted: boolean
  callAttemptedAt?: string
  callPickedUp: boolean | null
  conversationHad: boolean
  
  // Outcome
  outcome: OutcomeType
  notes: string
  
  // Follow-up
  followUpScheduled?: string
  followUpCompleted: boolean
  
  // Meta
  createdAt: string
  updatedAt: string
}

export type OutcomeType = 
  | 'qualified' 
  | 'not_interested' 
  | 'callback_requested' 
  | 'voicemail' 
  | 'follow_up_needed' 
  | 'no_reply_yet' 
  | 'appointment_set'
  | ''
export const OUTCOME_LABELS: Record<OutcomeType, string> = {
  qualified: '✅ Qualified',
  not_interested: '❌ Not Interested',
  callback_requested: '📞 Callback Requested',
  voicemail: '📼 Left Voicemail',
  follow_up_needed: '⏰ Follow-up Needed',
  no_reply_yet: '⏳ No Reply Yet',
  appointment_set: '📅 Appointment Set',
  '': '—'
}

export const OUTCOME_COLORS: Record<OutcomeType, string> = {
  qualified: 'text-green-400 bg-green-400/10',
  not_interested: 'text-red-400 bg-red-400/10',
  callback_requested: 'text-blue-400 bg-blue-400/10',
  voicemail: 'text-yellow-400 bg-yellow-400/10',
  follow_up_needed: 'text-orange-400 bg-orange-400/10',
  no_reply_yet: 'text-gray-400 bg-gray-400/10',
  appointment_set: 'text-purple-400 bg-purple-400/10',
  '': 'text-gray-500 bg-gray-500/10'
}

export const NICHES = [
  'Roofing',
  'HVAC', 
  'Painting',
  'Landscaping',
  'Plumbing',
  'Electrical',
  'Remodeling',
  'Flooring',
  'Windows',
  'Other'
]

export const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

export interface DashboardMetrics {
  totalSent: number
  totalReplies: number
  replyRate: number
  totalCallsAttempted: number
  pickupRate: number
  totalQualified: number
  qualifiedRate: number
  followUpsNeeded: number
  repliesByDay: { date: string; count: number }[]
  byNiche: { niche: string; sent: number; replies: number; qualified: number }[]
  byOutcome: { outcome: OutcomeType; count: number }[]
  hourlyReplyRates: number[]
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}
