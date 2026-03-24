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

  const { products, isLoading } = useProducts('products')
  const { addProductCart } = useCart()

  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('todos')
  const [sort, setSort] = useState('none')
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

    }).sort((a, b) => {
      if (sort === 'asc') return a.price - b.price
      if (sort === 'desc') return b.price - a.price
      if (sort === 'title') return a.title.localeCompare(b.title)
      return 0
    })
  }, [products, filterCategory, searchDebounce, sort])

  const categories = [
    { id: 'todos', label: 'Todos los productos' },
    { id: 'ropaMujer', label: 'Ropa de Mujer' },
    { id: 'ropaHombre', label: 'Ropa de Hombre' },
    { id: 'joyas', label: 'Joyería' },
    { id: 'electronicos', label: 'Electrónicos' },
  ]

  return (
    <div className='flex flex-col gap-8'>

      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100'>
        <div>
          <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Nuestro Catálogo</h1>
          <p className='text-base text-slate-500 mt-2'>Mostrando {productsFiltered.length} artículos increíbles</p>
        </div>
        <div className='relative w-full md:max-w-md'>
          <Search className='absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 w-5 h-5' />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Buscar prendas, joyas, tecnología...'
            className='pl-12 h-14 w-full bg-slate-50 border-transparent focus:bg-white focus:border-slate-300 focus:ring-slate-900 rounded-2xl shadow-inner transition-all text-base'
          />
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-start gap-8'>

        <aside className='w-full md:w-64 shrink-0 lg:sticky lg:top-24 h-fit p-6 bg-white border border-slate-100 rounded-3xl shadow-sm'>

          <h3 className='font-bold text-sm uppercase tracking-wider text-slate-400 mb-4'>Categorías</h3>
          <div className='flex flex-col space-y-1.5'>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={filterCategory === cat.id ? 'default' : 'ghost'}
                onClick={() => setFilterCategory(cat.id)}
                className={`w-full justify-start rounded-xl font-medium transition-colors ${filterCategory === cat.id ? 'bg-slate-900 shadow-md text-white hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          <hr className='border-slate-100 my-6' />

          <h3 className='font-bold text-sm uppercase tracking-wider text-slate-400 mb-4'>Ordenación</h3>
          <SelectCategory setSort={setSort} sort={sort} />
        </aside>

        <div className='flex-1 w-full'>
          <ProductCard products={productsFiltered} addProductCart={addProductCart} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default Productos