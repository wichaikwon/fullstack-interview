'use client'
import { createContext, useContext, useState } from 'react'
import { useSessionStorage } from 'usehooks-ts'

interface Cart {
  id: number
  title: string
  description: string
  price: number
  quantity: number
}
interface CartContextType {
  cart: Cart[]
  addToCart: (item: Cart) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  totalPrice: number
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  totalPrice: 0,
})

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const [cart,setCart] = useSessionStorage<Cart[]>('cart', [])

  const addToCart = (item: Cart) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prev, { ...item, quantity: 1 }]
      }
    })
  }

  const increaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }
  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 })
          }
        } else {
          acc.push(item)
        }
        return acc
      }, [] as Cart[])
    )
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        totalPrice: cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
