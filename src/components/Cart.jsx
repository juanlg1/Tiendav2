import { useCart } from '@/context/CartContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card } from './ui/card'

const Cart = () => {

  const navigate = useNavigate()
  const { cart, updateQty, total, removeItem, emptyCart } = useCart()

  return (
    <div className='h-screen flex flex-col max-w-5xl mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h2 className='text-2xl font-semibold'>Carrito de compras</h2>
          <p className='text-sm text-slate-500'>Verifica los productos agregados</p>
        </div>
        <Button variant='destructive' onClick={emptyCart}>Vaciar carrito</Button>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='flex flex-col gap-4 w-full'>
          {cart.map(item => (
            <Card key={item.id} className='flex-row gap-4 items-center px-4'>
              <img src={item.image} alt={item.title} className='h-16 w-16' />
              <div className='flex flex-col gap-2'>
                <p className='font-semibold'>{item.title}</p>
                <p className='text-sm text-slate-500'>S/. {item.price}</p>
                <div className='flex items-center gap-2'>
                  <Button onClick={() => updateQty({ product_id: item.id, qty: item.qty - 1 })} variant='outline' size='sm'> - </Button>
                  <span>{item.qty}</span>
                  <Button onClick={() => updateQty({ product_id: item.id, qty: item.qty + 1 })} variant='outline' size='sm'> + </Button>
                  <Button onClick={() => removeItem(item.id)} variant='destructive' size='sm'> Eliminar </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card className='px-4 gap-2'>
          <h3 className='text-xl font-semibold'>Resumen del pedido</h3>
          {cart.map(item => (
            <p key={item.id} className='text-sm'> {item.title} x {item.qty} </p>
          ))}
          <hr />
          <p className='text-lg font-semibold'>Total: S/. {total}</p>
          <Button>Pagar</Button>
          <Button onClick={() => navigate('/productos')}>Seguir comprando</Button>
        </Card>

      </div>
    </div>
  )
}

export default Cart