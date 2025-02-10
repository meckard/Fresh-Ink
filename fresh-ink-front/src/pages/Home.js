import logo from '../Assets/Images/Hero-logo-outside-transparent.png'
import HomeCard from '../Components/homeProductCard'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../Components/authContext';

export default function Home() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await fetch('https://localhost:3003/auth/status', {
        credentials: 'include',
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    }
    checkAuthStatus()
  }, [])

  return (
    <div className="home-page">
      <div className="banner">
        <img
          src={logo}
          className="hero"
          alt="Fresh Ink logo with a sparrow and traditional tattoo flowers"
        />
        <h2>The Sickest Tattoo Merch</h2>
      </div>
      <div>
        <HomeCard />
      </div>
    </div>
  )
}
