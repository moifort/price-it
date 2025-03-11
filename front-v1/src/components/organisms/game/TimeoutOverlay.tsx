import { Button } from '@/components/atoms/button'
import { openExternalUrl } from '@/utils/telegram'
import { Clock, ExternalLink } from 'lucide-react'
import type { Amount, Url } from '../../../../../back/src/utils/index.type'
import { Overlay } from '../../molecules/Overlay'

export const TimeoutOverlay = ({
  price,
  onNext,
  isLastRun,
  productUrl,
}: {
  price: Amount
  onNext: () => void
  isLastRun: boolean
  productUrl: Url
}) => {
  return (
    <Overlay
      icon={<Clock className="text-yellow-500 w-10 h-10" />}
      title={<div className="text-yellow-500">Time's Up!</div>}
      description={
        <p>
          The price was <span className="font-bold">${price.toFixed(2)}</span>
        </p>
      }
      actions={
        <div className="flex flex-col gap-3 w-full">
          <Button
            variant="outline"
            size="lg"
            className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 flex items-center justify-center gap-2"
            onClick={() => openExternalUrl(productUrl)}
          >
            <ExternalLink className="w-4 h-4" />
            See Product
          </Button>
          <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={onNext}>
            {isLastRun ? 'Finish Game' : 'Next Product'}
          </Button>
        </div>
      }
    />
  )
}
