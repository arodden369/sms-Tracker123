typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NICHES, STATES, OUTCOME_LABELS, OutreachRecord } from '@/lib/types'

export default function EditRecordForm({ record }: { record: OutreachRecord }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
     const updates = {
      contractorName: formData.get('contractorName') as string,
      businessName: formData.get('businessName') as string,
      niche: formData.get('niche') as string,
      phone: formData.get('phone') as string,
      state: formData.get('state') as string,
      smsSent: formData.get('smsSent') === 'on',
      replyReceived: formData.get('replyReceived') === 'on',
      replyContent: formData.get('replyContent') as string,
      callAttempted: formData.get('callAttempted') === 'on',
      callPickedUp: formData.get('callAttempted') === 'on' 
        ? formData.get('callPickedUp') === 'on'
        : null,
      outcome: formData.get('outcome') as any,
        notes: formData.get('notes') as string,
      followUpCompleted: formData.get('followUpCompleted') === 'on',
    }
    
    await fetch(`/api/records/${record.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    
    router.push('/records')
    router.refresh()
  }
  
  return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 border border-gray-800 rounded-xl p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Contractor Name</label>
          <input
            name="contractorName"
            defaultValue={record.contractorName}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Business Name</label>
          <input
            name="businessName"
            defaultValue={record.businessName}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Niche</label>
          <select
            name="niche"
            defaultValue={record.niche}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          >
            {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">State</label>
          <select
            name="state"
            defaultValue={record.state}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          >
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Phone</label>
          <input
            name="phone"
            defaultValue={record.phone}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-6 space-y-4">
        <h3 className="font-medium text-white">Progress Tracking</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg cursor-pointer">
            <input
              name="smsSent"
              type="checkbox"
              defaultChecked={record.smsSent}
              className="w-5 h-5 rounded border-gray-600"
            />
            <span className="text-gray-300">SMS Sent</span>
          </label>
          
          <label className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg cursor-pointer">
            <input
              name="replyReceived"
              type="checkbox"
              defaultChecked={record.replyReceived}
              className="w-5 h-5 rounded border-gray-600"
            />
            <span className="text-gray-300">Reply Received</span>
          </label>
        </div>
        
        {record.replyReceived && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Reply Content</label>
            <textarea
              name="replyContent"
              defaultValue={record.replyContent}
              rows={2}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              placeholder="What did they say?"
            />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg cursor-pointer">
            <input
              name="callAttempted"
              type="checkbox"
              defaultChecked={record.callAttempted}
              className="w-5 h-5 rounded border-gray-600"
            />
            <span className="text-gray-300">Call Attempted</span>
          </label>
          
          <label className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg cursor-pointer">
            <input
              name="callPickedUp"
              type="checkbox"
              defaultChecked={record.callPickedUp === true}
              className="w-5 h-5 rounded border-gray-600"
            />
            <span className="text-gray-300">Picked Up</span>
          </label>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Outcome</label>
          <select
            name="outcome"
            defaultValue={record.outcome}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          >
            <option value="">Select outcome...</option>
            {Object.entries(OUTCOME_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Notes</label>
        <textarea
          name="notes"
          defaultValue={record.notes}
          rows={3}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
        />
      </div>
      
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Update Record'}
        </button>
        
        <a href="/records" className="px-6 py-3 text-gray-400 hover:text-white">
          Cancel
        </a>
      </div>
    </form>
  )
}
