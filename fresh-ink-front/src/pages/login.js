import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate()
  const loginForm = document.forms.loginForm
  const formData = new FormData(loginForm)

  const emailField = (e) => {
    setEmail(e.target.value)
  }

  const passwordField = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

     try {
      const response = await fetch('http://localhost:3003/auth/login', {
        method: 'POST', // POST request
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
        },
        body: JSON.stringify(Object.fromEntries(formData)), // Convert data to JSON string
      })

      const result = await response // Parse JSON response from server
      console.log('Success:', result)
      navigate("/")
    } catch (error) {
      console.error('Error:', error)
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className="login">
      <div className="login-card">
        <form name='loginForm' id="loginForm" onSubmit={handleSubmit}>
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
      <div className='social-login'>
        <button className='facebook-button' href='/auth/facebook'>Facebook</button>
      </div>
    </div>
  )
}
