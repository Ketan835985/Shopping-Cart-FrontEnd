/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import './userProfile.css'
import LoadingSpin from "../Loader/LoadingSpin";

export default function UserProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const userId = localStorage.getItem('userId');
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    billAddress: "",
    profileImage: "",
    phone: "",
    email: "",
  })
  const fetchUser = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}/profile`, {
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };
  // console.log(fetchUser())
  useEffect(() => {
    fetchUser().then((user) => {

      if (user) {
        // console.log(user)
        setIsLoading(false)
        setUserDetails({
          name: user.fname + ' ' + user.lname,
          profileImage: user.profileImage,
          billAddress: user.address.shipping,
          phone: user.phone,
          email: user.email,
          address: user.address.billing
        });
      }
    })

  }, []);
  return (
    <>
      {isLoading ? <LoadingSpin /> :
        <div>
          <Navbar />
          <div className="w-full flex justify-center align-middle my-48">
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

          </div >
          <Footer />
        </div>
      }
    </>
  )
}
