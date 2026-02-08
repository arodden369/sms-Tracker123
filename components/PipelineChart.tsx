'use client'

import { DashboardMetrics } from '@/lib/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface Props {
  metrics: DashboardMetrics
}

export function PipelineChart({ metrics }: Props) {
  const data = [
    { name: 'SMS Sent', value: metrics.totalSent, color: '#3b82f6' },
    { name: 'Replies', value: metrics.totalReplies, color: '#10b981' },
    { name: 'Calls', value: metrics.totalCallsAttempted, color: '#8b5cf6' },
    { name: 'Qualified', value: metrics.totalQualified, color: '#f59e0b' },
  ]
  
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">🔄 Conversion Pipeline</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
            <XAxis type="number" stroke="#9ca3af" />
            <YAxis dataKey="name" type="category" stroke="#e5e7eb" width={80} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#e5e7eb' }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
