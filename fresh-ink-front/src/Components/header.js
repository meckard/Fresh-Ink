import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="link-list">
          <li className="link"><Link>Home</Link></li>
          <li><Link>Products</Link></li>
          <li><Link>About Us</Link></li>
        </ul>
        <div className="nav-user">
            
        </div>
      </nav>
    </header>
  )
}

export default Header
