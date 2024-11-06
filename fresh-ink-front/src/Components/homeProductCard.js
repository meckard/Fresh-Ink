import { useState, useEffect } from "react"

export default async function HomeCard() {
const [products, setProducts] = useState('')

const getProducts = async () => {
  try {
    const response = await fetch('http://localhost:3003/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Specify JSON format
      },
    })

    const result = await response
    console.log('Success:', result)
    setProducts(result)
  } catch (error) {
    console.error('Error:', error)
  }
}

useEffect(() => {
    getProducts()
  }, [])


  return (
    <div className="productlist">
      <h2>Products</h2>
      {products ? (
        <div>
          <h3>{products.name}</h3>
          <p>{products.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
