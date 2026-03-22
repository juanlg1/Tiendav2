import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Menu, XIcon } from 'lucide-react'
import CartSheet from './CartSheet'
import { useCart } from '@/context/CartContext'

const NavBar = () => {

  const [openMenu, setOpenMenu] = useState(false)
  const handleClickOpenMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <nav className='bg-red-200'>
      <div className='max-w-7xl mx-auto px-4 md:p-0'>
        <div className='flex items-center justify-between h-16'>
          <div>
            <p>JL</p>
          </div>
          <div className='hidden md:flex items-center gap-1'>
            <Link to={'/'} className='py-2 px-3 bg-amber-200 rounded-2xl hover:bg-amber-300'>
              Inicio
            </Link>
            <Link to={'/productos'} className='py-2 px-3 bg-amber-200 rounded-2xl hover:bg-amber-300'>
              Productos
            </Link>
          </div>
          <div className='flex justify-between items-center gap-8'>
            <CartSheet />
            <Button onClick={handleClickOpenMenu} className='md:hidden' >
              {openMenu ? <XIcon /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      {openMenu && (
        <div className='flex flex-col gap-2 p-4 border-t border-stone-100 md:hidden'>
          <Link to={'/'} className='py-2 text-sm font-medium'>Inicio </Link>
          <Link to={'/productos'} className='py-2 text-sm font-medium'>Productos </Link>
        </div>
      )}
    </nav>
  )
}

export default NavBar