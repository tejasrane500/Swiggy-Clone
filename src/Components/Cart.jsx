import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/ContextApi'
import { data, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteItem } from '../utils/cartSlice';
import toast from 'react-hot-toast';
import { toggleLogin } from '../utils/toggleSlice';

    let veg = "https://www.clipartmax.com/png/middle/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png"
    let NonVeg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINFWPFlIwIGkKZksoI0Kjr1V9jOU4fl86hw&s"

function Cart() {

    // const {cartData , setCartData} = useContext(CartContext);
    // console.log(cartData)

    const navigate = useNavigate()
    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const resInfo = useSelector((state) => state.cartSlice.resInfo)
    const userData = useSelector((state) => state.authSlice.userData)
    const dispatch = useDispatch()

    let totalPrice = 0;
    for(let i = 0 ; i < cartData.length ; i++){
        totalPrice = totalPrice + cartData[i].defaultPrice / 100 || cartData[i].price / 100
    }

    function handleRemoveFromCart(i){
        if(cartData.length > 1){
            let newArr = [...cartData]
            newArr.splice(i,1)
            // setCartData(newArr)
            dispatch(deleteItem(newArr))
            toast.success("Food removed")
        }else{
            handleClearCart();
            toast.success("cart cleared")
        }
    }

    if(cartData.length === 0) {
        return <div className='w-full'>
            <div className='w-[50%] mx-auto'>
                <h1>Kuch order krle bhai</h1>
                <Link to={"/"} className='bg-green-500'>Yaha se krle bhai</Link>
            </div>
        </div>
    }

    function handleClearCart(){
        dispatch(clearCart())
        // setCartData([]);
        // localStorage.setItem("cartData" , JSON.stringify([]));
        // localStorage.clear();
    }

    function handlePlaceOrder(){
        if(!userData){
            toast.error("Login Karle Bhai");
            dispatch(toggleLogin())
            return;
        }
        toast.success("order placed")
    }

  return (
    <div className='w-full'>
      <div className='w-[95%] md:w-[800px] mx-auto'>

        <Link to={`/restaurentMenu/${resInfo.id}`}>
            <div className='my-10 flex gap-5'>
                <img className="rounded-xl w-40 aspect-square" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + (resInfo.imageId || resInfo.cloudinaryImageId)} alt=""/>
                <div>
                    <p className='text-5xl border-b-2 border-black pb-3'>{resInfo.name}</p>
                    <p className='mt-3 text-xl'>{resInfo.areaName}</p>
                </div>
            </div>
        </Link>
        <hr className='my-5 border-2'/>

        <div>
            {
                cartData.map(({
        name,
        defaultPrice,
        price,
        itemAttribute,
        ratings: {
            aggregatedRating: { rating, ratingCountV2 },
        },
        description = "",
        imageId,
    }) => {
        //  const [isMore , setIsMore] = useState(false)
        
            let trimDesc = description.substring(0, 140) + "..."
            return (
                <>
                    <div key={imageId} className="flex w-full my-5 justify-between min-h-[182px]">
                        <div className="w-[55%] md:w-[70%]">
                            <img
                                className="w-5 rounded-sm"
                                src={
                                    itemAttribute &&
                                    itemAttribute.vegClassifier == "VEG"
                                        ? veg
                                        : NonVeg
                                }
                                alt=""
                                srcSet=""
                            />
                            <h2 className="font-bold text-lg">{name}</h2>
                            <p className="font-bold text-lg">
                                ₹{defaultPrice / 100 || price / 100}{" "}
                            </p>

                            <div className="flex items-center gap-1">
                                {" "}
                                <i className={"fi mt-1 text-xl fi-ss-star"}></i>{" "}
                                <span>
                                    {rating} ({ratingCountV2})
                                </span>
                            </div>

                            <div className='line-clamp-2'>{description}</div>

                            {/* {description.length > 140 ? (
                                <div>
                                    <span className=" line-clamp-2 md:line-clamp-none ">
                                        {isMore ? description : trimDesc}
                                    </span>
                                    <button
                                        className="hidden md:block font-bold"
                                        onClick={() => setIsMore(!isMore)}
                                    >
                                        {isMore ? "less" : "more"}
                                    </button>
                                </div>
                            ) : (
                                <span className="">{description}</span>
                            )} */}
                        </div>
                        <div className="w-[40%] md:w-[20%] relative h-full">
                            <img
                                className="rounded-xl aspect-square"
                                src={
                                    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                                    imageId
                                }
                                alt=""
                            />
                            <button
                                onClick={handleRemoveFromCart}
                                className="bg-red-500 absolute bottom-[-20px] left-1/2  -translate-x-1/2 text-lg text-white font-bold rounded-xl border px-5 py-2 drop-shadow"
                                >
                                Remove
                            </button>
                            {/* <AddToCartBtn
                                info={info}
                                resInfo={resInfo}
                                handleIsDiffRes={handleIsDiffRes}
                            /> */}
                        </div>
                    </div>
                    <hr className="my-5" />
                </>
                )})
            }
        </div>
        <h1 className='text-2xl'>Total - <span className='font-bold'>₹{totalPrice}</span></h1>
        <div className='flex justify-between'>
            <button onClick={handlePlaceOrder} className='p-3 bg-green-600 rounded-lg my-7'>Place order</button>
            <button onClick={handleClearCart} className='p-3 bg-green-600 rounded-lg my-7'>Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;
