import React, { useContext, useEffect } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../Context/userContext';
import Card from '../Component/card';

function MyBooking() {
  let navigate = useNavigate()

  let { userData } = useContext(userDataContext)


  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative px-[20px]'>
      <div className='w-[50px] h-[50px] bg-[#f14242] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center' onClick={() => navigate("/")}>
        <FaArrowLeft className='w-[25px] h-[25px] text-[white] ' />
      </div>
      <div className='w-[60%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] md:w-[600px] text-nowrap px-[20px]'>MY BOOKING</div>
      <div className='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]'>
        {userData?.booking?.length > 0 ? (
          userData.booking.map((list) => (
            <Card
              key={list._id}
              title={list.listing?.title}
              landmark={list.listing?.landMark}
              city={list.listing?.city}
              image1={list.listing?.image1}
              image2={list.listing?.image2}
              image3={list.listing?.image3}
              rent={list.listing?.rent}
              id={list.listing?._id}
              isBooked={list.listing?.isBooked}
              ratings={list.listing?.ratings}
              host={list.listing?.host}
            />
          ))
        ) : (
          <div>No booking found</div>
        )}

      </div>
    </div>
  )
}

export default MyBooking