import React from 'react'
import facebookIcon from '../Assets/Facebook_Logo_Primary.png'

export default function FacebookSignInButton() {

  return (
    <a className='facebook-button' href="https://localhost:3003/auth/facebook">
      <img className='facebook-icon' src={facebookIcon} alt='Facebook logo'/>
      <div>Login with Facebook</div>
    </a>
  )
}
