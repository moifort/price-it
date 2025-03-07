import { Button } from '@/components/atoms/button'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export const ActionButton = ({
  isActive,
  onClick,
  icon,
  label,
}: {
  isActive: boolean
  onClick: () => void
  icon: ReactNode
  label: string | ReactNode
}) => {
  return (
    <Button
      variant="outline"
      size="lg"
      className={cn(
        'h-24 text-lg flex flex-col gap-2 border-2',
        'transition-all',
        !isActive && 'opacity-50 pointer-events-none',
      )}
      onClick={onClick}
      disabled={!isActive}
    >
      {icon}
      {typeof label === 'string' ? <span>{label}</span> : label}
    </Button>
  )
}
