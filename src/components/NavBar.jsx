import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Menu, ShoppingCartIcon, StoreIcon, XIcon } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const NavBar = () => {

  const navigate = useNavigate()
  const { count } = useCart()

  const [openMenu, setOpenMenu] = useState(false)
  const handleClickOpenMenu = () => setOpenMenu(!openMenu)
  const closeMenu = () => setOpenMenu(false)

  return (
    <nav className='bg-white border-b border-slate-200 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>

          <div className='flex-shrink-0 flex items-center gap-2 cursor-pointer' onClick={() => { navigate('/'); closeMenu() }}>
            <div className='bg-slate-900 text-white p-2 rounded-lg'>
              <StoreIcon className='w-5 h-5' />
            </div>
            <span className='font-bold text-xl tracking-tight text-slate-900'>JL Store</span>
          </div>


          <div className='hidden md:flex items-center gap-6'>
            <Link to={'/'} className='text-slate-600 hover:text-slate-900 font-medium transition-colors'>
              Inicio
            </Link>
            <Link to={'/productos'} className='text-slate-600 hover:text-slate-900 font-medium transition-colors'>
              Productos
            </Link>
          </div>


          <div className='flex items-center gap-2'>
            <div className='relative'>
              <Button variant='outline' onClick={() => { navigate('/cart'); closeMenu() }} className='relative px-3'>
                <ShoppingCartIcon className='w-5 h-5' />
                {count > 0 && (
                  <span className='absolute -top-2 -right-2 bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold ring-2 ring-white'>
                    {count}
                  </span>
                )}
              </Button>
            </div>

            <Button variant='ghost' onClick={handleClickOpenMenu} className='md:hidden px-2'>
              {openMenu ? <XIcon className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </Button>
          </div>
        </div>
      </div>

      {openMenu && (
        <div className='md:hidden bg-slate-50 border-b border-slate-200 absolute w-full shadow-lg'>
          <div className='flex flex-col px-4 pt-2 pb-4 space-y-1'>
            <Link to={'/'} onClick={closeMenu} className='block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors'>
              Inicio
            </Link>
            <Link to={'/productos'} onClick={closeMenu} className='block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors'>
              Productos
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar