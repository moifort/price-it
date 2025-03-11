import { Card, CardContent } from '@/components/atoms/card'
import { Clock } from 'lucide-react'
import type { Seconde } from '../../../../../back/src/utils/index.type'

export const BestTimeCard = ({ time }: { time: Seconde }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-2">
          <Clock className="w-8 h-8 text-green-500" />
          <h3 className="text-lg font-semibold">Best Time</h3>
          <p className="text-3xl font-bold text-primary">{time}s</p>
        </div>
      </CardContent>
    </Card>
  )
}
