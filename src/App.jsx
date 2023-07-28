import ProductQuickView from './Components/ProductQuickView'
import './App.css'
import HomeContent from './Components/HomeContent'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import UserLogin from './Components/UserLogin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductView from './Components/ProductView'
import ProductList from './Components/ProductList'
import ProductCreate from './Components/ProductCreation'
import Footer from './Components/Footer'

// import Footer from './Components/Footer'
import About from './Components/About'

function App() {

  return (
    <>
      <div className="overflow-show bg-white">
        <BrowserRouter>
          <Routes>
            <Route index element={<HomeContent/>} />
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/About" element={<About/>} />
            <Route path="/ProductView/:productId" element={<ProductView />} />
            <Route path="/Products" element={<ProductList />} />
            <Route path="/ProductQuickView/:productId" element={<ProductQuickView />} />
            <Route path="/ProductCreate" element={<ProductCreate />} />
            <Route path='/Footer' element={<Footer />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App