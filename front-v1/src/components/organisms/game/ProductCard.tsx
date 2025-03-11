import { Card, CardHeader, CardTitle } from '@/components/atoms/card'
import Image from 'next/image'
import type { Url } from '../../../../../back/src/utils/index.type'

export const ProductCard = ({ name, imageUrl }: { name: string; imageUrl: Url }) => (
  <>
    <Card className="w-full overflow-hidden shadow-lg border-2 border-primary/20 bg-card/90 rounded-b-none">
      <div className="relative w-full h-72 md:h-96">
        <Image
          src={imageUrl}
          alt={name}
          fill
          unoptimized
          priority
          className="object-cover transition-all hover:scale-105 duration-700"
        />
      </div>
    </Card>

    <Card className="w-full rounded-t-none">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {name}
        </CardTitle>
      </CardHeader>
    </Card>
  </>
)
