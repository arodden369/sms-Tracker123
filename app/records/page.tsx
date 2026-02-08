import { getAllRecords } from '@/lib/db'
import { OUTCOME_LABELS, OUTCOME_COLORS } from '@/lib/types'
export default async function RecordsPage() {
  const records = await getAllRecords()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">All Records</h1>
          <p className="text-gray-400">{records.length} total outreach records</p>
        </div>
        
        <a
          href="/add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          + Add New
        </a>
      </div>
      
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Contractor</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Niche</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">SMS</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Reply</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Call</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Outcome</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-800">
            {records.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-500">
                  No records yet. <a href="/add" className="text-blue-400 hover:underline">Add your first</a>.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-800/30">
                  <td className="py-3 px-4">
                    <p className="font-medium text-white">{record.contractorName}</p>
                    <p className="text-sm text-gray-500">{record.businessName}</p>
                  </td>
                  
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300">
                      {record.niche}
                    </span>
                  </td>
                  
                  <td className="py-3 px-4">
                    {record.smsSent ? (
                      <span className="text-green-400">✓ Sent</span>
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>
                  
                  <td className="py-3 px-4">
                    {record.replyReceived ? (
                      <span className="text-blue-400">📨 Yes</span>
                    ) : (
                      <span className="text-gray-500">Waiting...</span>
                    )}
                  </td>
                  
                  <td className="py-3 px-4">
                    {!record.callAttempted ? (
                      <span className="text-gray-500">Not called</span>
                    ) : record.callPickedUp ? (
                      <span className="text-green-400">📞 Picked up</span>
                    ) : (
                      <span className="text-red-400">📵 No answer</span>
                    )}
                  </td>
                  
                  <td className="py-3 px-4">
                    {record.outcome ? (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${OUTCOME_COLORS[record.outcome]}`}>
                        {OUTCOME_LABELS[record.outcome]}
                      </span>
                    ) : (
                      <span className="text-gray-500">Pending...</span>
                    )}
                  </td>
                  
                  <td className="py-3 px-4">
                    <a
                      href={`/records/${record.id}`}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


---

📄 app/records/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getRecordById } from '@/lib/db'
import { EditRecordForm } from '@/components/EditRecordForm'

export default async function EditRecordPage({ params }: { params: { id: string } }) {
  const record = await getRecordById(params.id)
  
  if (!record) {
    notFound()
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Edit Record</h1>
      <p className="text-gray-400 mb-8">Update outreach progress for {record.contractorName}</p>
      
      <EditRecordForm record={record} />
    </div>
  )
}
