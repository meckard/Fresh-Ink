import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate()
  const loginForm = document.forms.loginForm
  const formData = new FormData(loginForm)

  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      console.log('User is logged in and authenticated:', response)
      // You can access the user ID and access token here
      console.log('Access Token:', response.authResponse.accessToken)
    } else if (response.status === 'not_authorized') {
      console.log('User is logged into Facebook but not authorized your app.')
    } else {
      console.log('User is not logged into Facebook.')
    }
  }

  useEffect(() => {
    // Load the Facebook SDK script if not already loaded
    if (!window.FB) {
      ;(function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
    }

    // Initialize the SDK once it's loaded
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1654648575100097', // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v21.0',
      })

      // Check login status after initialization
      window.FB.getLoginStatus(function (response) {
        statusChangeCallback(response) // Replace or define this function
        console.log(response)
      })
    }
  })

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
      navigate('/')
    } catch (error) {
      console.error('Error:', error)
    }

    setEmail('')
    setPassword('')
  }

  const handleFacebookLogin = () => {
    window.FB.login(
      function (response) {
        if (response.status === 'connected') {
          console.log('Logged in:', response)
          // Handle success
        } else {
          console.log('User not authenticated:', response)
          // Handle failure
        }
      },
      { scope: 'public_profile,email' }, // Request specific permissions
    )
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
        <button onClick={handleFacebookLogin}>Login with Facebook</button>
      </div>
    </div>
  )
}
