import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FacebookSignInButton() {
  let navigate = useNavigate()

  const handleFacebookLogin = async (response) => {
    console.log(response)
    try {
      const request = await fetch('https://localhost:3003/facebook', {
        method: 'GET', // POST request
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
    <div className='facebook-button'>
      <button width='200px' onClick={handleFacebookLogin} onError={errorMessage} />
    </div>
  )
}