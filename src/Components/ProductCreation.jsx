
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function Example() {
    const [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        files: '',
        installments: '',
        isFreeShipping: '',
        currencyFormat: '',
        currencyId: '',
    });

    const handelOnchange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(product); 
    };

    return (
        <form onSubmit={handelSubmit}>
            <div className="space-y-10 flex justify-center gap-y-7">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-bold leading-7 text-gray-900">Product Creation Form</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Image*
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                <input
                                    required
                                    name="files"
                                    type="file"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                title/Product Name*
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handelOnchange}
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="title"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    onChange={handelOnchange}
                                    id="about"
                                    name="description"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                Price*
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handelOnchange}
                                    required
                                    type="text"
                                    name="price"
                                    id="price"
                                    autoComplete="priceChanged"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="currencyFormat" className="block text-sm font-medium leading-6 text-gray-900">
                                Currency Format
                            </label>
                            <div className="mt-2">
                                <select
                                    onChange={handelOnchange}
                                    id="currencyFormat"
                                    name="currencyFormat"
                                    autoComplete="currencyFormat"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>₹</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="currencyId" className="block text-sm font-medium leading-6 text-gray-900">
                                Currency ID
                            </label>
                            <div className="mt-2">
                                <select
                                    onChange={handelOnchange}
                                    id="country"
                                    defaultValue="INR"
                                    name="currencyId"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="INR" name="currencyId">INR</option>
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                isFreeShipping
                            </label>
                            <div className="flex items-center gap-x-3">
                                <input
                                    onChange={handelOnchange}
                                    id="isFreeShipping"
                                    name="isFreeShipping"
                                    type="radio"
                                    checked={product.isFreeShipping === "true"}
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="isFreeShipping" className="block text-sm font-medium leading-6 text-gray-900">
                                    true
                                </label>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="availableSizes" className="block text-sm font-medium leading-6 text-gray-900">
                                availableSizes* , Choose in this [S, XS, M, X, L, XXL, XL] and write x,y,z
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handelOnchange}
                                    type="text"
                                    required
                                    name="availableSizes"
                                    id="availableSizes"
                                    autoComplete="availableSizes"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <br></br>
                        <div className="sm:col-span-3">
                            <label htmlFor="installments" className="block text-sm font-medium leading-6 text-gray-900">
                                Installments* (in Number)
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handelOnchange}
                                    type="number"
                                    name="installment"
                                    id="installments"
                                    autoComplete="installments"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-end justify-center gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}
