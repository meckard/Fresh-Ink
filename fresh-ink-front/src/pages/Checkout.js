import { CartContext } from '../Components/cartContext'
import { useContext, useEffect, useState } from 'react'

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext)
  const [cartItems, setCartItems] = useState()
  let total = 0
  const getProduct = async (id) => {
    try {
      const response = await fetch(`https://localhost:3003/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
        },
      })

      const result = await response.json()
      return result[0]
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    const getCartItems = async () => {
      const items = await Promise.all(
        cart.products.map(async (line) => {
          return await getProduct(line) // Ensure it's awaited
        }),
      )

      setCartItems(items) // Set all fetched products at once
    }

    getCartItems()
  }, [])

  const getTotal = async () => {
    for (let i = 0; i < cartItems.length; i++) {
     total += cartItems[i].price
    }
  }

  if(cartItems) {
  getTotal()
  }

  console.log(cartItems)

  console.log(cart)
  return (
    <div className="checkout">
      <h1 className="checkout-h1">Checkout</h1>
      <div className="labels">
        <h2>Name</h2>
        <h2>Price</h2>
      </div>
      <div className="line-items">
        {cartItems ? (
          cartItems.map((item) => {
            return (
              <div className="line-item">
                <p>{item.name}</p>
                <p>{item.price}</p>
              </div>
            )
          })
        ) : (
          <p>no item in cart</p>
        )}
      </div>
      <div className="total">
        <div className='total-label'>Total</div>
        <div className='total-number'>{total}</div>
      </div>
    </div>
  )
}
