import React, { useContext } from 'react'
import Nav from '../Component/Nav'
import Card from '../Component/card';
import SkeletonCard from '../Component/SkeletonCard';

import { listingDataContext } from '../Context/listingContext';

function Home() {
  let { newlistData, loading } = useContext(listingDataContext);

  return (
    <div>
      <Nav />
      <div className='w-[100vw] h-[77vh] flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px] '>

        {loading
          ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : newlistData && newlistData.map((list) => (
            <Card
              key={list._id}
              title={list.title}
              landmark={list.landMark}
              city={list.city}
              image1={list.image1}
              image2={list.image2}
              image3={list.image3}
              rent={list.rent}
              id={list._id}
              ratings={list.ratings}
              isBooked={list.isBooked}
              host={list.host}
              guest={list.guest}
            />
          ))
        }

      </div>
    </div>
  )
}

export default Home
