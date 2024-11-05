import logo from '../Assets/Images/Hero-logo-transparent.png'

export default function Home() {
  return (
    <div className="home-page">
      <div className="banner">
        <img
          src={logo}
          className='hero'
          alt="Fresh Ink logo with a sparrow and traditional tattoo flowers"
        />
          <h2>
            The Sickest Tattoo Merch
          </h2>
      </div>
    </div>
  )
}
