import { getMetrics } from '@/lib/db'
import { DashboardStats } from '@/components/DashboardStats'
import { PipelineChart } from '@/components/PipelineChart'
import { NicheBreakdown } from '@/components/NicheBreakdown'
import { RecentActivity } from '@/components/RecentActivity'
import { FollowUpAlert } from '@/components/FollowUpAlert'

export default async function Dashboard() {
  const metrics = await getMetrics()
  
  return (
    <div className="space-y-8">
      <FollowUpAlert count={metrics.followUpsNeeded} />
      
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Track your contractor outreach performance</p>
      </div>
      
      <DashboardStats metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineChart metrics={metrics} />
        <NicheBreakdown data={metrics.byNiche} />
      </div>
      
      <RecentActivity />
    </div>
  )
}
