import React, { useEffect, useState } from 'react'
import RestaurentCard from './RestaurentCard';

function TopRestaurent({data , title}) {
  // console.log(data)

    const [value , setValue] = useState(0);

    function handlePrev(){
      value <= 0 ? "" : setValue((prev) => prev - 40)
    }

    function handleNext(){
      value >= 440 ? "" : setValue((prev) => prev + 40)
    }
    // console.log(value)

  return (
    <div className='mt-10'>
      <div className='flex justify-between my-5'>
            <h1 className='font-bold text-3xl'>{title}</h1>
            <div className='flex gap-2'>
              <div onClick={handlePrev} className={`rounded-full w-7 h-7 cursor-pointer ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                <i className={`fi fi-rr-arrow-small-left text-2xl ` + (value <= 0 ? "text-gray-300" : "text-gray-800")}></i>
              </div>
              <div onClick={handleNext} className={`rounded-full w-7 h-7 cursor-pointer ` + (value >= 440 ? "bg-gray-100" : "bg-gray-200")}>
                <i className={`fi fi-rr-arrow-small-right text-2xl ` + (value >= 440 ? "text-gray-300" : "text-gray-800")}></i>
              </div>
            </div>
          </div>
          <div className={`flex mt-2 gap-5 duration-700`} style={{translate : `-${value}%`}}>
            {
                data?.map(({ info , cta : { link }}) => (
                  <div key={info.id} className='hover:scale-95 duration-300'>
                      <RestaurentCard {...info} link={link}/>
                  </div>
                ))
            }
          </div>
          <hr className='border mt-10' />
    </div>
  )
}

export default TopRestaurent;
