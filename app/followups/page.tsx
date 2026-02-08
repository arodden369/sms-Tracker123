import { getAllRecords } from '@/lib/db'
import { OUTCOME_LABELS, OUTCOME_COLORS } from '@/lib/types'

export default async function FollowUpsPage() {
  const records = await getAllRecords()
  
  // Filter: replied but not called, OR explicitly marked as follow_up_needed
  const followUps = records.filter(r => 
    (r.replyReceived && !r.callAttempted) ||
    r.outcome === 'follow_up_needed' ||
    (r.outcome === 'callback_requested' && !r.followUpCompleted)
  )
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">⏰ Follow-up Queue</h1>
        <p className="text-gray-400">{followUps.length} contractors need your attention</p>
      </div>
      
      {followUps.length === 0 ? (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-12 text-center">
          <span className="text-4xl mb-4 block">🎉</span>
          <h2 className="text-xl font-semibold text-white mb-2">All caught up!</h2>
          <p className="text-gray-400">No follow-ups needed right now.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {followUps.map((record) => (
            <div
              key={record.id}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{record.contractorName}</h3>
                    <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                      {record.niche}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                      {record.state}
                    </span>
                  </div>
                  
                  <p className="text-gray-400">{record.businessName}</p>
                  
                  {record.phone && (
                    <p className="text-blue-400 font-mono">{record.phone}</p>
                  )}
                  
                  {record.replyContent && (
                    <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400 mb-1">Their reply:</p>
                      <p className="text-gray-200">"{record.replyContent}"</p>
                    </div>
                  )}
                  
                  {record.notes && (
                    <p className="text-sm text-gray-500 mt-2">Notes: {record.notes}</p>
                  )}
                </div>
                
                <div className="text-right space-y-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    record.replyReceived && !record.callAttempted 
                      ? 'text-orange-400 bg-orange-400/10' 
                      : OUTCOME_COLORS[record.outcome]
                  }`}>
                    {record.replyReceived && !record.callAttempted 
                      ? '⏳ Needs call' 
                      : OUTCOME_LABELS[record.outcome]}
                  </span>
                  
                  <div className="flex gap-2">
                    <a
                      href={`tel:${record.phone}`}
                      className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      📞 Call Now
                    </a>
                    
                    <a
                      href={`/records/${record.id}`}
                      className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                    >
