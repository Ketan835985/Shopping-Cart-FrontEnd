
import { useState } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';

export default function Example() {
    const [productData, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        files: '',
        installments: 0,
        isFreeShipping: false, // Updated to default to false for boolean field
        currencyFormat: '₹', // Set a default currency format
        currencyId: 'INR', // Set a default currency ID
        availableSizes: '',
        style: '', 
    });
    const [img, setImg] = useState(null)
    const [productImage, setProductImage] = useState(null);
    const handleImageChange = (event) => {
        setProductImage(event.target.files[0]);
        // console.log(event.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = (e) => {
            setImg(e.target.result);
        };
    };

    const handleOnChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'radio' ? e.target.value === 'true' : value;

        setProduct({ ...productData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataProduct = new FormData()
        for (const key in productData) {
            dataProduct.append(key, productData[key]);
        }
        dataProduct.append("productImage", productImage);
        // console.log(dataProduct)
        await fetch('http://localhost:3000/products', {
            method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            body: dataProduct
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res.data)
                if (res.status == true) {
                    alert("Product Added Successfully")
                    // console.log(res.data)
                }
                else {
                    alert(res.message);
                }
            });

            setProduct(productData)
    };

    return (
        <>
        <Navbar/>
        <form onSubmit={handleSubmit}>
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
                                <div> <img src={img} className="h-12 w-12 text-gray-300" aria-hidden="true" /></div>
                                <input
                                    onChange={handleImageChange}
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
                                    onChange={handleOnChange}
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="title"
                                    required
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    onChange={handleOnChange}
                                    id="description"
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
                                    onChange={handleOnChange}
                                    required
                                    type="float"
                                    name="price"
                                    id="price"
                                    autoComplete="priceChanged"
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="style" className="block text-sm font-medium leading-6 text-gray-900">
                                Style*
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={handleOnChange}
                                    required
                                    type="text"
                                    name="style"
                                    id="style"
                                    autoComplete="Changed"
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="currencyFormat" className="block text-sm font-medium leading-6 text-gray-900">
                                Currency Format
                            </label>
                            <div className="mt-2">
                                <select
                                    onChange={handleOnChange}
                                    id="currencyFormat"
                                    name="currencyFormat"
                                    autoComplete="currencyFormat"
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                                    onChange={handleOnChange}
                                    id="country"
                                    defaultValue="INR"
                                    name="currencyId"
                                    autoComplete="country-name"
                                    className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                                    onChange={handleOnChange}
                                    id="isFreeShipping"
                                    name="isFreeShipping"
                                    type="radio"
                                    value="true"
                                    checked={productData.isFreeShipping === true}
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
                                    onChange={handleOnChange}
                                    type="text"
                                    required
                                    name="availableSizes"
                                    id="availableSizes"
                                    autoComplete="availableSizes"
                                    className= "p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    onChange={handleOnChange}
                                    type="number"
                                    name="installments"
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
        <Footer/>
        </>
    )
}
