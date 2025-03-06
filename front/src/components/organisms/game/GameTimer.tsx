import { Card } from '@/components/atoms/card'
import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'

type GameTimerProps = {
  timer: number
}

export const GameTimer = ({ timer }: GameTimerProps) => (
  <Card
    className={cn(
      'w-full transition-colors border-2',
      timer <= 3 ? 'border-red-500 animate-pulse' : timer <= 5 ? 'border-yellow-500' : 'border-primary/40',
    )}
  >
    <div className="flex items-center justify-center p-6">
      <div className="flex items-center gap-3">
        <Clock className={cn('w-6 h-6', timer <= 3 && 'text-red-500')} />
        <span
          className={cn(
            'text-4xl font-bold tabular-nums',
            timer <= 3 ? 'text-red-500' : timer <= 5 ? 'text-yellow-500' : 'text-primary',
          )}
        >
          {timer}
        </span>
      </div>
    </div>
  </Card>
)
