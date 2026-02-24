import React from 'react'
import { addToCart } from '../utils/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

function AddToCartBtn({info , resInfo , handleIsDiffRes}) {

    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const getResInfoFromLocalStorage = useSelector((state) => state.cartSlice.resInfo)
    const dispatch = useDispatch()

    function handleAddToCart(){
          const isAdded = cartData.find((data) => data.id === info.id)
          if(!isAdded){
            if(getResInfoFromLocalStorage.name === resInfo.name || getResInfoFromLocalStorage.length === 0){
              dispatch(addToCart({info , resInfo}))
              toast.success("Food added to the cart")
            }else{
              toast.error("diffrent restaurent item " )
            }
        
          }else{
            toast.error("Already Added ")
            handleIsDiffRes();
          }
        }

  return (
    <div>
        {/* onClick={handleAddToCart} */}
      <button onClick={handleAddToCart} className="bg-white absolute bottom-[-20px] left-1/2  -translate-x-1/2 text-lg text-green-700 font-bold rounded-xl border px-10 py-2 drop-shadow">Add</button>
    </div>
  )
}

export default AddToCartBtn;
