import ProductCard from '@/components/ProductCard'
import { useCart } from '@/context/CartContext'
import useProducts from '@/hooks/useProducts'

const Home = () => {

  const { products } = useProducts('products')
  const { addProductCart } = useCart()

  return (
    <div className='flex flex-col gap-4'>
      <header className='text-center py-4'>
        <h1 className='text-2xl font-bold'>Carrito de compras fake </h1>
        <p className='text-xl font-medium'>Consumiendo API de Fake Store API</p>
      </header>
      <div>
        Buscador y otras cosas mas botones etc
      </div>
      <div className='flex justify-between items-start gap-4'>
        <ProductCard addProductCart={addProductCart} products={products} />
      </div>
    </div>
  )
}

export default Home