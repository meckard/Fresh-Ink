import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleSignInButton from '../Components/googleSignInButton'
import FacebookSignInButton from '../Components/facebookSignInButton'
import { AuthContext } from '../Components/authContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser} = useContext(AuthContext)
  let navigate = useNavigate()

  const emailField = (e) => {
    setEmail(e.target.value)
  }

  const passwordField = (e) => {
    setPassword(e.target.value)
  }
/* 
  const sensitiveTest = async () => {
    const response = await fetch('https://localhost:3003/auth/status', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://localhost:3000/',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    }) // Include session cookies
    console.log('test response' ,response)
    if (response.ok) {
      const data = await response.json()
      console.log('yeh', data)
    } else {
      console.log('naw')
    }
  } */

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const loginForm = document.querySelector('#loginForm')
      const formData = new FormData(loginForm)

      const response = await fetch('https://localhost:3003/auth/login', {
        method: 'POST', // POST request
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:3000/',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(Object.fromEntries(formData)), // Convert data to JSON string
        credentials: 'include',
      })

      const result = await response.json() // Parse JSON response from server
      console.log('result', result)
      if (result) {
        console.log('Success:', result)
        setUser(result)

        // navigate('/')
      }
    } catch (error) {
      console.error('Error:', error)
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className="login">
      <div className="login-card">
        <form name="loginForm" id="loginForm" onSubmit={handleSubmit}>
          <div className="inputs">
            <h2>Login</h2>
            <label for="email">Email</label>
            <input
              className="email"
              type="email"
              onChange={emailField}
              id="email"
              value={email}
              name="email"
              required
              minLength="5"
              maxLength="20"
              size="22"
            />
            <label for="password">Password</label>
            <input
              className="password"
              onChange={passwordField}
              value={password}
              type="password"
              id="password"
              name="password"
              required
              minLength="5"
              maxLength="20"
              size="22"
            />
            <input type="submit" className="submit" value="I'm Back" />
          </div>
        </form>
      </div>
      <div className="social-login">
        <FacebookSignInButton />
        <GoogleSignInButton />
      </div>
    </div>
  )
}
