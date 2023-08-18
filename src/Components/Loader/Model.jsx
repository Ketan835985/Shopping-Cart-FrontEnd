/* eslint-disable react/prop-types */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { toast } from 'react-toastify'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function UpdateFromModel(props) {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
    const userId = localStorage.getItem('userId')
    const [profileImage, setProfileImage] = useState(null);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        "address[billing][street]": "",
        "address[billing][city]": "",
        "address[billing][pincode]": "",
    })
    const handleImageChange = (event) => {
        setProfileImage(event.target.files[0]);
    };
    function updateFormHandler() {
        const updatedData = new FormData();

        for (let key in formData) {
            if (formData[key] !== "") {
                updatedData.append(key, formData[key]);
            }
        }
        console.log(profileImage);
        if (profileImage !== null) {
            updatedData.append('profileImage', profileImage);
        }
        fetch(`http://localhost:3000/user/${userId}/profile`, {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            },
            body: updatedData
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == true) {
                    toast.success(data.message)
                    
                }
                else {
                    toast.error(data.message)

                }
            })
    }

    const handelUpdateButton = () =>{
        updateFormHandler()
        props.fetchUser()
        props.CloseFormHandler()
    }
    const handelSubmit = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        // console.log("work", formData)

    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-5">
                                <form >
                                    <input type='checkbox' name = "Photo" onChange={(e)=>console.log( e.target.value)} />
                                    <label htmlFor='Profile' > Profile Photo :
                                        {" "}
                                        <input
                                            type='file'
                                            id='Profile'
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                    {" "}
                                    <div className="grid md:grid-row-1 md:gap-2">
                                        {" "}
                                        <label htmlFor='fname'> First Name :
                                            <input
                                                onChange={handelSubmit}
                                                type="text"
                                                name="fname"
                                                id="fname"
                                                required
                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                placeholder="First name*"
                                                defaultValue={props.FromData.fname}
                                            />
                                        </label>
                                        {" "}
                                        <label htmlFor='lname'> Last Name :
                                            <input
                                                onChange={handelSubmit}
                                                type="text"
                                                name="lname"
                                                id='lname'
                                                required
                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                placeholder="Last name*"
                                                defaultValue={props.FromData.lname}
                                            />
                                        </label>
                                        {" "}
                                    </div>
                                    {" "}
                                    <label htmlFor='street' > Address Street :
                                        <input
                                            onChange={handelSubmit}
                                            type="text"
                                            required
                                            name="street"
                                            className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                            placeholder="Address*"
                                            defaultValue={props.FromData.address.street}
                                        />
                                    </label>
                                    {" "}
                                    <div className="grid md:grid-row-3 md:gap-2">
                                        <label htmlFor='city'> City :
                                            <input
                                                onChange={handelSubmit}
                                                type="text"
                                                name="city"
                                                id='city'
                                                required
                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                placeholder="City*"
                                                defaultValue={props.FromData.address.city}
                                            />{" "}
                                        </label>

                                        <label htmlFor='pincode'> Pincode :
                                            <input
                                                onChange={handelSubmit}
                                                type="text"
                                                name="pincode"
                                                id='pincode'
                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                placeholder="Pincode*"
                                                required
                                                defaultValue={props.FromData.address.pincode}
                                            />
                                        </label>{" "}
                                    </div>
                                    {" "}
                                    <label htmlFor='email'> Email ID :
                                        <input
                                            onChange={handelSubmit}
                                            type="text"
                                            name="email"
                                            id='email'
                                            className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                            placeholder="State*"
                                            required
                                            defaultValue={props.FromData.email}
                                        />
                                    </label>
                                    {" "}
                                    <label htmlFor='phone'> Phone Number :
                                        <input
                                            onChange={handelSubmit}
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            required
                                            className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                            placeholder="Phone Number*"
                                            defaultValue={props.FromData.phone}
                                        />
                                    </label>
                                    {" "}
                                    <div className="flex justify-between items-center pt-2">
                                        <button
                                            onClick={props.CloseFormHandler}
                                            type="button"
                                            className="h-12 w-24 text-blue-500 text-xs font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handelUpdateButton}
                                            type="button"
                                            className="h-12 w-48 rounded font-medium text-xs bg-blue-500 text-white"
                                        >
                                            Update Profile
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}
