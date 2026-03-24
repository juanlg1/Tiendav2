import { useCart } from '@/context/CartContext'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { ShoppingCartIcon, Trash2, ArrowLeft, CreditCard } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { toast } from 'sonner'
import { Spinner } from './ui/spinner'

const Cart = () => {

  const [openDialog, setOpenDialog] = useState(false)
  const [paying, setPaying] = useState(false)
  const { cart, updateQty, total, removeItem, emptyCart } = useCart()
  const navigate = useNavigate()

  const handlePay = async () => {
    try {
      setPaying(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      emptyCart()
      setOpenDialog(false)
      toast.success('Pago realizado con éxito 🎉')
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Ocurrió un error al procesar el pago')
    } finally {
      setPaying(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className='min-h-[70vh] flex flex-col items-center justify-center p-6'>
        <div className='bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center max-w-lg w-full text-center'>
          <div className='w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6'>
            <ShoppingCartIcon size={48} className='text-slate-300' />
          </div>
          <h2 className='text-3xl font-bold text-slate-900 mb-2'>Tu carrito está vacío</h2>
          <p className='text-slate-500 mb-8'>Parece que aún no has añadido nada a tu bolsa.</p>
          <Button onClick={() => navigate('/productos')} size="lg" className='w-full rounded-2xl h-14 text-base font-semibold bg-slate-900 text-white hover:bg-indigo-600 transition-colors'>
            Explorar catálogo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen max-w-7xl mx-auto py-8'>

      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100'>
        <div>
          <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>Tu Carrito</h1>
          <p className='text-base text-slate-500 mt-1'>Tienes {cart.reduce((acc, item) => acc + item.qty, 0)} artículos seleccionados</p>
        </div>
        <Button variant='ghost' onClick={emptyCart} className='text-red-500 hover:text-red-600 hover:bg-red-50 font-medium px-4'>
          <Trash2 className="w-4 h-4 mr-2" /> Vaciar carrito
        </Button>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>

        <div className='flex flex-col gap-4 w-full lg:w-2/3'>
          {cart.map(item => (
            <Card key={item.id} className='flex flex-col sm:flex-row gap-6 items-center p-4 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow'>
              <div className='w-full sm:w-32 h-32 bg-slate-50 rounded-2xl p-4 flex-shrink-0 flex items-center justify-center'>
                <img src={item.image} alt={item.title} className='max-h-full max-w-full object-contain mix-blend-multiply' />
              </div>

              <div className='flex flex-col flex-grow justify-between h-full w-full py-2'>
                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                  <div>
                    <h3 className='font-bold text-lg text-slate-900 line-clamp-2 leading-tight pr-4'>{item.title}</h3>
                    <p className='text-sm text-slate-500 mt-1 capitalize'>{item.category}</p>
                  </div>
                  <p className='text-xl font-extrabold text-slate-900 whitespace-nowrap'>S/. {(item.price * item.qty).toFixed(2)}</p>
                </div>

                <div className='flex items-center justify-between mt-4 sm:mt-6'>
                  <div className='flex items-center bg-slate-50 rounded-xl border border-slate-200 shadow-sm'>
                    <Button onClick={() => updateQty({ product_id: item.id, qty: item.qty - 1 })} variant='ghost' className='h-10 w-10 p-0 rounded-l-xl rounded-r-none hover:bg-slate-200'> - </Button>
                    <span className='w-12 text-center font-semibold text-slate-900'>{item.qty}</span>
                    <Button onClick={() => updateQty({ product_id: item.id, qty: item.qty + 1 })} variant='ghost' className='h-10 w-10 p-0 rounded-r-xl rounded-l-none hover:bg-slate-200'> + </Button>
                  </div>
                  <Button onClick={() => removeItem(item.id)} variant='ghost' className='text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl h-10 w-10 p-0'>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className='w-full lg:w-1/3'>
          <Card className='lg:sticky lg:top-24 p-6 sm:p-8 bg-slate-900 text-white border-transparent rounded-3xl shadow-2xl'>
            <h3 className='text-2xl font-extrabold mb-6 tracking-tight'>Resumen del pedido</h3>

            <div className='flex flex-col gap-4 mb-6 border-b border-slate-700/50 pb-6'>
              {cart.map(item => (
                <div key={item.id} className='flex justify-between items-start gap-4 text-sm'>
                  <p className='text-slate-400 line-clamp-1'>
                    <span className='text-indigo-400 font-medium mr-2'>{item.qty}x</span>
                    {item.title}
                  </p>
                  <span className='font-medium whitespace-nowrap text-slate-300'>S/. {(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className='flex justify-between items-end mb-8'>
              <p className='text-slate-400 text-lg'>Total a pagar</p>
              <p className='text-4xl font-extrabold text-white'>
                <span className='text-xl text-slate-500 font-normal mr-1'>S/.</span>
                {total.toFixed(2)}
              </p>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button className='w-full h-14 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg mb-4 shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-1'>
                  <CreditCard className='mr-2 w-5 h-5' /> Proceder al Pago
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-3xl p-6 border-slate-100 shadow-2xl">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl font-extrabold text-slate-900">Confirmar tu pago</DialogTitle>
                  <DialogDescription className="text-base text-slate-500 mt-2">
                    Estás a punto de procesar el pago por los siguientes artículos de tu carrito.
                  </DialogDescription>
                </DialogHeader>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-h-48 overflow-y-auto mb-4">
                  {cart.map(item => (
                    <div key={item.id} className='flex justify-between py-2 text-sm border-b border-slate-100 last:border-0'>
                      <span className='text-slate-600 line-clamp-1 flex-1 pr-4'><span className='font-bold text-slate-800'>{item.qty}x</span> {item.title}</span>
                      <span className='font-bold text-slate-900 whitespace-nowrap'>S/. {(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className='flex justify-between items-center mb-6 px-2'>
                  <span className='text-lg font-bold text-slate-900'>Total Final:</span>
                  <span className='text-2xl font-extrabold text-indigo-600'>S/. {total.toFixed(2)}</span>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <DialogClose asChild>
                    <Button variant='outline' className="w-full sm:w-auto rounded-xl h-12" disabled={paying}>Cancelar</Button>
                  </DialogClose>
                  <Button onClick={handlePay} disabled={paying} className="w-full sm:w-auto rounded-xl h-12 bg-slate-900 hover:bg-indigo-600">
                    {paying ? (<><Spinner className="mr-2" /> Procesando pago...</>) : 'Confirmar compra'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant='ghost' onClick={() => navigate('/productos')} className='w-full h-12 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors'>
              <ArrowLeft className='mr-2 w-4 h-4' /> Volver a la tienda
            </Button>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Cart