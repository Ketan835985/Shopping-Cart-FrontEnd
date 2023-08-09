/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function confirmPayment() {
    const userId = localStorage.getItem('userId');
    const [cartDetails, setCartDetails] = useState({})
    let [cartItems, setCartItems] = useState([])
    async function orderCreate() {
        const response = await fetch(`http://localhost:3000/users/${userId}/orders`, {
            method: 'POST',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
        const order = await response.json()
        return await order
    }

    async function cartDelete() {
        const response = await fetch(`http://localhost:3000/users/${userId}/cart`, {
            method: 'DELETE',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        })
        const cart = await response.json()
        return (await cart).data
    }

    function handelCheckOut() {
        orderCreate().then((order) => {
            if (order.status === true) {
                toast.success(order.message)
                cartDelete().then((cart) => {
                    setCartDetails(cart)
                    setCartItems(cart.items)
                })
            }
            else {
                toast.error(order.message)
            }
        })
    }
    return (
        <div>
            <Navbar />
            <div className="flex gap-3 flex-col justify-center items-center my-20">
                <h1 className="font-semibold text-2xl text-center gap-3">Confirm Payment</h1>
                <button className=" bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-36" onClick={handelCheckOut} >
                    Confirm
                </button>
                <a href="/Orders">
                    <button className=" bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-36" >
                        {`My Order's`}
                    </button>
                </a>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}
