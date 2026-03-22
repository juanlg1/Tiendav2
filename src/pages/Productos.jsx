import ProductCard from '@/components/ProductCard'
import { Input } from '@/components/ui/input'
import SelectCategory from '@/components/SelectCategory'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import useProducts from '@/hooks/useProducts'
import useDebounce from '@/hooks/useDebounce'
import { useCart } from '@/context/CartContext'

const Productos = () => {

  const { products } = useProducts('products')
  const { addProductCart } = useCart()

  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('todos')
  const searchDebounce = useDebounce(search, 500)

  const productsFiltered = useMemo(() => {
    return products.filter(item => {
      const inputFilter = item.title.toLowerCase().includes(searchDebounce.toLowerCase()) ||
        item.description.toLowerCase().includes(searchDebounce.toLowerCase())

      const selectFilter = filterCategory === 'todos' ||
        filterCategory === 'ropaHombre' && item.category === `men's clothing` ||
        filterCategory === 'ropaMujer' && item.category === `women's clothing` ||
        filterCategory === 'joyas' && item.category === 'jewelery' ||
        filterCategory === 'electronicos' && item.category === 'electronics'

      return inputFilter && selectFilter

    })
  }, [products, filterCategory, searchDebounce])


  return (
    <div>
      <div>
        <h3>Nuestros Productos</h3>
        <p>Productos encontrados</p>
      </div>
      <div className='relative p-2'>
        <Search className='absolute top-4 left-4' />
        <Input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder='Buscar productos....'
          className='pl-10 py-5'
        />
      </div>
      <div className='flex justify-between w-full gap-4'>
        <aside className='w-full max-w-56 lg:sticky lg:top-6 h-fit p-4 bg-slate-200 border-2 border-slate-950 border-dashed rounded-2xl'>
          <h3>Categorias: </h3>
          <Button variant='outline' onClick={() => setFilterCategory('todos')}> Todos </Button>
          <Button variant='outline' onClick={() => setFilterCategory('ropaHombre')}> Ropa de Hombre </Button>
          <Button variant='outline' onClick={() => setFilterCategory('ropaMujer')}> Ropa de Mujer </Button>
          <Button variant='outline' onClick={() => setFilterCategory('joyas')}> Joyas </Button>
          <Button variant='outline' onClick={() => setFilterCategory('electronicos')}> Electronicos </Button>
          <SelectCategory />
        </aside>
        <ProductCard products={productsFiltered} addProductCart={addProductCart} />
      </div>
    </div>
  )
}

export default Productos