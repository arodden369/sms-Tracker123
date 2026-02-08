interface Props {
  count: number
}
export function FollowUpAlert({ count }: Props) {
  if (count === 0) return null
  
  return (
    <a
      href="/followups"
      className="block bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4 hover:from-orange-500/30 hover:to-red-500/30 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⏰</span>
          <div>
            <p className="font-semibold text-orange-300">{count} follow-ups needed</p>
            <p className="text-sm text-orange-200/70">Contractors waiting for your call</p>
 </div>
        </div>
        
        <span className="text-orange-300 font-medium">View →</span>
      </div>
    </a>
  )
}
