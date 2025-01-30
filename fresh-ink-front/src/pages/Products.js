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
      <h2>Products</h2>
      <div className="card-list">
        {products ? (
          products.map((product) => {
            return (
              <div className="product-card">
                <img src={comingSoon} alt="product" />
                <h3>{product.name}</h3>
                <p className="price">{`$${product.price}`}</p>
              </div>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}
