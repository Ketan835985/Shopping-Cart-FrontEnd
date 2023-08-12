/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function orderHistory() {
  const [orderData, setOrderData] = useState({})
  const [orderItems, setOrderItems] = useState([])
  const { orderId } = useParams("orderID")
  const userId = localStorage.getItem('userId')

  const orderCancelation = async () => {
    const response = await fetch(`http://localhost:3000/users/${userId}/orders`, {
      method: 'PUT',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderId: orderId, status: 'cancled' })
    })
    const data = await response.json()
    return await data
  }
  const orderDataDetails = async () => {
    const response = await fetch(`http://localhost:3000/${userId}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
    const data = await response.json()
    return await data
  }
  const handelCancelButton = () => {
    orderCancelation().then((data) => {
      if (data.status == true) {
        toast.error("Order Cancled")
        setOrderData(data.data)
      }
    })
  }
  // console.log( orderDataDetails())
  useEffect(() => {
    orderDataDetails().then((data) => {
      if (data.status == true) {
        setOrderData(data.data)
        setOrderItems(data.data.items)
      }
    })
  }, [])
  // console.log(orderItems)
  return (
    <div>
      <div>
        <Navbar />
        <div className="container mx-auto mt-10">
          <div className="flex shadow-md my-8 mx-12 shadow-slate-500">
            <div className="w-3/4 bg-white p-20 ">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <span className='flex items-center'>Status :<h2 className={(orderData.status == "cancled") ? "bg-red-500 rounded" : (orderData.status == "completed") ? "bg-green-500 rounded" : "bg-gray-500 rounded"}>{orderData.status}</h2></span>
                <h2 className="font-semibold text-2xl">{orderData.totalItems} Items</h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                  Total
                </h3>
              </div>
              <div>
                {orderItems.map((order) => {
                  // {console.log(product.productId.title)}
                  return (
                    <div key={order._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                      <div className="flex w-2/5">
                        {" "}
                        <div className="w-20">
                          <a href={`/ProductView/${order.productId._id}`}>
                            <img
                              className="h-24"
                              src={order.productId.productImage}
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">{order.productId.title}</span>
                          <span className="text-red-500 text-xs">{order.productId.style}</span>

                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        <input
                          className="mx-2 border text-center w-8"
                          type="text"
                          defaultValue={order.quantity}
                        />
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">{order.productId.price} ₹</span>
                      <span className="text-center w-1/5 font-semibold text-sm">{Number(order.productId.price) * Number(order.quantity)} ₹</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div id="summary" className="w-1/4 px-8 mx-12">
              <a href="/Orders">
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full mt-5" >
                  {`All Order's`}
                </button>
              </a>
              <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm capitalize">total Quantity {orderData.totalItems}</span>
                <span className="font-semibold text-sm">{orderData.totalPrice} ₹</span>
              </div>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>{orderData.totalPrice} ₹</span>
                </div>
                <button className={(orderData.status !== 'cancled') ? "bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full mb-10" : "font-semibold py-3 text-sm text-white uppercase w-full mb-10 bg-indigo-500"} onClick={handelCancelButton} disabled={orderData.status === 'cancled'}>
                  Cancel order
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" theme="colored" closeOnClick={false} />
      </div>
    </div>
  )
}
