/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";


export default function orderCardPayment() {
    const {amount} = useParams("amount")
    return (
        <div>
            <Navbar/>
            <div className="min-h-screen flex justify-center items-center bg-blue-500">
            <h1 className="items-center ">Shopping Cart Payment Gateway</h1>
                <div className=" card rounded-lg h-auto w-3/4 bg-white">
                    <div className="flex h-full w-full ">
                        <div className="left_side  relative rounded-l-lg h-auto w-full truncate">
                            <img className="h-full w-full" src="https://imgur.com/cOwXXFq.jpg" />
                            <div className="h-48 w-72 opacity-70 rounded-lg  bg-blue-300 absolute top-28 left-8 ">
                                <div className="p-2 mt-3 text-black font-semibold">
                                    <p>Card Number</p>
                                    <p className="border-b-2 text-white shown_number">
                                        0000 0000 0000 0000
                                    </p>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <div className="p-2 mt-2 text-black font-semibold">
                                        <p>Expiry Date</p>
                                        <p className="border-b-2 text-white shown_expiry">mm/yyyy</p>
                                    </div>
                                    <div className="p-2 mt-2 text-black font-semibold">
                                        <p>CVV</p>
                                        <p className="border-b-2 text-white shown_cvv">000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 right_side truncate h-auto w-full bg-gray-300 rounded-r-lg">
                            <p className="mt-3 text-xl font-semibold">Payment Details</p>
                            <div className="mt-5 relative">
                                {" "}
                                <input
                                    className="input_number h-12 w-full border border-white transition-all rounded-lg px-2 outline-none focus:border-blue-900"
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    data-slots={0}
                                    data-accept="\d"
                                    size={19}
                                    required
                                // onkeyup="Number(this.value)"
                                />{" "}
                                <label className="text-xs absolute -top-4 left-0">Card Number</label>{" "}
                            </div>
                            <div className="mt-7 w-full flex gap-3">
                                <div className=" relative w-full">
                                    <input
                                        className="input_expiry h-12 w-full border border-white transition-all rounded-lg px-2 outline-none focus:border-blue-900"
                                        placeholder="mm/yyyy"
                                        data-slots="my"
                                        type="text"
                                        required
                                    // onkeyup="Expiry(this.value)"
                                    />{" "}
                                    <label className="text-xs absolute -top-4 left-0">
                                        Expiry Date
                                    </label>{" "}
                                </div>
                                <div className=" relative w-full">
                                    <input
                                        className="input_cvv h-12 w-full border border-white transition-all rounded-lg px-2 outline-none focus:border-blue-900"
                                        type="password"
                                        placeholder={"000"}
                                        data-slots={0}
                                        data-accept="\d"
                                        size={3}
                                        required
                                    // onkeyup="Cvv(this.value)"
                                    />{" "}
                                    <label className="text-xs absolute -top-4 left-0">CVV</label>{" "}
                                </div>
                            </div>
                            <div className="mt-7 relative">
                                {" "}
                                <input
                                    className="h-12 w-full border border-white transition-all rounded-lg px-2 outline-none focus:border-blue-900"
                                    type="text"
                                    required
                                />{" "}
                                <label
                                    className="text-xs absolute -top-4 left-0"
                                // onkeyup="Name(this.value)"
                                >
                                    Name on Card
                                </label>{" "}
                            </div>
                            <p className="mt-4">
                                Amount due :{" "}
                                <a className="font-semibold" href="#">
                                    <i className="fa fa-rupee" /> {amount} ₹
                                </a>
                            </p>
                            <div className="mb-5">
                                {" "}
                                <a href="/orderFilledForm">
                                <button className="pay_now mt-4 outline-none rounded-lg text-white h-12 w-full bg-green-500 text-sm cursor-pointer transition-all hover:bg-green-800">
                                    <i className="fa fa-lock mr-1 " />
                                    Pay Now
                                </button>
                                </a>
                                {" "}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
