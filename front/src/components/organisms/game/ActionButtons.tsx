import { ActionButton } from '@/components/molecules/ActionButton'
import { ArrowDown, ArrowUp } from 'lucide-react'
import type { Amount } from '../../../../../back/src/utils/index.type'

export const ActionButtons = ({
  isActive,
  onGuess,
  displayPrice,
}: {
  isActive: boolean
  onGuess: (guess: 'less' | 'exact' | 'more') => void
  displayPrice: Amount
}) => (
  <div className="grid grid-cols-3 gap-4 w-full mt-2">
    <ActionButton
      isActive={isActive}
      onClick={() => onGuess('less')}
      icon={<ArrowDown className="w-6 h-6 text-blue-500" />}
      label="Lower"
    />

    <ActionButton
      isActive={isActive}
      onClick={() => onGuess('exact')}
      icon={<span className="font-bold text-lg">${displayPrice.toFixed(2)}</span>}
      label="Exact"
    />

    <ActionButton
      isActive={isActive}
      onClick={() => onGuess('more')}
      icon={<ArrowUp className="w-6 h-6 text-red-500" />}
      label="Higher"
    />
  </div>
)
