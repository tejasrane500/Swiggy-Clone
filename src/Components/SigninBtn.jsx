import React from 'react'
import { auth ,provider } from '../Config/firebaseAuth'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { addUserData, removeUserData } from '../utils/authSlice'
import { data, useNavigate } from 'react-router-dom'
import { toggleLogin } from '../utils/toggleSlice'

function SigninBtn() {

  const userData = useSelector((state) => state.authSlice.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleAuth(){
    let data = await signInWithPopup(auth , provider)
    const userData = {
      name : data.user.displayName,
      photo : data.user.photoURL,
    }
    dispatch(addUserData(userData))
    dispatch(toggleLogin())
    navigate("/")
  }

  async function handleLogout() {
    await signOut(auth)
    dispatch(removeUserData())
    dispatch(toggleLogin())
  }

  return (
    <>
      {
        userData ? (
          <button onClick={handleLogout} className='w-full mt-5 text-2xl bg-orange-600 text-white p-5'>
            Logout
          </button>
        ) : (
          <button onClick={handleAuth} className='w-full mt-5 text-2xl bg-orange-600 text-white p-5'>Login With GOOGLE <i className="fi text-xl fi-brands-google"></i></button>
        )
      }
      
    </>
  )
}

export default SigninBtn;

