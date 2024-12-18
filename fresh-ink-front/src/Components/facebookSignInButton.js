import React from 'react'

export default function FacebookSignInButton() {

  const handleFacebookLogin = () => {
    window.location.href = 'https://localhost:3003/auth/facebook'
  }

  const errorMessage = (error) => {
    console.log(error)
  }
  return (
    <div className="facebook-button">
      <button
        width="200px"
        onClick={handleFacebookLogin}
        onError={errorMessage}
      />
    </div>
  )
}
