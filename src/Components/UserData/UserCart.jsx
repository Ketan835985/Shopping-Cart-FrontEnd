/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import LoadingSpin from "../Loader/LoadingSpin";
import Footer from "../Footer";



export default function UserCart() {
    const userId = localStorage.getItem('userId');
    let [cartDetails, setCartDetails] = useState({})
    let [cartItems, setCartItems] = useState([])
    let [method, setMethod] = useState("")
    const [loading, setLoading] = useState(false)

    const handelPayment = () => {
        if (method == "" && cartDetails.totalItems > 0) {
            toast.error("please select a payment method")
        }
        else if (method && cartDetails.totalItems == 0) {
            toast.info("please add some products : Empty Cart")
        }
    }


    const handelRemoveProduct = (productId, removeProduct) => {
        setLoading(true)
        fetch(`http://localhost:3000/users/${userId}/cart`, {
            method: 'PUT',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId, removeProduct: removeProduct })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === true) {
                    toast.success(res.message)
                    fetchDetail()
                    setLoading(false)
                }
                else {
                    toast.error(res.message)
                    setLoading(false)
                }
            })
    }


    const fetchDetail = () => {
        setLoading(true)
        fetch(`http://localhost:3000/users/${userId}/cart`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (data.status === true) {
                setLoading(false)
                setCartDetails(data.data)
                setCartItems(data.data.items)
            }
            else {
                setLoading(false)
                toast.error(data.message)
            }
        })
    }
    const handelMethod = (e) => {
        setMethod(e.target.value)
        if (e.target.value == "")
            return toast.error("select valid payment method")
    }
    const handelAddPro = (productId) => {
        setLoading(true)
        fetch(`http://localhost:3000/users/${userId}/cart`, {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId })
        })
            .then((res) => res.json())
            .then(() => {
                toast.success("successfully")
                fetchDetail()
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.error(error)
            })
    }
    useEffect(() => {
        fetchDetail()
    }, [])
    return (

        <div>
            {loading && <LoadingSpin />}
            <Navbar />
            {!loading && <div className="container mx-auto mt-10">
                <div className="flex shadow-md my-8 mx-12 shadow-slate-500">
                    <div className="w-3/4 bg-white p-20 ">
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
                                return (
                                    <div key={product._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                        <div className="flex w-2/5">
                                            {" "}
                                            <div className="w-20">
                                                <a href={`/ProductView/${product.productId._id}`}>
                                                    <img
                                                        className="h-24"
                                                        src={product.productId.productImage}
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <div className="flex flex-col justify-between ml-4 flex-grow">
                                                <span className="font-bold text-sm">{product.productId.title}</span>
                                                <span className="text-red-500 text-xs">{product.productId.style}</span>
                                                <button className="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => handelRemoveProduct(product.productId._id, 0)}> Remove</button>
                                            </div>
                                        </div>
                                        <div className="flex justify-center w-1/5">
                                            <button className="fill-current text-gray-600 w-3" onClick={() => handelRemoveProduct(product.productId._id, (product.quantity == 1 ? 0 : 1))} >
                                                -
                                            </button>
                                            <span className="mx-2 border text-center w-8">{product.quantity}</span>
                                            <button className="fill-current text-gray-600 w-3 " onClick={() => handelAddPro(product.productId._id)}>
                                                +
                                            </button>
                                        </div>
                                        <span className="text-center w-1/5 font-semibold text-sm">{product.productId.price} ₹</span>
                                        <span className="text-center w-1/5 font-semibold text-sm">{Number(product.productId.price) * Number(product.quantity)} ₹</span>
                                    </div>
                                )
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
                            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full mt-5" >
                                {`My Order's`}
                            </button>
                        </a>
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm capitalize">total Quantity {cartDetails.totalItems}</span>
                            <span className="font-semibold text-sm">{cartDetails.totalPrice} ₹</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">
                                Shipping
                            </label>
                            <select className="block p-2 text-gray-600 w-full text-sm">
                                <option value={0}>Normal Shipping  - 0.00 ₹</option>
                                <option value={10}>Standard shipping - 10.00 ₹</option>

                            </select>
                        </div>
                        <div className="my-6">
                            <label className="font-medium inline-block mb-3 text-sm uppercase">
                                Payment Method
                            </label>
                            <select className="block p-2 text-gray-600 w-full text-sm " name="method" onChange={handelMethod} required>
                                <option value=""> option... </option>
                                <option value={"COD"}>Cash On Delivery(COD)</option>
                                <option value="Card">Card Payment </option>
                            </select>
                        </div>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>{cartDetails.totalPrice} ₹</span>
                            </div>
                            <a href={(method == "COD" && cartDetails.totalItems > 0) ? "/orderFilledForm" : (method == "Card" && cartDetails.totalItems > 0 && `/OrderCardPayment/${cartDetails.totalPrice}`)}>
                                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full mb-10" onClick={handelPayment}>
                                    Checkout
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>}
            <ToastContainer position="top-right" theme="colored" closeOnClick={false} />
           
            <Footer/>
        </div>
    )
}
