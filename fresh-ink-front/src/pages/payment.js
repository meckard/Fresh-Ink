import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState, useEffect, useMemo } from 'react'

const stripePromise = loadStripe(
  'pk_test_51R6LPsB3ds8m2oajBJxP8y7LQ2pI52qdYDkh9MGy6OqJYo3CO4XS8OhmIiIGvYdqpuLcdKYfoHgJB9LKy3YB1CiR00rK2AEhml',
)

export default function Payment() {
  const [clientSecretState, setClientSecretState] = useState(null)

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch(
        'https://localhost:3003/orders/create-checkout-session',
        {
          method: 'POST',
          credentials: 'include', // optional, in case you're using cookies
        },
      )

      if (!res.ok) {
        throw new Error('Failed to fetch client secret')
      }

      const { client_secret: clientSecret } = await res.json()
      console.log('Client Secret:', clientSecret)
      setClientSecretState(clientSecret)
    }

    fetchClientSecret()
  }, [])

  const options = useMemo(() => {
    return clientSecretState ? { clientSecret: clientSecretState } : null
  }, [clientSecretState])

  if (!clientSecretState) return <div>Loading checkout...</div>

  if (!options) {
    console.error('Options are invalid:', options)
    return <div>Error loading checkout. Please try again later.</div>
  }

  return (
    <div className="payment">
      <h1 className="payment-h1">Give me those deets!</h1>
      <div className="payment-container">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout id="stripe-component" />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  )
}
