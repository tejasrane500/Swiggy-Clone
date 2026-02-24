import React, { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { CartContext, Coordinates, Visiblity } from '../Context/ContextApi';
import { useDispatch, useSelector } from "react-redux"
import { toggleLogin, toggleSearchBar } from '../utils/toggleSlice';
import SigninBtn from './SigninBtn';

function Navbar() {

  const navItems = [
    {
      name: "Search" ,
      image : <i className="fi fi-rr-search"></i>,
      path : "/search"
    },
    {
      name: "Sign in" ,
      image : <i className="fi fi-rr-user"></i>,
      path : "/signin"
    },
    {
      name: "Cart" ,
      image : <i className="fi fi-rr-shopping-cart-add"></i>,
      path : "/cart"
    },
  ]

  // const {visible , setVisible} = useContext(Visiblity)
  // const {cartData , setCartData} = useContext(CartContext)

  const cartData = useSelector((state) => state.cartSlice.cartItems)
  const userData = useSelector((state) => state.authSlice.userData)

  //access data from redux store using useselector
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)
  const loginvisible = useSelector((state) => state.toggleSlice.loginToggle)
  const dispatch = useDispatch()

  const [searchResult , setSearchResult] = useState([])
  const [Address , setAddress] = useState("")
  const {setCoord} = useContext(Coordinates)
  

  function handleVisiblity(){
    // setVisible(prev => !prev)
    dispatch(toggleSearchBar())
  }

  function handleLogin(){
    dispatch(toggleLogin())
  }

  async function FetchSearchResult(val) {
    if(val == "") return
    const res = await fetch('/SearchData.json')
    const data = await res.json();
    setSearchResult(data.data);
  }

  async function fetchlangData(id) {
    if(id == "") return
    const res = await fetch('/ReslangData.json')
    const data = await res.json();
    setCoord({
      lat : data.data[0].geometry.location.lat,
      lng : data.data[0].geometry.location.lng
    })
    setAddress(data.data[0].formatted_address)
    handleVisiblity();
  }


  return (
  <>

    <div className='w-full'>
        <div onClick={handleVisiblity} className={'w-full h-full z-30 bg-black/50 absolute ' + (visible ? "visible" : "invisible")}></div>
        <div className={'bg-white flex justify-end w-full md:w-[40%] h-full z-40 absolute duration-500 p-5 ' + (visible ? "left-0" : "-left-[100%]")}>
          <div className='flex flex-col gap-4 mt-3 w-full lg:w-[50%] mr-6'>
            <i onClick={handleVisiblity} className="fi fi-br-cross cursor-pointer"></i>
            <input type="text" className='border p-5 focus:outline-none focus:shadow-lg' onChange={(e) => FetchSearchResult(e.target.value)}/>
            <div className='border p-5'>
              <ul>
                {
                  searchResult.map((data , i) => {
                    const isLast = (i === searchResult.length - 1)
                    return (
                    <div key={i} className='my-5'>
                      <div className='flex gap-3'>
                        <i className="fi mt-1 fi-rr-marker"></i>
                        <li onClick={() => fetchlangData(data.place_id)}>
                          {data.structured_formatting?.main_text} 
                          <p className='text-sm opacity-65'>{data.structured_formatting?.secondary_text}</p>
                          { !isLast && <p className='opacity-35'>---------------------------------</p>}
                        </li>
                      </div>
                    </div>
                  )})
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <div onClick={handleLogin} className={'w-full h-full z-30 bg-black/50 absolute ' + (loginvisible ? "visible" : "invisible")}></div>
        <div className={'bg-white flex w-full md:w-[40%] h-full z-40 fixed duration-500 p-5 ' + (loginvisible ? "right-0" : "-right-[100%]")}>
          <div className='m-3 w-full lg:w-[60%]'>
            <i onClick={handleLogin} className="fi fi-br-cross cursor-pointer"></i>
            <div className='w-full my-10 flex justify-between items-center'>
              <h2 className='font-bold text-4xl border-b-2 border-black pb-5'>Login</h2>
              <img className='w-28' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
            </div>

            <SigninBtn/>
            <p className='text-sm mt-2 opacity-70'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>

          </div>
        </div>
      </div>
    
    <div className='relative w-full'>

      <div className='w-full sticky top-0 z-20 shadow-md h-20 flex justify-center items-center'>
        <div className='w-full md:w-[80%] flex justify-between'>
          <div className='flex items-center'>
            <Link to={"/"}>
              <div className='w-16'>
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-swiggy-logo-icon-svg-download-png-1369418.png?f=webp" alt="" />
              </div>
            </Link>
            <div className='flex items-center gap-1 cursor-pointer' onClick={handleVisiblity}>
              <p className='flex'>
                <span className='font-bold border-b-2 border-black'>Others</span>
                <span className='ml-1 line-clamp-1 opacity-85 text-sm mt-1'>{Address}</span>
              </p>
              <i className="fi fi-br-angle-small-down mt-2 text-orange-400 text-2xl"></i>
            </div>
          </div>

          <div className='hidden md:flex items-center gap-2 md:gap-14'>
            {
              navItems.map((data) => (
                  data.name == "Sign in" ? (
                <div key={data.path} onClick={handleLogin}>
                  <div className='flex items-center gap-3 cursor-pointer'>
                    { userData ? (<img className='rounded-full w-12' src={userData.photo} alt="" />) : (<span className='mt-1 text-gray-700 '>{data.image}</span>)}
                    <p className='text-lg font-medium text-gray-700 hover:text-orange-400'>{userData ? userData.name : data.name}</p>
                    { data.name === "Cart" && cartData.length > 0 && <p>{cartData.length}</p> }
                  </div>
                </div>
                  ) : (
                <Link key={data.path} to={data.path}>
                  <div className='flex items-center gap-3 cursor-pointer'>
                    <p className='mt-1 text-gray-700'>{data.image}</p>
                    <p className='text-lg font-medium text-gray-700 hover:text-orange-400'>{data.name}</p>
                    { data.name === "Cart" && cartData.length > 0 && <p>{cartData.length}</p> }
                  </div>
                </Link> )
              ))
            }
          </div>
          <div className='flex items-center md:hidden gap-10 mr-4'>
            {
              navItems.map((data) => (
                data.name == "Sign in" ? (
                <div key={data.path} onClick={handleLogin}>
                  <span className='mt-1 text-gray-700 '>{data.image}</span>
                </div> 
                ) : (
                <Link key={data.path} to={data.path}>
                  <span className='mt-1 text-gray-700 '>{data.image}</span>
                  {
                    data.name == "Cart" && <span>{cartData.length}</span>
                  }
                </Link> )
              ))
            }
          </div>

        </div>
      </div>

      <Outlet/>
    </div>
  </>
  )
}

export default Navbar;
