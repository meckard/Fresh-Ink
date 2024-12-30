import { useState } from 'react'

export default function Registration() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const regForm = document.forms.regForm
  const formData = new FormData(regForm)
  console.log(Object.fromEntries(formData))

  const emailField = (e) => {
    setEmail(e.target.value)
  }

  const passwordField = (e) => {
    setPassword(e.target.value)
  }
  /* const data = {
    email: Object.fromEntries(email),

    password: Object.fromEntries(password)
  } */

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('https://localhost:3003/auth/register', {
        method: 'POST', // POST request
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
        },
        body: JSON.stringify(Object.fromEntries(formData)), // Convert data to JSON string
      })

      const result = await response // Parse JSON response from server
      console.log('Success:', result)
    } catch (error) {
      console.error('Error:', error)
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className="registration">
      <form id="regForm" onSubmit={handleSubmit}>
        <div className="inputs">
          <h2>Register Here</h2>
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
          <input type="submit" className="submit" value="Join the Gang" />
        </div>
      </form>
    </div>
  )
}
