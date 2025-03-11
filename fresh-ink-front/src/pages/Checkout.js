import { CartContext } from '../Components/cartContext'
import { useContext, useEffect, useState } from 'react'

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext)
  const [cartItems, setCartItems] = useState()
  const getProduct = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:3003/products/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // Specify JSON format
          },
        },
      )

      const result = await response.json()
      return result[0]
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    const getCartItems = async () => {
        const items = await Promise.all(cart.products.map(async (line) => {
            return await getProduct(line); // Ensure it's awaited
        }));

        setCartItems(items); // Set all fetched products at once
    };

    getCartItems();
}, []);

  console.log(cartItems)

  console.log(cart)
  return (
    <div>
      <h1>Checkout</h1>
      { cartItems ? (
        cartItems.map((item) => {
          return (
            <div className='line-item'>
            <p>{item.name}</p>
            <p>{item.price}</p>
            </div>
          )
        })
      ) : (
        <p>no item in cart</p>
      ) }
    </div>
  )
}
