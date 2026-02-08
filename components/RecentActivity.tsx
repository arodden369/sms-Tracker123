import { getAllRecords } from '@/lib/db'
import { OUTCOME_LABELS, OUTCOME_COLORS } from '@/lib/types'

export async function RecentActivity() {
  const records = await getAllRecords()
  const recent = records
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
  
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">📋 Recent Activity</h2>
      
      {recent.length === 0 ? (
        <p className="text-gray-400">No records yet. <a href="/add" className="text-blue-400 hover:underline">Add your first</a>.</p>
      ) : (
        <div className="space-y-3">
          {recent.map((record) => (
            <a
              key={record.id}
              href={`/records`}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-2 h-12 rounded-full ${
                  record.outcome === 'qualified' ? 'bg-green-500' :
                  record.outcome === 'not_interested' ? 'bg-red-500' :
                  record.replyReceived ? 'bg-blue-500' : 'bg-gray-500'
                }`} />
                
                <div>
                  <p className="font-medium text-white">{record.contractorName}</p>
                  <p className="text-sm text-gray-400">{record.businessName} • {record.niche} • {record.state}</p>
                </div>
              </div>
              
              <div className="text-right">
                {record.outcome ? (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${OUTCOME_COLORS[record.outcome]}`}>
                    {OUTCOME_LABELS[record.outcome]}
                  </span>
                ) : record.replyReceived ? (
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-blue-400 bg-blue-400/10">
                    📨 Replied
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-400 bg-gray-400/10">
                    📤 Sent
                  </span>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(record.createdAt).toLocaleDateString()}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
