import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import useProducts from '@/hooks/useProducts'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { useCart } from '@/context/CartContext'

const ProductDetail = () => {
  const { id } = useParams()

  const { products: product, isLoading } = useProducts(`products/${id}`)
  const { addProductCart } = useCart()
  const navigate = useNavigate()

  return (
    <div className='min-h-screen w-full p-4 max-w-5xl mx-auto'>
      <div className='mt-4'>
        <Button onClick={() => navigate(-1)} className='mb-4' variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Regresar
        </Button>
      </div>

      {isLoading || !product.id ? (
        <Card className='flex flex-col md:flex-row p-6 gap-6 w-full'>
          <Skeleton className='w-full md:w-1/2 h-80' />
          <div className='flex flex-col gap-4 w-full md:w-1/2'>
            <Skeleton className='w-24 h-6' />
            <Skeleton className='w-full h-8' />
            <Skeleton className='w-full h-24' />
            <Skeleton className='w-32 h-8' />
          </div>
        </Card>
      ) : (
        <Card className='relative flex flex-col md:flex-row overflow-hidden p-6 gap-8 shadow-md border-slate-200 w-full'>
          <div className='relative w-full md:w-1/2 flex items-center justify-center bg-white rounded-lg p-4'>
            <img src={product.image} alt={product.title} className='max-h-96 object-contain' />
            <span className='absolute top-2 left-2 bg-slate-900 border border-slate-700 rounded-full text-white py-1 px-3 text-xs capitalize'>
              {product.category}
            </span>
          </div>
          <div className='flex flex-col justify-center w-full md:w-1/2 gap-4'>
            <h1 className='text-3xl font-bold text-slate-900'>{product.title} </h1>

            <div className='flex items-center gap-2'>
              <span className='bg-amber-100 text-amber-800 px-2 py-1 select-none flex text-xs font-semibold rounded-md'>
                ★ {product.rating?.rate}
              </span>
              <span className='text-sm text-slate-500 hover:underline cursor-pointer'>
                {product.rating?.count} opiniones
              </span>
            </div>

            <p className='text-slate-600 text-base leading-relaxed'>
              {product.description}
            </p>
            <p className='text-4xl mt-4 font-bold text-slate-900'>
              S/. {product.price?.toFixed(2)}
            </p>

            <Button onClick={() => addProductCart(product)} className='mt-4 bg-slate-900 hover:bg-slate-800 w-fit text-lg px-8 py-6' size="lg">
              <ShoppingCart className="mr-2" /> Agregar al carrito
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default ProductDetail