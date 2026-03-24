import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { Button } from './ui/button'
import { Plus, SearchXIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductCard = ({ addProductCart, products, isLoading }) => {

  const [imgError, setImgError] = useState(false)

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

  if (!products || products.length === 0) {
    return (
      <div className='w-full grid grid-cols-3 gap-4'>
        <div className='col-span-3 flex flex-col text-center items-center justify-center border border-dashed border-slate-950 p-4 rounded-2xl bg-slate-200'>
          <SearchXIcon className='w-12 h-12 mx-auto mb-2 text-slate-500' />
          <p className='text-slate-500'>No se encontraron productos, prueba con otras categorias o con el buscador</p>
        </div>
      </div>
    )
  }

  return (
    <section className='w-full flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {(products || []).map(prod =>
        <Card key={prod.id} className='flex flex-col justify-between py-0 w-full bg-white border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative'>
          <Link to={`/productos/${prod.id}`} className='flex flex-col h-full'>
            <div className='relative overflow-hidden bg-slate-50 p-6 flex-shrink-0'>
              {!imgError ? (
                <img
                  src={prod.image || `https://via.placeholder.com/400x400?text=${encodeURIComponent(prod.title)}`}
                  alt={prod.title}
                  className='w-full h-48 object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out'
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center text-5xl bg-slate-100 mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out">🛍️</div>
              )}

              <span className='absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 shadow-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider'>
                {prod.category}
              </span>
            </div>

            <CardHeader className='py-4 px-5 flex-shrink-0'>
              <CardTitle>
                <h3 className='leading-snug line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors'>{prod.title}</h3>
              </CardTitle>
            </CardHeader>

            <CardContent className='px-5 flex-grow'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='bg-amber-100 text-amber-800 px-2 py-0.5 select-none flex items-center text-xs font-bold rounded-md'>
                  ★ {prod.rating?.rate}
                </span>
                <span className='text-xs text-slate-500 font-medium'>
                  ({prod.rating?.count} reviews)
                </span>
              </div>
              <p className='leading-relaxed line-clamp-3 text-sm text-slate-500 font-light'>{prod.description}</p>
            </CardContent>

            <CardFooter className='p-5 pt-0 mt-auto w-full'>
              <div className='flex w-full items-center justify-between mt-4 border-t border-slate-100 pt-4'>
                <p className='text-2xl font-extrabold text-slate-900'>
                  <span className='text-sm text-slate-400 font-normal mr-1'>S/.</span>
                  {prod.price?.toFixed(2)}
                </p>
                <Button
                  onClick={(e) => { e.preventDefault(); addProductCart(prod); }}
                  className='rounded-full h-10 w-10 p-0 bg-slate-900 hover:bg-indigo-600 text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1'
                  title="Agregar al carrito"
                >
                  <Plus className='w-5 h-5' />
                </Button>
              </div>
            </CardFooter>
          </Link>
        </Card>
      )}
    </section>
  )
}

export default ProductCard