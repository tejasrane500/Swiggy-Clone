import React, { useContext, useEffect, useState } from 'react'
import { data, Link, useParams } from 'react-router-dom';
import { CartContext } from '../Context/ContextApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../utils/cartSlice';
import toast from 'react-hot-toast';
import AddToCartBtn from './AddToCartBtn';
import { toggleDiffRes } from '../utils/toggleSlice';
import { MenuShimmer } from './Shimmer';

let veg = "https://www.clipartmax.com/png/middle/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png"
let NonVeg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTINFWPFlIwIGkKZksoI0Kjr1V9jOU4fl86hw&s"


function RestaurentMenu() {

    const {id} = useParams();
    let mainId = id.split("-").at(-1)

    const [menuData , setMenuData] = useState([]);
    const [resInfo , setResInfo] = useState([]);
    const [discountData , setDiscountData] = useState([]);
    const [topPicksData , setTopPicksData] = useState({})
    const [value , setValue] = useState(0);
    const [topPickValue , setTopPickValue] = useState(0);
    const [currIndex , setCurrIndex] = useState(null);

    // console.log(topPicksData)

    async function fetchMenu() {
        const data = await fetch('/Menudata.json')
        const result = await data.json();
        // console.log(result?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card)
        setResInfo(result.data?.cards?.[2]?.card?.card?.info)
        setDiscountData(result?.data?.cards?.[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
        let actualMenu = (result?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data?.card?.card?.itemCards || data?.card?.card?.categories)
        setTopPicksData((result?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data => data.card.card.title == "Top Picks")[0])
        setMenuData(actualMenu)
    }

    useEffect(() => {
      fetchMenu();
    },[]);

    function handleRightSwip(){
      topPickValue >= 195 ? "" : setTopPickValue((prev) => prev + 40)
    }

    function handleLeftSwip(){
      topPickValue <= 0 ? "" : setTopPickValue((prev) => prev - 40)
    }

    function handlePrev(){
      value <= 0 ? "" : setValue((prev) => prev - 40)
    }

    function handleNext(){
      value >= 100 ? "" : setValue((prev) => prev + 40)
    }

    console.log(topPickValue)

  return (
    <div className='w-full'>
      {
        menuData.length ? (
      <div className='w-full md:w-[800px] mx-auto pt-7 px-4 md:px-0'>
        <p className='text-[12px] text-slate-500'><Link to={"/"}><span className='hover:text-slate-700 hover:cursor-pointer'>Home</span> / <span className='hover:text-slate-700 hover:cursor-pointer'>{resInfo.city}</span></Link> / <span className='text-slate-700'>{resInfo.name}</span></p>
        <h1 className='font-bold pt-5 text-2xl'>{resInfo.name}</h1>
        <div className='w-full min-h-[206px] bg-gradient-to-t from-slate-200/70 mt-2 p-3 md:p-5 rounded-[30px]'>
            <div className='w-full border px-4 pb-4 border-slate-200/70 rounded-[30px] h-full bg-white'>
              <div className='w-full'>
                <div className='flex items-center gap-1 font-semibold'>
                  <i className='fi fi-ss-circle-star mt-1 text-green-600 text-lg'></i>
                  <span>{resInfo.avgRating}</span>
                  <span>({resInfo.totalRatingsString})</span>
                  .
                  <span>{resInfo.costForTwoMessage}</span>
                </div>
                <p className='underline text-rose-400 font-semibold'>{resInfo?.cuisines?.join(", ")}</p>
  
                <div className='flex gap-2 mt-2'>
                  <div className='w-[7px] flex flex-col justify-center items-center'>
                    <div className='w-2 h-2 bg-gray-500 rounded-full'></div>
                    <div className='w-[2px] h-[20px] bg-gray-500'></div>
                    <div className='w-2 h-2 bg-gray-500 rounded-full'></div>
                  </div>
  
                  <div className='flex flex-col gap-2 text-sm font-semibold'>
                    <p>Outlet <span className='text-gray-400 font-normal'>{resInfo.locality}</span></p>
                    <p>{resInfo.sla?.slaString}</p>
                  </div>
                </div>
              </div>
              <hr className='mt-2'/>

              <div className='w-full'>
                <div className='flex items-center p-2 gap-2'>
                  <i className="fi fi-rr-biking text-xl"></i>
                  <span className='text-gray-400'>4 km Delivery fees applicable. Deliverd & Charged by the restaurent.</span>
                </div>
              </div>

            </div>
        </div>

      <div className='w-full overflow-hidden'>
         <div className='flex justify-between mt-8'>
            <h1 className='font-bold text-xl'>Deals For You</h1>
            <div className='flex gap-2'>
              <div onClick={handlePrev} className={`rounded-full w-7 h-7 cursor-pointer ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                <i className={`fi fi-rr-arrow-small-left text-2xl ` + (value <= 0 ? "text-gray-300" : "text-gray-800")}></i>
              </div>
              <div onClick={handleNext} className={`rounded-full w-7 h-7 cursor-pointer ` + (value >= 188 ? "bg-gray-100" : "bg-gray-200")}>
                <i className={`fi fi-rr-arrow-small-right text-2xl ` + (value >= 100 ? "text-gray-300" : "text-gray-800")}></i>
              </div>
            </div>
          </div>
          <div className='flex gap-4 mt-5 transition-transform duration-300 ease-in-out' style={{ transform: `translateX(-${value}%)` }}>
          {
            discountData.map((data , i) => (
              <Discount key={i} data={data}/>
            ))
          }
          </div>
      </div>

      <h2 className='text-center mt-5 s'>MENU</h2>

      <div className='w-full mt-5 relative cursor-pointer'>
        <div className='w-full p-3 text-center font-semibold text-xl bg-slate-200 rounded-2xl'>Search For dishes</div>
        <i className='fi fi-rr-search absolute top-4 right-4'></i>
      </div>

      {
        topPicksData &&
        <div className='w-full overflow-hidden'>
         <div className='flex justify-between mt-8'>
            <h1 className='font-bold text-xl'>Top Picks</h1>
            <div className='flex gap-2'>
              <div onClick={handleLeftSwip} className={`rounded-full w-7 h-7 cursor-pointer ` + (topPickValue <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                <i className={`fi fi-rr-arrow-small-left text-2xl ` + (topPickValue <= 0 ? "text-gray-300" : "text-gray-800")}></i>
              </div>
              <div onClick={handleRightSwip} className={`rounded-full w-7 h-7 cursor-pointer ` + (topPickValue >= 188 ? "bg-gray-100" : "bg-gray-200")}>
                <i className={`fi fi-rr-arrow-small-right text-2xl ` + (topPickValue >= 188 ? "text-gray-300" : "text-gray-800")}></i>
              </div>
            </div>
          </div>
          <div className='flex gap-4 mt-5 transition-transform duration-300 ease-in-out' style={{ transform: `translateX(-${topPickValue}%)` }}>
          {
            topPicksData?.card?.card?.carousel.map(({creativeId , dish: {info : {defaultPrice , price , id}}}) => (
              // console.log(data)
              <div key={id} className='min-w-[384px] h-[395px] relative'>
                <img className='w-full h-full' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" + creativeId} alt="" />
                <div className='absolute bottom-4 text-white w-full flex justify-between px-5'>
                  <p className=''>₹{defaultPrice/100 || price/100}</p>
                  <button className='px-10 py-2 font-bold text-green-700 bg-white rounded-xl'>Add</button>
                </div>
              </div>
            ))
          }
          </div>
       </div>
      }

      <div>
        {
          menuData.map(({card : {card}} , i) => (
            <MenuCard key={i} card={card} resInfo={resInfo}/>
          ))
        }
      </div>

      </div>
        ) : <MenuShimmer/>
      }
    </div>
  )
}

function MenuCard({card , resInfo}) {

  let hello = false;

  if(card["@type"]){
    hello = true
  }

  const [isOpen , setIsOpen] = useState(hello);

  function toggleDropDown(){
    setIsOpen((prev) => !prev)
  }

  if(card.itemCards){

    const {title , itemCards} = card;

    return(
      <>
        <div className='mt-7'>
          <div className='flex justify-between'>
            <h1 className={'font-bold text-' + (card["@type"] ? "xl" : "base")}>{title} ({itemCards.length})</h1>
            <i onClick={toggleDropDown} className={'fi text-2xl fi-rr-angle-small-' + (isOpen ? "up" : "down")}></i>
          </div>
          {
            isOpen && <DetailMenu itemCard={itemCards} resInfo={resInfo}/>
          }
        </div>

        <hr className={'my-5 border-[10px]'} />
      </>
    )
  }else{

    const {title , categories} = card;

    return(
      <div>
        <h1 className='font-bold text-xl'>{title}</h1>
        {
          categories.map((data , i) => (
            <MenuCard card={data} key={i} resInfo={resInfo} />
          ))
        }
      </div>
    )
  }
 
}

function DetailMenu({itemCard , resInfo}){

  return (
        <div className="my-5">
            {itemCard.map(({ card: { info } }) => (
                <DetailMenuCard key={info.id} info={info} resInfo={resInfo} />
            ))}
        </div>
    );
}

function DetailMenuCard({info , resInfo}){

  const {
        name,
        defaultPrice,
        price,
        itemAttribute,
        ratings: {
            aggregatedRating: { rating, ratingCountV2 },
        },
        description = "",
        imageId,
    } = info;

    // const {cartData , setCartData} = useContext(CartContext)

    const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes)
    const dispatch = useDispatch()

    function handleIsDiffRes(){
      dispatch(toggleDiffRes())
    }

    function handleClearCart(){
      dispatch(clearCart())
      handleIsDiffRes()
    }

    const [isMore , setIsMore] = useState(false)

    let trimDesc = description.substring(0, 140) + "..."
          
    return(

      <>
        <div className="flex w-full justify-between min-h-[182px]">
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

                {description.length > 140 ? (
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
                )}
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
                <AddToCartBtn
                    info={info}
                    resInfo={resInfo}
                    handleIsDiffRes={handleIsDiffRes}
                />
            </div>
          </div>
        <hr className="my-5" />
        {isDiffRes && (
            <div className="w-[520px] h-[204px] flex flex-col gap-2 left-[33%] p-8 border z-50 shadow-md fixed bottom-10 bg-white">
                <h1>Items already in cart</h1>
                <p>
                    Your cart contains items from other restaurant. Would
                    you like to reset your cart for adding items from this
                    restaurant?
                </p>
                <div className="flex justify-between gap-3 w-full uppercase">
                    <button
                        onClick={handleIsDiffRes}
                        className="border-2 w-1/2 p-3 border-green-600 text-green-600"
                    >
                        No
                    </button>
                    <button
                        onClick={handleClearCart}
                        className="  w-1/2 p-3 bg-green-600 text-white "
                    >
                        Yes, start Afresh
                    </button>
                </div>
            </div>
        )}
      </>
    )}

function Discount({data : {info : {header , offerLogo , couponCode}}}){
  // console.log(info)
  return(
    <div className='flex gap-2 min-w-[328px] border p-3 h-[76px] rounded-2xl'>
      <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo} alt="" />
      <div>
        <h2 className='font-bold text-xl'>{header}</h2>
        <p className='text-sm text-gray-500'>{couponCode}</p>
      </div>
    </div>
  )
}

export default RestaurentMenu;
