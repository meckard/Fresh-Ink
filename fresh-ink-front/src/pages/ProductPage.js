import { useEffect, useState } from 'react'
import comingSoon from '../Assets/Images/comingsoon.jpg'

export default function ProductPage() {
  const [product, setProduct] = useState('')
  const searchParams = new URLSearchParams(window.location.search)
  const idParam = searchParams.get('productId')
  const productRes = product[0]
  console.log(product)

  const getProducts = async () => {
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

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <section className='product-page'>
      <h1 class className="product-page-name">
        {productRes?.name}
      </h1>
      <div className="main-content">
        <img className='product-image' src={comingSoon} alt="a coming soon sign" />
        <aside className='price-box'>
          <h2>{`$${productRes?.price}.00`}</h2>
        </aside>
      </div>
    </section>
  )
}
