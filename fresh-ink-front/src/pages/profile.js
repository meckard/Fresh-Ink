import { useContext, useState } from "react"
import { AuthContext } from "../Components/authContext"

export default function Profile() {
const { user } = useContext(AuthContext)
const {orders, setOrders} = useState()

  const getUserOrders = async () => {
    try {
      const response = await fetch('https://localhost:3003/users/my_orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Specify JSON format
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: user.id,
        }),
      })

      const result = await response.json()
      setOrders(result)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="profile">
        <h1 className="profile-h1">Welcome to your Profile</h1>
        <section className="profile-section">
            <h2 className="profile-h2">Your Details</h2>
            <p className="profile-p">Name: {user.first_name} {user.last_name}</p>
            <p className="profile-p">Email: {user.email}</p>
        </section>
    </div>
  )
}