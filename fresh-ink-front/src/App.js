import './App.css'
import Header from './Components/header'
import Home from './pages/Home'
import Login from './pages/login'
import Registration from './pages/registration'

function App() {
  

  return (
    <div className="App">
      <Header />
      <Home/>
      <Registration/>
      <Login/>
    </div>
  )
}

export default App
