/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import Footer from '../Footer'
import LoadingSpin from '../Loader/LoadingSpin';
import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import { Fragment, } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
]

// const products = [
//     {
//         id: 1,
//         name: 'Earthen Bottle',
//         href: '/ProductView',
//         price: '$48',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
//         imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
//     },
//     {
//         id: 2,
//         name: 'Nomad Tumbler',
//         href: '/ProductView',
//         price: '$35',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
//         imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
//     },
//     {
//         id: 3,
//         name: 'Focus Paper Refill',
//         href: '/ProductView',
//         price: '$89',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
//         imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
//     },
//     {
//         id: 4,
//         name: 'Machined Mechanical Pencil',
//         href: '/ProductView',
//         price: '$35',
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
//         imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
//     },
//     // More products...
// ]

export default function ProductList() {
    const [products, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    let [filter, setFilter] = useState('Most Popular')


    const fetchData = async () => {
        setIsLoading(true)
        const res = await fetch('http://localhost:3000/products')
        const json = await res.json()
        return json.data
    }

    useEffect(() => {
        fetchData()
            .then(data => {
                setProduct(data || [])
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, []);

    const filterProducts = (filter) => {
        // console.log("click filter products")
        if (filter === 'Most Popular') {
            return products
        }
        else if (filter === 'Best Rating') {
            return products

        }
        else if (filter === 'Newest') {
            return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }
        else if (filter === 'Price: Low to High') {
            return products.sort((a, b) => a.price - b.price)
        }
        else if (filter === 'Price: High to Low') {
            return products.sort((a, b) => b.price - a.price)
        }
    }
   
    const productFilter = filterProducts(filter)
   
    return (
        <>
            {isLoading && <LoadingSpin />}
            <div>
                <Navbar />
                
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className=' mb-10 '>
                            <Menu as="div" className="relative inline-block text-left outline outline-2 outline-black rounded-xl px-3">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => setFilter(option.name)}
                                                            className={
                                                                (option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                        >
                                                            {option.name}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {productFilter.map((product) => (
                                <a key={product._id} href={`/ProductView/${product._id}`} className="group">
                                    <div
                                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
                                    >

                                        <img
                                            src={product.productImage}
                                            alt=""
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">
                                        {product.currencyFormat + product.price}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}


