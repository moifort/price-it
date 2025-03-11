import { Card, CardContent } from '@/components/atoms/card'
import { Target } from 'lucide-react'

export const DailyRunsCard = ({
  current,
  total,
}: {
  current: number
  total: number
}) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex flex-col items-center gap-2">
        <Target className="w-8 h-8 text-blue-500" />
        <h3 className="text-lg font-semibold">Daily Runs</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-primary">{current}</span>
          <span className="text-sm text-muted-foreground">/{total}</span>
        </div>
      </div>
    </CardContent>
  </Card>
)
