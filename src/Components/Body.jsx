import React, { useContext, useEffect, useState } from 'react'
import OnYourMind from './OnYourMind';
import TopRestaurent from './TopRestaurent';
import OnlineFoodDelivery from './OnlineFoodDelivery';
import { Coordinates } from '../Context/ContextApi';
import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';
import useRestaurantsData from '../hooks/useRestaurantsData';

function Body() {

  const [topRestaurentData , onYourMindData , topResTitle , onlineTitle , data] = useRestaurantsData()

  const filterVal = useSelector((state) => state?.filterSlice?.filterVal)
  // console.log(filterVal)

  const filteredData = topRestaurentData?.filter((item) => {
    if(!filterVal) return true;

    switch (filterVal) {
      case "Ratings 4.0+" : return item?.info?.avgRating > 4
      case "Offers" : return item?.info?.aggregatedDiscountInfoV3 ? true : false;
      case "Rs. 300-Rs. 600" : return item?.info?.costForTwo?.slice(1,4) >= "300" && item?.info?.costForTwo?.slice(1,4) <= "600"
      case "Less than Rs. 300" : return item?.info?.costForTwo?.slice(1,4) < "300"
      default : return true;
    }
  });

  if(data.communication){
    return <div className='flex h-screen justify-center items-center flex-col'>
         <img className='w-72' src="" alt="" />
         <h1 className='text-lg'>Location Unservicible</h1>
      </div>
  }

  return (
    <div className='w-full'>
      {
        topRestaurentData.length ? (
        <div className=' w-full px-10 md:w-[82%] mx-auto mt-4 overflow-hidden'>
          {
            onYourMindData?.length > 0 ? (<>
              <OnYourMind data={onYourMindData} />
              <TopRestaurent data={topRestaurentData} title={topResTitle}/>
            </>) : ""
          }
          <OnlineFoodDelivery data={filterVal ? filteredData : topRestaurentData } title={onlineTitle}/>
        </div>) : <Shimmer/>
      }
    </div>
  )
}

export default Body;
