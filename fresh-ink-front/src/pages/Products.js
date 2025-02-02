import { useEffect, useState } from 'react'
import comingSoon from '../Assets/Images/comingsoon.jpg'

export default function Products() {
  const [products, setProducts] = useState('')

  const getProducts = async () => {
    try {
      const response = await fetch('https://localhost:3003/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
        },
      })

      const result = await response.json()
      console.log('Success:', result)
      setProducts(result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  console.log(products)

  return (
    <div className="product-list">
      <h1>Products</h1>
      <section className="card-list">
        {products ? (
          products.map((product) => {
            return (
              <article className="product-card">
                <img src={comingSoon} alt="product" />
                <h2 className='product-name'>{product.name}</h2>
                <p className="price">{`$${product.price}`}</p>
              </article>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  )
}
