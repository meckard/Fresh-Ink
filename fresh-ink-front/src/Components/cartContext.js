import React, { createContext, useState } from 'react'

// Create the AuthContext
export const CartContext = createContext()

// AuthProvider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    products:[null],
    itemsInCart: 0,
    id: null
  }) // Stores user data
  const [loading, setLoading] = useState(true) // Tracks loading state

  // AuthContext provides the user state and setUser method
  return (
    <CartContext.Provider value={{ cart, setCart, loading }}>
      {children}
    </CartContext.Provider>
  )
}
