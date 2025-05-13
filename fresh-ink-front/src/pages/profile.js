import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Components/authContext'

export default function Profile() {
  const { user } = useContext(AuthContext)
  const [ orders, setOrders ] = useState([])

  console.log(user)

  useEffect(() => {
    const getUserOrders = async (userId) => {
      try {
        const response = await fetch(
          `https://localhost:3003/orders/my_orders/${userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', // Specify JSON format
            },
            credentials: 'include',
          },
        )

        const result = await response.json()
        console.log(result[0])
        setOrders(result) // Set the orders state with the fetched data
      } catch (error) {
        console.error('Error:', error)
      }
    }

    if (user) {
      getUserOrders(user.id)
    }
  }, [])

  console.log(orders)

  return (
    <div className="profile">
      <h1 className="profile-h1">Welcome to your Profile</h1>
      {user ? (
        <section className="profile-section">
          <h2 className="profile-h2">Your Details</h2>
          {/* {user.first_name= !null ? <p className="profile-p">Name: {user.first_name} {user.last_name}</p> : <p></p>} */}
          <p className="profile-p">Email: {user.email}</p>
        </section>
      ) : (
        <p>loading</p>
      )}

      <div className="orders">
        <h2 className="profile-h2">Your Orders</h2>
        {orders ? (
          orders.map((order) => (
            <div key={order.id} className="order">
              <p>Order ID: {order.id}</p>
              <p>Total: ${order.total}</p>
              <p>Order Status: {order.status}</p>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  )
}
