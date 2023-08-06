import './App.css'
import HomeContent from './Components/HomeContent'
import Navbar from './Components/Navbar'
import Register from './Components/LogRegesForms/Register'
import UserLogin from './Components/LogRegesForms/UserLogin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductView from './Components/Products/ProductView'
import ProductList from './Components/Products/ProductList'
import ProductCreate from './Components/Products/ProductCreation'
import Footer from './Components/Footer'
import UserCart from './Components/UserData/UserCart'
import UserProfile from './Components/UserData/UserProfile'
import About from './Components/About'
import ProductQuickView from './Components/Products/ProductQuickView'
import OrderList from './Components/Orders/orderList'
import OrderFilledForm from './Components/Orders/orderFilledForm'
import OrderCardPayment from './Components/Orders/orderCardPayment'
import ConfirmPayment from './Components/Orders/confirmPayment'

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
            <Route path='/UserCart/' element={<UserCart/>}/>
            <Route path='/UserProfile' element={<UserProfile/>}/>
            <Route path='/Orders' element={<OrderList/>}/>
            <Route path='/orderFilledForm' element={<OrderFilledForm/>}/>
            <Route path='/OrderCardPayment/:amount' element={<OrderCardPayment/>}/>
            <Route path='/Confirmation' element={<ConfirmPayment/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App