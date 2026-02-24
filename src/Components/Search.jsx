import React, { useContext, useEffect, useState } from 'react'
import { data } from 'react-router-dom'
import Dishes from './Dishes'
import SearchRestaurant, { withHoc } from './SearchRestaurant'
import { Coordinates } from '../Context/ContextApi'
import { useDispatch, useSelector } from 'react-redux'
import { resetSimilarResDish, toggleisSimilarResDishes } from '../utils/toggleSlice'
import { SearchShimmer } from './Shimmer'

function Search() {

    const [searchQuery , setSearchQuery] = useState("")
    const [dishes , setDishes] = useState([])
    const [restaurentData , setRestaurentData] = useState([])
    const [selectedResDish , setSelectedResDish] = useState(null)
    const [similarResDishes , setSimilarResDishes] = useState([])
    const { coord : { lat , lng }, } = useContext(Coordinates)

    const PromotedRes = withHoc(SearchRestaurant)

    const {isSimilarResDishes , city , resId , itemId , resLocation} = useSelector((state) => state.toggleSlice.similarResDish)
    const dispatch = useDispatch()

    const filterOptions = [
        {
          filterName : "Restaurent"
        },
        {
          filterName : "Dishes"
        },
    ]

  const [activeBtn , setActivBtn] = useState("Dishes")

  function handleFilterBtn(filterName){
    setActivBtn(activeBtn === filterName ? activeBtn : filterName)
  }

  function handleSearchQuery(e){
    let val = e.target.value
    if(e.keyCode == 13){
      setSearchQuery(val)
      setSelectedResDish(null)
      setDishes([])
    }
  }

  useEffect(() => {
    if(isSimilarResDishes){
        fetchSimilarRes();
    }
  }, [isSimilarResDishes])

  async function fetchSimilarRes() {
    let pathName = `/city/${city}/${resLocation}`
    let encodedPath = encodeURIComponent(pathName)
    let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`)
    let res = await data.json()
    setSelectedResDish(res?.data?.cards[1]);
    setSimilarResDishes(res?.data?.cards[2]?.card?.card?.cards);
    // console.log(res?.data?.cards[1])
    // console.log(res?.data?.cards[2]?.card?.card?.cards)
    dispatch(resetSimilarResDish())
  }

  async function fetchDishes() {
    let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=f3991565-0281-d11a-8ae4-6fa7f5f2a94c&submitAction=ENTER&queryUniqueId=b63a35fc-4e62-9f91-467f-20b872243ae6`)
    let res = await data.json()
    let finalData = (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(data => data?.card?.card?.info);
    setDishes(finalData)
  }

  async function fetchRestaurentData() {
    let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=Roll&trackingId=undefined&submitAction=ENTER&queryUniqueId=b63a35fc-4e62-9f91-467f-20b872243ae6&selectedPLTab=RESTAURANT`)
    let res = await data.json()
    const finalData = (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(data => data?.card?.card?.info)
    setRestaurentData(finalData)
  }

  useEffect(() => {
    if(searchQuery === ""){
        return
    }
    // setSearchQuery("");
    fetchDishes();
    fetchRestaurentData();
  }, [searchQuery])

  return (
    <div className='w-full md:w-[800px] mt-10 mx-auto'>
      <div className='w-full relative'>
        <i className="fi fi-rr-angle-small-left text-2xl mt-1 ml-2 absolute top-1/2 -translate-y-1/2"></i>
        <i className="fi fi-rr-search absolute top-1/2 right-0 -translate-y-1/2 mr-5"></i>
        <input onKeyDown={handleSearchQuery} className='w-full text-xl border-2 pl-8 py-3 focus:outline-none' type="text" placeholder='Search for restaurent and food' />
      </div>

      {
        !selectedResDish && (
        <div className='my-5 flex flex-wrap gap-2'>
            {
            filterOptions.map((data , i) => (
                <button key={i} onClick={() => handleFilterBtn(data.filterName)} className={'filterBtn flex gap-2 ' + (activeBtn === data.filterName ? "Active" : "")}>
                <p>{data.filterName}</p>
                </button>
            ))
            }
        </div>
      )}

      {
  dishes.length ? (
    <div className='w-full md:w-[800px] mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#f4f5f7]'>
      {
        selectedResDish ? (
          <>
            <div>
              <p className='p-2'>Item added to cart</p>
              <Dishes data={selectedResDish.card.card}/>
              <p className='p-2'>More dishes from this restaurant</p>
            </div>

            {
              similarResDishes.map((data , i) =>
                <Dishes
                  key={i}
                  data={{ ...data.card, restaurant: selectedResDish.card.card.restaurant }}
                />
              )
            }
          </>
        ) : activeBtn === "Dishes" ? (
          dishes.map((data , i) => <Dishes key={i} data={data.card.card} />)
        ) : (
          restaurentData.map((data , i) =>
            data?.card?.card?.info?.promoted
              ? <PromotedRes data={data} key={i} />
              : <SearchRestaurant data={data} key={i} />
          )
        )
      }
    </div>
  ) : (
    searchQuery ? <SearchShimmer /> : null
  )
}

    </div>
  )
}

export default Search;
