import { Button } from '@/components/atoms/button'
import { openExternalUrl } from '@/utils/telegram'
import { ExternalLink, Trophy } from 'lucide-react'
import type { Amount, Url } from '../../../../../back/src/utils/index.type'
import { Overlay } from '../../molecules/Overlay'

export const WinOverlay = ({
  price,
  onNext,
  productUrl,
  isLastRun,
}: {
  price: Amount
  productUrl: Url
  onNext: () => void
  isLastRun: boolean
}) => {
  return (
    <Overlay
      icon={<Trophy className="text-green-500 w-10 h-10" />}
      title={<div className="text-green-500">Correct!</div>}
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
            className="w-full border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 flex items-center justify-center gap-2"
            onClick={() => openExternalUrl(productUrl)}
          >
            <ExternalLink className="w-4 h-4" />
            See Product
          </Button>
          <Button variant="default" size="lg" className="w-full " onClick={onNext}>
            {isLastRun ? 'Finish Game' : 'Next Product'}
          </Button>
        </div>
      }
    />
  )
}
