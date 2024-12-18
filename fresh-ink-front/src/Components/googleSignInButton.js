import React from 'react'
import { GoogleLogin } from '@react-oauth/google'

export default function GoogleSignInButton() {
  const handleGoogleLogin = () => {
    window.location.href = 'https://localhost:3003/auth/google'
  }

  const errorMessage = (error) => {
    console.log(error)
  }
  return (
    <div id="google-button">
      <GoogleLogin
        width="200px"
        onSuccess={handleGoogleLogin}
        onError={errorMessage}
      />
    </div>
  )
}
