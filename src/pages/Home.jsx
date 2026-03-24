import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import useProducts from '@/hooks/useProducts'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'

const Home = () => {

  const { products, isLoading } = useProducts('products')
  const { addProductCart } = useCart()

  return (
    <div className='flex flex-col gap-12'>

      <section className='relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90' />
        <div className='absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse' />
        <div className='absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20' />

        <div className='relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 md:py-32'>
          <span className='px-4 py-1.5 bg-white/10 text-slate-300 rounded-full text-sm font-medium mb-6 backdrop-blur-md border border-white/10 tracking-wide'>
            ✨ Nueva Colección 2026
          </span>
          <h1 className='text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-3xl'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400'>JL Store</span>
          </h1>
          <p className='text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light'>
            Esto es un proyecto de aprendizaje Front-End, con el fin de simular una tienda real donde no se realizan transacciones verdaderas.
          </p>
          <div className='flex flex-col sm:flex-row items-center gap-4'>
            <Link to='/productos'>
              <Button size="lg" className='bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 h-14 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1'>
                <ShoppingBag className='mr-2 w-5 h-5' />
                Ver catálogo completo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className='mb-12'>
        <div className='flex flex-col sm:flex-row justify-between items-end gap-4 mb-8 border-b border-slate-200 pb-4'>
          <div>
            <h2 className='text-3xl font-extrabold text-slate-900 mb-2 tracking-tight'>Productos Destacados</h2>
            <p className='text-slate-500 text-lg'>Nuestra mejor selección pensada especialmente para ti.</p>
          </div>
          <Link to='/productos'>
            <Button variant="ghost" className='hidden sm:flex text-slate-600 hover:text-slate-900 hover:bg-slate-200 group font-semibold'>
              Ver todos <ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </Button>
          </Link>
        </div>

        <ProductCard addProductCart={addProductCart} products={products.slice(0, 6)} isLoading={isLoading} />

        <div className='mt-8 flex justify-center sm:hidden'>
          <Link to='/productos' className='w-full'>
            <Button variant="outline" className='w-full h-12 text-base font-semibold'>
              Descubrir más
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home