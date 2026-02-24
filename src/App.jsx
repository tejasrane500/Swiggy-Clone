import './App.css'
import { Route, Routes } from 'react-router-dom';
// import Body from './Components/Body'
// import Navbar from './Components/Navbar'
// import RestaurentMenu from './Components/RestaurentMenu';
import { CartContext, Coordinates, Visiblity } from './Context/ContextApi';
import React, { lazy, Suspense, useEffect, useState } from 'react';
// import Cart from './Components/Cart';
import { useSelector } from 'react-redux';
import SigninBtn from './Components/SigninBtn';
// import Search from './Components/Search';

const Search = lazy(() => import("./Components/Search"))
const Navbar = lazy(() => import("./Components/Navbar"))
const Body = lazy(() => import("./Components/Body"))
const Cart = lazy(() => import("./Components/Cart"))
const RestaurentMenu = lazy(() => import("./Components/RestaurentMenu"))

function App() {

  const [coord , setCoord] = useState({lat : 18.9690247 , lng : 72.8205292})

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)
  const loginvisible = useSelector((state) => state.toggleSlice.loginToggle)

  return (
      <Coordinates.Provider value={{coord , setCoord}}>
          <div className={(visible || loginvisible ? "max-h-screen overflow-hidden" : " ")}>
            <Suspense fallback="Loading....">
              <Routes>
                <Route path='/' element={<Navbar/>}>
                    <Route path='/' element={<Body/>} />
                    <Route path='/restaurentMenu/:id' element={<RestaurentMenu/>} />
                    <Route path='/cart' element={<Cart/>} />
                    <Route path='/search' element={<Search/>} />
                    <Route path='*' element={<h1>Page Not Found</h1>} />
                </Route>
              </Routes>
            </Suspense>
          </div>
      </Coordinates.Provider>
  )
}

export default App
