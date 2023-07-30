
import Footer from './Footer'
import Navbar from './Navbar'


export default function ABout() {
  return (
    <>
    <div className='w-full'>
      <Navbar />
      <div className=" bg-gray-900 py-24 sm:py-32 aboutBag">       
        <div className="mx-auto  px-6 lg:px-8 max-w-full">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-sky-800 sm:text-6xl">WelCome To Shopping Cart</h2>         
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            </dl>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    </>
  )
}
