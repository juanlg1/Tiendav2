import { useCart } from '@/context/CartContext'
import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { ShoppingBag, ShoppingCartIcon, Trash2 } from 'lucide-react'
import { Card } from './ui/card'
import { useNavigate } from 'react-router-dom'

const CartSheet = () => {

  const { cart, updateQty, total, removeItem, emptyCart, count } = useCart()
  const navigate = useNavigate()

  return (
    <>
      <Sheet>
        <SheetTrigger asChild className='relative'>
          <Button>
            <ShoppingCartIcon />
            {count > 0 && <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-2'> {count} </span>}
          </Button>
        </SheetTrigger>
        <SheetContent className='data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]'>
          <SheetHeader>
            <SheetTitle>Carrito</SheetTitle>
            {
              cart.length > 0 && (
                <SheetDescription className='flex justify-end mt-2'>
                  <Button variant='destructive' size='sm' onClick={emptyCart}>
                    <ShoppingBag /> Vaciar Carrito
                  </Button>
                </SheetDescription>
              )
            }
          </SheetHeader>
          {cart.length === 0 ? <div className='h-screen flex flex-col items-center gap-3'>
            <ShoppingBag />
            <p>¡El carrito esta vacio!</p>
            <span>Agrega productos para continuar</span>
          </div> :
            <div className='no-scrollbar overflow-y-auto'>
              {cart.map(item =>
                <Card key={item.id} className="px-2 mx-2 my-2">
                  <div className='flex gap-4 items-center'>
                    <img src={item.image} alt={item.title} className='h-10 w-10 min-w-10' />
                    <div className='text-xs w-full'>
                      <p className='mb-2'> {item.title} </p>
                      <div className='flex justify-between items-center'>
                        <div className='flex gap-2 items-center '>
                          <Button size='xs' variant='outline' disabled={item.qty <= 1} onClick={() => updateQty({ product_id: item.id, qty: item.qty - 1 })} > - </Button>
                          <span>{item.qty} </span>
                          <Button size='xs' variant='outline' onClick={() => updateQty({ product_id: item.id, qty: item.qty + 1 })}> + </Button>
                          <Button size='sm' variant='destructive' onClick={() => removeItem(item.id)} > <Trash2 /> </Button>
                        </div>
                        <span className='font-semibold mr-4'>S/. {item.price} </span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
              <SheetFooter>
                <span className='font-medium'>Total: S/. {total.toFixed(2)} </span>
                <Button onClick={() => navigate('/cart')}>Proceder al pago</Button>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </div>
          }
        </SheetContent>
      </Sheet>
    </>
  )
}

export default CartSheet