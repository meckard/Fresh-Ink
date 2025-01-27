import React from 'react'

export default function FacebookSignInButton() {
  const handleFacebookLogin = async () => {
    const response = await fetch('https://localhost:3003/auth/facebook', {
      method: 'GET', // POST request
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:3000/',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    })
    console.log(response)
    return response
  }

  const errorMessage = (error) => {
    console.log(error)
  }
  return (
    <div className="facebook-button">
      <a href="https://localhost:3003/auth/facebook">facebook</a>
    </div>
  )
}
