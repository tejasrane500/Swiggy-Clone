import React from 'react'
import { Link } from 'react-router-dom'

function RestaurentCard(info) {
  // console.log(info.link.split("/")[5]);
  return (
    <Link to={`/restaurentMenu/${info.link.split("/").at(-1)}`}>
      <div className='min-w-[295px] h-[182px] relative'>
            <img className='w-full h-full rounded-2xl object-cover' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + info?.cloudinaryImageId} alt="" />
            <div className='bg-gradient-to-t from-black from-1% to-transparent to-40% rounded-2xl w-full h-full absolute top-0'></div>
            <p className='absolute bottom-0 text-white text-2xl ml-2 mb-1 font-bold'>{info?.aggregatedDiscountInfoV3 ?  info?.aggregatedDiscountInfoV3?.header + " " + info?.aggregatedDiscountInfoV3?.subHeader : ""   }</p>
        </div>
        <div className='mt-2'>
            <h2 className='text-lg font-semibold'>{info?.name}</h2>
            <p className='flex items-center gap-1 text-base font-semibold'><i className="fi fi-ss-circle-star text-green-500 text-lg mt-1"></i> {info?.avgRating} <span>{info?.sla?.slaString}</span></p>
            <p className='line-clamp-1 text-black/70 font-medium'>{info?.cuisines?.join(", ")}</p>
            <p className='line-clamp-1 text-black/70 font-medium'>{info?.locality}</p>
        </div>
    </Link>
  )
}

export default RestaurentCard
