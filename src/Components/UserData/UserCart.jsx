/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function UserCart() {
    const userId = localStorage.getItem('userId');
    const [cartDetails, setCartDetails] = useState({})
    let [cartItems, setCartItems] = useState([])
    let [method, setMethod ]= useState("")
    const fetchDetail = async () => {
        const response = await fetch(`http://localhost:3000/users/${userId}/cart`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
        const cart = await response.json()
        return (await cart).data;
    }
    const handelMethod = (e) =>{
        setMethod(e.target.value)
        if (e.target.value == "") return toast.error("select valid payment method")
    }
    useEffect(() => {
        fetchDetail().then((cart) => {
            setCartDetails(cart)
            setCartItems(cart.items)
        })
    }, [])
    // console.log(cartItems)
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <div className="flex shadow-md my-8 mx-12">
                    <div className="w-3/4 bg-white px-10 ">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                            <h2 className="font-semibold text-2xl">{cartDetails.totalItems} Items</h2>
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
                            {cartItems.map((product) => {
                                // {console.log(product.productId.title)}
                                return (<div key={product._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                    <div className="flex w-2/5">
                                        {" "}
                                        <div className="w-20">
                                            <img
                                                className="h-24"
                                                src={product.productId.productImage}
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between ml-4 flex-grow">
                                            <span className="font-bold text-sm">{product.productId.title}</span>
                                            <span className="text-red-500 text-xs">{product.productId.style}</span>
                                            <a
                                                href="#"
                                                className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                                            >
                                                Remove
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-1/5">
                                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                        </svg>
                                        <input
                                            className="mx-2 border text-center w-8"
                                            type="text"
                                            defaultValue={product.quantity}
                                        />
                                        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                        </svg>
                                    </div>
                                    <span className="text-center w-1/5 font-semibold text-sm">{product.productId.price} ₹</span>
                                    <span className="text-center w-1/5 font-semibold text-sm">{Number(product.productId.price) * Number(product.quantity)} ₹</span>
                                </div>)
                            })}
                        </div>

                        <a href="/Products" className="flex font-semibold text-indigo-600 text-sm my-10">
                            <svg
                                className="fill-current mr-2 text-indigo-600 w-4"
                                viewBox="0 0 448 512"
                            >
                                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                            </svg>
                            Continue Shopping
                        </a>
                    </div>
                    <div id="summary" className="w-1/4 px-8 mx-12">
                        <a href="/Orders">
                        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full" >
                            {`My Order's`}
                        </button>
                        </a>
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items {cartDetails.totalItems}</span>
                            <span className="font-semibold text-sm">{cartDetails.totalPrice} ₹</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">
                                Shipping
                            </label>
                            <select className="block p-2 text-gray-600 w-full text-sm">
                                <option>Normal Shipping  - 0.00 ₹</option>
                                <option>Standard shipping - 10.00 ₹</option>

                            </select>
                        </div>
                        <div className="py-10">
                            <label
                                htmlFor="promo"
                                className="font-semibold inline-block mb-3 text-sm uppercase"
                            >
                                Promo Code
                            </label>
                            <input
                                type="text"
                                id="promo"
                                placeholder="Enter your code"
                                className="p-2 text-sm w-full"
                            />
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                            Apply
                        </button>
                        <div className="my-6">
                            <label className="font-medium inline-block mb-3 text-sm uppercase">
                                Payment Method
                            </label>
                            <select className="block p-2 text-gray-600 w-full text-sm " name="method" onChange={handelMethod} required>
                                <option value = ""> option... </option>
                                <option value={"COD"}>Cash On Delivery(COD)</option>
                                <option value="Card">Card Payment </option>

                            </select>
                        </div>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>{cartDetails.totalPrice} ₹</span>
                            </div>
                            <a href={method == "COD" ? "/orderFilledForm" : (method == "Card" ? `/OrderCardPayment/${cartDetails.totalPrice}` : "/UserCart")}>
                            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full" >
                                Checkout
                            </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" theme="colored" closeOnClick={false} />
        </div>
    )
}
