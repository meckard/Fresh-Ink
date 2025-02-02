import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './authContext'

const Header = () => {
  const { user, setUser } = useContext(AuthContext)
  const logout = async () => {
    const response = await fetch('https://localhost:3003/auth/logout', {
      method: 'POST',
    })

    if (response) {
      console.log('logged out')
      setUser(null)
    }
  }

  return (
    <header>
      <nav>
        <ul className="link-list">
          <li className="link">
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
          <li>
            <Link>About Us</Link>
          </li>
        </ul>
        <div className="nav-user">
          <div>
            { user ? `hello ${user.email}`: <Link to='/login'>Login</Link>  }
            { user ? <button onClick={logout}>logout</button> : ''}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
