import { Button } from '@/components/atoms/button'
import { openExternalUrl } from '@/utils/telegram'
import { ExternalLink, X } from 'lucide-react'
import type { Amount, Url } from '../../../../../back/src/utils/index.type'
import { Overlay } from '../../molecules/Overlay'

export const LoseOverlay = ({
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
      icon={<X className="text-red-500 w-10 h-10" />}
      title={<div className="text-red-500">Wrong!</div>}
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
            className="w-full border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center gap-2"
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
