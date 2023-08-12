import { useEffect, useState } from "react"
import Navbar from '../Navbar'
import Footer from "../Footer";
import LoadingSpin from "../Loader/LoadingSpin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function UserLogin() {
    const [isLoading, setIsLoading] = useState(false)
    const [loginData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [validForm, setValidForm] = useState(false)
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...loginData,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        let value = setTimeout(() => {
            setValidForm((loginData.email).includes('@') && (loginData.password).length > 6)
        }, 500)
        return () => {
            clearTimeout(value)
        }
    }
        , [loginData])


    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(loginData)

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log(res)
                setIsLoading(true)
                if (res.status === true) {
                    toast.success("Login successful")
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("userId", res.data.userId)
                    window.location.href = '/'
                }
                else {
                    setIsLoading(false)
                    toast.error(res.message)
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            {isLoading && <LoadingSpin />}
            <div>
                <Navbar />
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        onChange={handleChange}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    disabled={!validForm}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <div className="text-center m-5">
                            <a href="/register" className="mt-10 text-center text-sm m-5 font-semibold text-indigo-600 hover:text-indigo-500">
                                Not a member
                            </a>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            <ToastContainer />
        </>
    )
}
