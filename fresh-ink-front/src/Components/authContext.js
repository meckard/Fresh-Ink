import React, { createContext, useState, useEffect } from 'react'

// Create the AuthContext
export const AuthContext = createContext()

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // Stores user data
  const [loading, setLoading] = useState(true) // Tracks loading state

  // Check authentication status when the app loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('https://localhost:3003/auth/status', {
          credentials: 'include',
        }) // Include session cookies
        if (response.ok) {
          const data = await response.json()
          setUser(data.user) // Set authenticated user
        } else {
          setUser(null) // User not authenticated
        }
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false) // Stop loading
      }
    }

    checkAuthStatus()
  }, [])

  // AuthContext provides the user state and setUser method
  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
