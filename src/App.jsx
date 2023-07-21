import './App.css'
import HomeContent from './Components/HomeContent'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import UserLogin from './Components/UserLogin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductView from './Components/ProductView'
import ProductList from './Components/ProductList'
// import Footer from './Components/Footer'
import About from './Components/About'

function App() {

  return (
    <>
      <div className="relative isolate overflow-hidden bg-white">
        <BrowserRouter>
          <Routes>
            <Route index element={<HomeContent/>} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/About" element={<About/>} />
            <Route path="/ProductView" element={<ProductView />} />
            <Route path="/Products" element={<ProductList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App