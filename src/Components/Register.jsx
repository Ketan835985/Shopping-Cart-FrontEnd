import { useState } from "react"
import "./register.css"
import Navbar from './Navbar'

export default function Register() {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        "address[billing][street]": "",
        "address[billing][city]": "",
        "address[billing][pincode]": "",
        "address[shipping][street]": "",
        "address[shipping][pincode]": "",
        "address[shipping][city]": "",
    })
    const [img , setImg] = useState(null)
    const [profileImage, setProfileImage] = useState(null);
    const handleImageChange = (event) => {
        setProfileImage(event.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = (e) => {
            setImg(e.target.result);
        };
    };

    const handleOnchange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const dataUser = new FormData()
        for (const key in formData) {
            dataUser.append(key, formData[key]);
        }
        // console.log(profileImage);
        dataUser.append("profileImage",profileImage);
        await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                // "Content-Type": "application/x-www-form-urlencoded",
                // Accept: "application/json",
            },
            body: dataUser
            
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.status == true) {
                    window.location.href = "/login"
                }
                else {
                    alert(res.message)
                }
            })
    }
    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit} className="flex m-auto justify-center ">
                <div className="outer">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign Up Here
                        </h2>
                        <br></br>
                        <div className="flex text-center gap-3 justify-center ">
                            <div className="input-div flex">
                                <input className="input" name="profileImage" type="file" aria-required onChange={handleImageChange} />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    fill="none"
                                    stroke="currentColor"
                                    className="icon"
                                >
                                    <polyline points="16 16 12 12 8 16" />
                                    <line y2={21} x2={12} y1={12} x1={12} />
                                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                    <polyline points="16 16 12 12 8 16" />
                                </svg>
                                <div> <img src={img} /></div>
                            </div>
                            <div className="text-orange-900 align-middle mt-5"> Upload your Profile Image</div>
                        </div>
                        <span className="message">File selected!</span>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"></div>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-bold leading-7 text-gray-900">Personal Information</h2>
                            <hr />
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            type="text"
                                            name="fname"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            type="text"
                                            name="lname"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="Number" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            id="Phone"
                                            name="phone"
                                            type="number"
                                            maxLength={10}
                                            autoComplete="Number"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="Number" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password :
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            id="Password"
                                            name="password"
                                            type="password"
                                            minLength={8}
                                            maxLength={15}
                                            autoComplete="Number"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <h2 className="text-gray-700">
                                        Billing Address :
                                    </h2>
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            type="text"
                                            name="address[billing][street]"
                                            id="address[billing][street]"
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            type="text"
                                            name="address[billing][city]"
                                            id="address[billing][city]"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            type="text"
                                            name="address[billing][pincode]"
                                            id="address[billing][pincode]"
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <h2 className="text-gray-700">
                                        Shipping Address :
                                    </h2>
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            type="text"
                                            name="address[shipping][street]"
                                            id="street-address"
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            type="text"
                                            name="address[shipping][city]"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            required
                                            type="text"
                                            name="address[shipping][pincode]"
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                            onChange={handleOnchange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <button
                                    type="submit"
                                    className="flex w-half justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4 mr-6 "
                                >
                                    Sign Up
                                </button>
                                <button
                                    className="flex w-half justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4 mr-6"
                                >
                                    Sign In
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}
