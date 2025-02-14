import React, { createContext, useEffect, useState } from 'react'

// Create the AuthContext
export const CartContext = createContext()

// AuthProvider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    products: [null],
    itemsInCart: 0,
    id: null,
  }) // Stores user data
  const [loading, setLoading] = useState(true) // Tracks loading state

  useEffect(() => {
    const checkCartStatus = async () => {
      const response = await fetch('https://localhost:3003/cart/my_cart',{
        credentials: 'include'
      })
      if (response.ok) {
        const data = await response
        console.log(data)
      }
    }

    checkCartStatus()
  }, [])

  // AuthContext provides the user state and setUser method
  return (
    <CartContext.Provider value={{ cart, setCart, loading }}>
      {children}
    </CartContext.Provider>
  )
}
