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
import Root from './Routes/root'
import { AuthProvider } from './Components/authContext'
import SensitivePage from './pages/aSensitivePage'
import ProtectedRoute from './Components/protectedRoute'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import { CartProvider } from './Components/cartContext'
import Checkout from './pages/Checkout'
import Payment from './pages/payment'
import CheckoutForm from './pages/CheckoutForm'
import Return from './pages/return'
import Profile from './pages/profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
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
      {
        path: '/sensitivepage',
        element: (
          <ProtectedRoute>
            <SensitivePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/:id',
        element: <ProductPage />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/checkout/form',
        element: <CheckoutForm />,
      },
      {
        path: '/payment',
        element: <Payment/>
      },
      {
        path: '/return',
        element: <Return/>
      },
      {
        path: '/profile/:userId',
        element: <Profile/>
      }
    ],
  },
])
const clientId = process.env.GOOGLE_CLIENT_ID 

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </CartProvider>
    </AuthProvider>
  </GoogleOAuthProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
