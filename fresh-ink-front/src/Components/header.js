import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './authContext'
import { CartContext } from './cartContext'

const Header = () => {
  const { user, setUser } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const logout = async () => {
    const response = await fetch('https://localhost:3003/auth/logout', {
      method: 'POST', // POST request
      credentials: 'include',
    })

    if (response) {
      setUser(null)
    }
  }

  const checkSession = async () => {
    const res = await fetch('https://localhost:3003/auth/check-session', {
      credentials: 'include',
    })
    const data = await res.json()
    console.log('Session Check:', data)
  }

  checkSession()

  return (
    <header>
      <nav>
        <ul className="link-list">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link>About Us</Link>
          </li>
        </ul>
        <div className="nav-user">
          <div className="nav-profile">
            {user ? (
              <Link to={`/profile/${user.id}`}>Profile</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
            {user ? (
              <button className="nav-logout" onClick={logout}>
                Logout
              </button>
            ) : (
              ''
            )}
          </div>
          <Link to="/checkout" className="nav-cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M351.9 329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z"
                data-name="Shopping Cart"
              />
            </svg>
            <div className="nav-cart-number">
              <p>{cart.itemsInCart}</p>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
