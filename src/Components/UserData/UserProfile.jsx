/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import LoadingSpin from "../Loader/LoadingSpin";
import UpdateFromModel from "../Loader/Model";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function UserProfile() {
  const [openUpdateForm, closeUpdateFrom] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const userId = localStorage.getItem('userId');
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    address: "",
    billAddress: "",
    profileImage: "",
    phone: "",
    email: "",
  })
  const CloseFormHandler = () => {
    closeUpdateFrom(false)
  }
  const fetchUser = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/user/${userId}/profile`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.status === true) {
          // console.log(data.data)
          setUserDetails({
            fname: data.data.fname,
            lname: data.data.lname,
            address: data.data.address.billing.street + ' ' + data.data.address.billing.city + ' ' + data.data.address.billing.pincode,
            phone: data.data.phone,
            email: data.data.email,
            profileImage: data.data.profileImage,
            billAddress: data.data.address.billing.street + ' ' + data.data.address.billing.city + ' ' + data.data.address.billing.pincode
          })
          setIsLoading(false)
        }
        else {
          toast.error(data.message)
        }
      })
  };
  useEffect(() => {
    fetchUser()
  }, []);
  
  return (
    <>
      {isLoading ? <LoadingSpin /> :
        <div>
          <Navbar />
          {/* <div className="w-full flex justify-center align-middle my-48">
            <div className="main">
              <div id="c2" className="card">
                <div className="card-info">
                  <div className="contact-title">Contact</div>
                  <div className="card-contact">
                    <li className="icon-contact">
                      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z" />
                      </svg>
                      {userDetails.phone}
                    </li>
                    <li className="icon-contact">
                      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                      </svg>
                      Email:
                      <span></span>
                    </li>
                    {userDetails.email}
                    <li className="address-title">Shipping Address:</li>
                    <li className="address">{userDetails.address.street + " " + userDetails.address.city + " " + userDetails.address.pincode}</li>
                  </div>
                </div>
              </div>
              <div id="c3" className="card">
                <div className="card-info">
                  <li className="address-icon">
                    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                    </svg>
                  </li>
                  <li className="address-title">Billing Address:</li>
                  <li className="address">{userDetails.billAddress.street + " " + userDetails.billAddress.city + " " + userDetails.billAddress.pincode}</li>
                </div>
              </div>
              <div id="c1" className="card">
                <div className="card-info">
                  <div className="bg-slate-600 rounded-full mb-5 h-24 w-24 content-center">
                    <img src={userDetails.profileImage} alt="" className="rounded-full text-center" />
                  </div>
                  <div className="card-title">{userDetails.name}</div>
                  <div className="card-subtitle">Sub-title</div>
                </div>
              </div>
            </div>

          </div > */}
          <div
            className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover"
            style={{ backgroundImage: 'url("https://source.unsplash.com/1L71sPT5XKc")' }}
          >
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
              {/*Main Col*/}
              <div
                id="profile"
                className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
              >
                <div className="p-4 md:p-12 text-center lg:text-left">
                  {/* Image for mobile view*/}
                  <div
                    className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${userDetails.profileImage})`
                    }}
                  />
                  <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userDetails.fname + ' ' + userDetails.lname}</h1>
                  <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
                  <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                    <svg
                      className="h-4 fill-current text-green-700 pr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                    </svg>{" "}
                    {userDetails.phone}
                  </p>
                  <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                    <svg
                      className="h-4 fill-current text-green-700 pr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                    </svg>{" "}
                    {userDetails.email}
                  </p>
                  <p className="pt-8 text-sm">
                    {"Shipping Address: " + userDetails.address}
                  </p>
                  <p className="pt-8 text-sm">
                    {"Billing Address: " + userDetails.billAddress}
                  </p>
                  <div className="pt-12 pb-8">
                    <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full" onClick={()=> closeUpdateFrom(true)}>
                      Update Profile
                    </button>
                  </div>
                  {/* Use https://simpleicons.org/ to find the svg for your preferred product */}
                </div>
              </div>
              {/*Img Col*/}
              <div className="w-full lg:w-2/5">
                {/* Big profile image for side bar (desktop) */}
                <img
                  src={userDetails.profileImage || "https://source.unsplash.com/MP0IUfwrn0A"}
                  className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
                  style={{height: "465px"}}
                />
                {/* Image from: http://unsplash.com/photos/MP0IUfwrn0A */}
              </div>

            </div>
          </div>
          {openUpdateForm && <UpdateFromModel FromData={userDetails} CloseFormHandler={CloseFormHandler} fetchUser={fetchUser}></UpdateFromModel>}
          <Footer />
          <ToastContainer />
        </div>
      }
    </>
  )
}
