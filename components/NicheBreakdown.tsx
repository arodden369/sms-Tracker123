'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface NicheData {
  niche: string
  sent: number
  replies: number
  qualified: number
}

interface Props {
  data: NicheData[]
}
export function NicheBreakdown({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.sent - a.sent).slice(0, 6)
  
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">🏢 By Niche (Top 6)</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="niche" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="sent" name="Sent" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="replies" name="Replies" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="qualified" name="Qualified" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
