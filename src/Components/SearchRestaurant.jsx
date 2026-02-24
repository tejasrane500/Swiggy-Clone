import React from 'react'

function SearchRestaurant({data : {card : {
        card : {
            info: {
                id ,
                cloudinaryImageId , 
                aggregatedDiscountInfoV3 = {} , 
                cuisines , 
                promoted = false , 
                costForTwoMessage , 
                name , 
                avgRating , 
                sla : { slaString }, 
            }
        }
    }}}) {


  return (
    <div className='bg-white m-4 p-4 flex gap-3 items-center md:max-w-fit'>
      <div className='w-[30%]'>
        <img className='aspect-square rounded-lg' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/" + cloudinaryImageId}  alt="" />
      </div>

      <div className='w-[70%]'>
        <p className='line-clamp-1 font-bold'>{name}</p>
        <p className='my-1'><i className='fi fi-ss-star'></i> {avgRating}. {costForTwoMessage}</p>
        <p className='line-clamp-1'>{cuisines.join(", ")}</p>
      </div>
    </div>
  )
}

export default SearchRestaurant

export function withHoc(WrappedComp) {

  return (prop) => {
    return <div className='relative'>
      <p className='absolute top-8 text-sm bg-gray-700 px-1 left-7 text-white rounded-sm'>Ad</p>
      <WrappedComp {...prop}/>
    </div>
  }
}
