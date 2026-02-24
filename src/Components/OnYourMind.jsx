import React, { useEffect, useState } from 'react'

function OnYourMind({data}) {

        const [value , setValue] = useState(0)
    
        function handleNext(){
          value >= 188 ? "" : setValue((prev) => prev + 47)
        }
    
        function handlePrev(){
          value <= 0 ? "" : setValue((prev) => prev - 47)
        }

  return (
    <div>
      <div className='flex justify-between'>
            <h1 className='font-bold text-3xl'>What's on Your Mind?</h1>
            <div className='flex gap-2'>
              <div onClick={handlePrev} className={`rounded-full w-7 h-7 cursor-pointer ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                <i className={`fi fi-rr-arrow-small-left text-2xl ` + (value <= 0 ? "text-gray-300" : "text-gray-800")}></i>
              </div>
              <div onClick={handleNext} className={`rounded-full w-7 h-7 cursor-pointer ` + (value >= 188 ? "bg-gray-100" : "bg-gray-200")}>
                <i className={`fi fi-rr-arrow-small-right text-2xl ` + (value >= 188 ? "text-gray-300" : "text-gray-800")}></i>
              </div>
            </div>
          </div>
          
          <div style={{translate : `-${value}%`}} className={`flex mt-2 duration-700`}>
            {
                data?.map((item) => (
                    <img key={item.id} className='w-44' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/${item.imageId}`} alt="" />
                ))
            }
          </div>
          <hr className='border' />
    </div>
  )
}

export default OnYourMind;

