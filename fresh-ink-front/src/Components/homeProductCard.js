import { useState, useEffect } from 'react'

export default function HomeCard() {
  const [products, setProducts] = useState('')

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3003/products', {
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
    <div className="productlist">
      <h2>Products</h2>
      {products ? products.map((product) => {
        return(
        <div>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      )}) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
