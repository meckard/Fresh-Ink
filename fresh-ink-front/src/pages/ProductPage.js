import { useEffect, useState } from 'react'

export default function ProductPage () {

const [product, setProducts] = useState('')
const searchParams = new URLSearchParams(window.location.search);
const idParam = searchParams.get('productId')




const getProducts = async () => {
  try {
    const response = await fetch(`https://localhost:3003/products/${idParam}`, {
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

}