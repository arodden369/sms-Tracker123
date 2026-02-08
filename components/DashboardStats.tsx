'use client'

import { DashboardMetrics } from '@/lib/types'

interface Props {
  metrics: DashboardMetrics
}

export function DashboardStats({ metrics }: Props) {
  const stats = [
    {
      label: 'SMS Sent',
      value: metrics.totalSent,
      change: '+12%',
      color: 'blue'
    },
    {
      label: 'Replies',
      value: metrics.totalReplies,
      change: `${metrics.replyRate.toFixed(1)}% rate`,
      color: 'green'
    },
    {
      label: 'Calls Made',
      value: metrics.totalCallsAttempted,
      change: `${metrics.pickupRate.toFixed(0)}% pickup`,
      color: 'purple'
    },
    {
      label: 'Qualified',
      value: metrics.totalQualified,
      change: `${metrics.qualifiedRate.toFixed(0)}% of replies`,
      color: 'yellow'
    },
  ]
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-gray-900/50 border border-gray-800 rounded-xl p-6 relative overflow-hidden`}
        >
          <div className={`absolute top-0 left-0 right-0 h-1 bg-${stat.color}-500`} />
          
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            {stat.label}
          </p>
          
          <p className="text-3xl font-bold text-white mt-2">
            {stat.value}
          </p>
          
          <p className={`text-sm mt-1 text-${stat.color}-400`}>
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  )
}
