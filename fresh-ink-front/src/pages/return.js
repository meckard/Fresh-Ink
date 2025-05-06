import { useContext, useEffect } from 'react'
import { CartContext } from '../Components/cartContext'

export default function Return() {
  const { cart } = useContext(CartContext)

  const orderId = sessionStorage.getItem('orderId')
  console.log(orderId)

  useEffect(() => {
    const completeOrder = async () => {
      const response = await fetch(
        `https://localhost:3003/orders/complete_order`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify JSON format
          },
          body: JSON.stringify({
            orderId: orderId,
          }),
        },
      )
      const result = await response
      console.log(result)
    }

    completeOrder()
    sessionStorage.removeItem('orderId') // Clear order ID from session storage
  }, [cart.orderId])

  return (
    <div className="payment-return">
      <h1>Nice one!</h1>
      <h2>Your order is complete</h2>
      <p>We will be sending your stuff shortly!</p>
    </div>
  )
}
