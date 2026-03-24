/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('prod-cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('prod-cart', JSON.stringify(cart))
  }, [cart])

  const addProductCart = (product) => {
    try {
      setCart(prevCart => {
        const existingProduct = prevCart.find(item => item.id === product.id)
        if (existingProduct) {
          return prevCart.map(item =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          )
        } else {
          return [...prevCart, { ...product, qty: 1 }]
        }
      })
      toast.success('Agregado al carrito')
    } catch (error) {
      console.log(error)
    }
  }

  const removeItem = (itemId) => {
    setCart(prev => {
      const deleted = prev.filter(item => item.id !== itemId)
      return deleted
    }
    )
  }

  const updateQty = ({ product_id, qty }) => {
    try {
      if (qty < 1) return
      setCart(prevCart => {
        const newItems = prevCart.map(item => item.id === product_id ? { ...item, qty } : item)
        return newItems
      }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const emptyCart = () => {
    localStorage.removeItem('prod-cart')
    setCart([])
    toast.success('Carrito vaciado')
  }

  const total = cart.reduce((val, acc) => val + acc.price * acc.qty, 0)
  const count = cart.reduce((val, acc) => val + acc.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addProductCart, updateQty, removeItem, total, emptyCart, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)