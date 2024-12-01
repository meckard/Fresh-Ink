import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Registration from './pages/registration'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Login from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])
const clientId = process.env.GOOGLE_CLIENT_ID

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </GoogleOAuthProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
