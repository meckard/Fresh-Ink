import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'

export default function GoogleSignInButton() {
  let navigate = useNavigate()

  const handleGoogleLogin = async (response) => {
    try {
      const request = await fetch('https://localhost:3003/google/jwt', {
        method: 'POST', // POST request
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
        },
        body: JSON.stringify(response), // Convert data to JSON string
      })

      const result = await request // Parse JSON response from server
      console.log('Success:', result)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const errorMessage = (error) => {
    console.log(error)
  }
  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      <GoogleLogin onSuccess={handleGoogleLogin} onError={errorMessage} />
    </div>
  )
}
