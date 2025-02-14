import { useContext, useEffect, useState } from 'react'
import comingSoon from '../Assets/Images/comingsoon.jpg'
import { CartContext } from '../Components/cartContext'

export default function ProductPage() {
  const [product, setProduct] = useState('')
  const searchParams = new URLSearchParams(window.location.search)
  const idParam = searchParams.get('productId')
  const productRes = product[0]
  const { cart, setCart } = useContext(CartContext)
  console.log(product)
  console.log(cart)

  const getProduct = async () => {
    try {
      const response = await fetch(
        `https://localhost:3003/products/${idParam}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // Specify JSON format
          },
        },
      )

      const result = await response.json()
      console.log('Success:', result)
      setProduct(result)
    } catch (error) {
      console.error('Error:', error)
    }
  }


  const addToCart = async () => {
    const response = await fetch('https://localhost:3003/cart/my_cart/add_item',
        {
            method: 'Post',
            headers: {
              'Content-Type': 'application/json', // Specify JSON format
            },
            body:JSON.stringify({ productId: product[0].id }),
            credentials: 'include'
          },
    )
    const result = await response.text()
    console.log(result)
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <section className="product-page">
      <div className="main-content">
        <img
          className="product-image"
          src={comingSoon}
          alt="a coming soon sign"
        />
        <aside className="price-box">
          <h1 class className="product-page-name">
            {productRes?.name}
          </h1>
          <h2 className="product-price">{`$${productRes?.price}.00`}</h2>
          <button onClick={addToCart} className="add-to-cart-button">Add to cart</button>
        </aside>
      </div>
      <div className="info-panel">
        <span className='info-text'>
          <h3>Details</h3>
          <p>some info here</p>
        </span>
      </div>
    </section>
  )
}
