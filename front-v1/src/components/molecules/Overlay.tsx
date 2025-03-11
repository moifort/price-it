import { Card } from '@/components/atoms/card'
import type { ReactNode } from 'react'

export const Overlay = ({
  icon,
  title,
  description,
  actions,
}: {
  icon: ReactNode
  title: string | ReactNode
  description: string | ReactNode
  actions: ReactNode
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-300 p-4">
      <Card className="w-full max-w-md p-6 md:p-8 flex flex-col items-center gap-6 text-center">
        <div className={'flex items-center justify-center w-20 h-20 rounded-full '}>
          <div>{icon}</div>
        </div>

        <h2 className={'text-2xl font-bold'}>{title}</h2>

        {description && <div className="text-xl mb-4">{description}</div>}

        {actions && <div className="w-full">{actions}</div>}
      </Card>
    </div>
  )
}
