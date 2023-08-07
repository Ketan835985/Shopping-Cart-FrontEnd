/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from "react";
import Navbar from "../Navbar";



export default function orderList() {
  const [orderList, setOrderList] = useState([])
  const userId = localStorage.getItem('userId')

  async function orders() {
    const response = await fetch(`http://localhost:3000/users/${userId}/orders`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    const data = await response.json()

    return await data
  }

  useEffect(() => {
    orders().then((data) => {
      if (data.status == true) {
        setOrderList(data.data)
      }
    })
  }, [])

  // console.log(orderList)

  return (
    <div>
      <Navbar />
      <div className="mr-24">
        <section className="pt-12 pb-24 overflow-hidden bg-blueGray-100 w-full mx-auto ">
          <div className="container px-4 mx-auto">
            <div className="mb-8 pb-8 border-b border-gray-200 border-opacity-40">
              <h1 className="text-center text-3xl xl:text-4xl font-heading font-medium">
                {`Your Order's`}
              </h1>
            </div>
            <div className="flex flex-wrap -mx-4 mb-14 xl:mb-24">
              <div className="w-full md:w-8/12 xl:w-9/12 px-4 mb-14 md:mb-0">
                <div className="py-12 px-8 md:px-12 bg-white rounded-3xl">
                  <div className="xl:px-10">

                    {orderList.map((order) => {
                      return (
                        <div key={order._id} className="relative flex flex-wrap items-center xl:justify-between -mx-4 mb-8 pb-8 border-b border-gray-200 border-opacity-40">
                          <div className="w-full md:w-auto px-4 mb-6 xl:mb-0">
                            <a
                              className="block mb-5 text-xl font-heading font-medium hover:underline"
                              href={`/orderDetail/${order._id}`}
                            >
                              {(order._id).slice(17).toUpperCase()}
                            </a>
                            <div className="flex flex-wrap">
                              <p className="mr-4 text-sm font-medium">
                                <span className="font-heading">Replace:</span>
                                <span className="ml-2 text-gray-400">Silver</span>
                              </p>
                              <p className="text-sm font-medium">
                                <span>Order Date:</span>
                                <span className="ml-2 text-gray-400">{(order.createdAt)}</span>
                              </p>
                            </div>
                          </div>
                          <div className="w-full xl:w-auto px-4 mb-6 xl:mb-0 mt-6 xl:mt-0">
                            <div className="flex items-center flex-col">
                              <h4 className="mr-4 font-heading font-medium">Total Items: {order.totalItems}</h4>
                              
                              <h4 className="mr-4 font-heading font-medium">Quantity: {order.totalQuantity}</h4>
                            </div>
                          </div>
                          <div className="w-full xl:w-auto px-4">
                            <span className="text-xl font-heading font-medium text-blue-500">
                              <span className="text-medium">{order.totalPrice}</span>
                              <span className="text-medium"> ₹ </span>
                            </span>
                          </div>
                        </div>)
                    })}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-4/12 xl:w-3/12 px-4">
                <div className="mb-14">
                  <h2 className="mb-7 md:mt-6 text-3xl font-heading font-medium">
                    Order Details
                  </h2>
                  <div className="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                    <span>Status</span>
                    <span className="flex items-center text-xl">
                      <span className="mr-2 text-base">Pending</span>
                      {/* <span>{orderList[0].status}</span> */}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4 px-10 mb-3 leading-8 bg-white bg-opacity-50 font-heading font-medium rounded-3xl">
                    <span>Shipping</span>
                    <span className="flex items-center text-xl">
                      <span className="mr-2 text-base">$</span>
                      <span>10,00</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-4 px-10 mb-6 leading-8 bg-white font-heading font-medium rounded-3xl">
                    <span>Total</span>
                    <span className="flex items-center text-xl text-blue-500">
                      <span className="mr-2 text-base">$</span>
                      <span>720,70</span>
                    </span>
                  </div>
                  <a
                    className="inline-block w-full lg:w-auto py-2 px-3 text-medium leading-6 text-white font-medium tracking-tighter font-heading text-center hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl bg-black"
                    href="#"
                  >
                    Cancel Order
                  </a>
                </div>
                <div className="text-center md:text-left">
                  <img
                    className="block mb-9 mx-auto md:ml-0"
                    src="uinel-assets/images/ecommerce-cart/procents.svg"
                    alt=""
                  />
                  <h4 className="mb-5 text-4xl font-heading font-medium">Shipping</h4>
                </div>
              </div>
            </div>
            <div className="md:w-96">
              <a
                className="block py-5 px-10 w-full text-xl leading-6 font-medium tracking-tighter font-heading text-center bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                href="/Products"
              >
                Back to shop
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
