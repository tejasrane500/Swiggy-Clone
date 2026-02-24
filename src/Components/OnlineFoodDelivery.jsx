import React, { useState } from 'react'
import RestaurentCard from './RestaurentCard';
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../utils/filterSlice';

function OnlineFoodDelivery({data , title}) {

  const filterOptions = [
    {
      filterName : "Ratings 4.0+"
    },
    {
      filterName : "Offers"
    },
    {
      filterName : "Rs. 300-Rs. 600"
    },
    {
      filterName : "Less than Rs. 300"
    },
  ]

  const [activeBtn , setActivBtn] = useState(null)

  const dispatch = useDispatch()

  function handleFilterBtn(filterName){
    setActivBtn(activeBtn === filterName ? null : filterName)
  }
  dispatch(setFilterValue(activeBtn))

  return (
    <div className='mt-10'>
      <h1 className='font-bold text-3xl my-7'>{title}</h1>
      <div className='my-5 flex flex-wrap gap-2'>
        {
          filterOptions.map((data , i) => (
            <button key={i} onClick={() => handleFilterBtn(data.filterName)} className={'filterBtn flex gap-2 ' + (activeBtn === data.filterName ? "Active" : "")}>
              <p>{data.filterName}</p>
              <i className="fi text-xl fi-rs-cross-small hidden"></i>
            </button>
          ))
        }
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-7 mt-2'>
        {
            data?.map(({ info , cta : { link }}) => (
              <div key={info.id} className='hover:scale-95 duration-300'>
                  <RestaurentCard {...info} link={link}/>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default OnlineFoodDelivery;
