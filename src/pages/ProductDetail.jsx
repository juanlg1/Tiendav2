import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import useProducts from '@/hooks/useProducts'
import { ArrowLeft, LucideSendToBack } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { id } = useParams()
  const { products } = useProducts(`products/${id}`)

  const navigate = useNavigate()
  return (
    <div className='h-screen w-full p-4'>
      <div className='mt-4'>
        <Button onClick={() => navigate('/')} className='mb-4'>
          <ArrowLeft /> Regresar
        </Button>
      </div>
      <Card className='relative md:flex-row md:max-w-3xl mx-auto'>
        <div className=''>
          <img src={products.image} alt="" className='w-full' />
          <span className='absolute top-2 left-2 bg-slate-900 rounded-2xl text-white py-1 px-2 text-xs'>{products.category}</span>
        </div>
        <div className='p-4 w-full'>
          <h3 className='text-lg font-medium'>Titulo {products.title} </h3>
          <p className='text-sm'>{products.description} </p>
          <p className='text-sm font-semibold'>Precio {products.price} </p>
        </div>
      </Card>
    </div>
  )
}

export default ProductDetail