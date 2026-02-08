'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NICHES, STATES, generateId } from '@/lib/types'

export default function AddRecord() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const record = {
      id: generateId(),
      date: new Date().toISOString().split('T')[0],
      contractorName: formData.get('contractorName') as string,
      businessName: formData.get('businessName') as string,
      niche: formData.get('niche') as string,
      phone: formData.get('phone') as string,
      state: formData.get('state') as string,
      smsSent: formData.get('smsSent') === 'on',
      smsSentAt: formData.get('smsSent') === 'on' ? new Date().toISOString() : undefined,
      replyReceived: false,
      callAttempted: false,
      callPickedUp: null,
      conversationHad: false,
      outcome: '',
      notes: formData.get('notes') as string,
      followUpCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    await fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    })
    
    router.push('/')
    router.refresh()
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Add Outreach Record</h1>
      <p className="text-gray-400 mb-8">Log a new contractor outreach</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Contractor Name *</label>
            <input
              name="contractorName"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Smith"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Business Name</label>
            <input
              name="businessName"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Smith Roofing Co"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Niche *</label>
            <select
              name="niche"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select niche...</option>
              {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">State *</label>
            <select
              name="state"
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select state...</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Phone Number</label>
          <input
            name="phone"
            type="tel"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
          <input
            name="smsSent"
            type="checkbox"
            id="smsSent"
            defaultChecked
            className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="smsSent" className="text-gray-300">
            SMS already sent today
          </label>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Notes</label>
          <textarea
            name="notes"
            rows={3}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any initial notes..."
          />
        </div>
        
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Record'}
          </button>
          <a
            href="/"
            className="px-6 py-3 text-gray-400 hover:text-white font-medium transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
