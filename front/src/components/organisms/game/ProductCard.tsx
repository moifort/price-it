import type { Product } from '@/app/game/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/atoms/card'
import Image from 'next/image'

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => (
  <>
    {/* Product Image */}
    <Card className="w-full overflow-hidden shadow-lg border-2 border-primary/20 bg-card/90">
      <div className="relative w-full h-72 md:h-96">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          unoptimized
          priority
          className="object-cover transition-all hover:scale-105 duration-700"
        />
      </div>
    </Card>

    {/* Product Info */}
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {product.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">{product.description}</p>
      </CardContent>
    </Card>
  </>
)
