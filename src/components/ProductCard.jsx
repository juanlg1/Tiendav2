import useProducts from '@/hooks/useProducts'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductCard = ({ addProductCart, products }) => {

  const { isLoading } = useProducts('products')

  if (isLoading) {
    return (
      <div className="w-full grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i} className="w-full max-w-xs">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-video w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <section className='w-full grid grid-cols-3 gap-4'>
      {(products || []).map(prod =>
        <Card key={prod.id} className='py-0 cursor-pointer hover:shadow-lg transition-shadow overflow-hidden group relative'>
          <Link to={`/productos/${prod.id}`}>
            <div className='overflow-hidden'>
              <img src={prod.image} alt={prod.title} className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300' />
              <span className='absolute top-3 left-3 bg-white px-2 py-1 rounded-2xl text-xs'> {prod.category} </span>
            </div>
            <CardHeader className='py-2'>
              <CardTitle>
                <h3 className='leading-snug line-clamp-2 text-lg'>{prod.title}</h3>
              </CardTitle>
              <CardDescription>
                <p className='leading-snug line-clamp-4'>{prod.description}</p>
              </CardDescription>
            </CardHeader>
            <CardFooter className='flex-col items-start mb-0'>
              <div className='flex w-full items-center justify-between'>
                <p>S./ {prod.price}</p>
                <Button onClick={(e) => { e.preventDefault(), addProductCart(prod) }}>
                  <Plus />
                  Agregar
                </Button>
              </div>
              <div>
                <span className='text-sm text-stone-400'>{prod.rating.count} disponibles</span>
              </div>
            </CardFooter>
          </Link>
        </Card>
      )}
    </section>
  )
}

export default ProductCard