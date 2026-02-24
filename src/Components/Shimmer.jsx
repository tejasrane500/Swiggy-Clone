import React from 'react'

function Shimmer() {
  return (
    <div className='w-full'>
        <div className='w-full text-white flex justify-center items-center gap-5 flex-col h-[350px] bg-slate-900'>
            <div className='relative'>
                <img className='w-16 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
                <span className="loader"></span>
            </div>
            <h1 className='text-2xl'>Looking for great food near you...</h1>
        </div>

        <div className='w-[70%] mx-auto py-5 flex flex-wrap gap-4'>
          {
            Array(12).fill("").map((data , i) => (<div key={i} className='w-[250px] h-[182px] animate rounded-md'></div>))
          }
        </div>
    </div>
  )
}

export default Shimmer

export function MenuShimmer(){

  return (
    <div className='md:w-[50%] w-full mx-auto mt-10'>
      <div className='w-full h-40 sm:h-80 rounded-xl animate'></div>

      <div className='w-full flex justify-between mt-10'>
        <div className='w-[40%] h-10 rounded-xl animate'></div>
        <div className='w-[40%] h-10 rounded-xl animate'></div>
      </div>

      <div className='w-full mt-20 flex flex-col gap-5'>
        {
          Array(12).fill("").map((data , i) => (<div key={i} className='w-full h-40 flex justify-between'>
          <div className='w-[60%] flex flex-col gap-5 h-full'>
            <div className='w-[100%] h-5 animate'></div>
            <div className='w-[50%] h-5 animate'></div>
            <div className='w-[30%] h-5 animate'></div>
          </div>
          <div className='w-[30%] rounded-xl h-full animate'></div>
        </div>))
        }
      </div>
    </div>
  )
}

export function SearchShimmer(){
  return (
    <div className="w-full md:w-[800px] mx-auto mt-6 px-4">

      {/* Shimmer List Items */}
      <div className="space-y-4">
        {Array(6).fill("").map((_, index) => (
          <div key={index} className="p-2 bg-white border-b border-gray-100 flex flex-col gap-3">
            {/* Small Icon/Square Placeholder */}
            <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-sm"></div>
            
            {/* Long Title Line */}
            <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
            
            {/* Shorter Subtitle Line */}
            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
            
            {/* Very Short Line (like price or rating) */}
            <div className="h-3 w-20 bg-gray-100 animate-pulse rounded mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
