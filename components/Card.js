import React from 'react'
import { useContext } from 'react'
// import { TinderContext } from '../context/TinderContext'
import { SiTinder } from 'react-icons/si'
import CardHeader from './CardHeader'
import CardFooter from './CardFooter'
import dynamic from 'next/dynamic'
import { TinderContext } from '../context/TinderContext'
import { useWeb3 } from "@3rdweb/hooks";
import { useEffect } from 'react';

const TinderCardItem = dynamic(() => import("./TinderCardItem"),{ssr:false});


const style = {
    wrapper: `h-[45rem] w-[27rem] flex flex-col rounded-lg overflow-hidden`,
    cardMain: `w-full flex-1 relative flex flex-col justify-center items-center bg-gray-500`,
    noMoreWrapper: `flex flex-col justify-center items-center absolute`,
    tinderLogo: `text-5xl text-red-500 mb-4`,
    noMoreText: `text-xl text-white`,
    swipesContainer: `w-full h-full overflow-hidden`,
  }


const Card = () => {
  const { users, userData } = useContext(TinderContext)
      let users_data = users.filter((data) => (data.wallet_address !== userData.wallet_address ) )
  return ( 
    <div className={style.wrapper}>
      {console.log("this is the userData",userData.wallet_address)}
    <CardHeader />
    <div className={style.cardMain}>
      <div className={style.noMoreWrapper}>
        <SiTinder className={style.tinderLogo} />
        <div className={style.noMoreText}>
          No More Profiles in your Location...
        </div>
      </div>
      <div className={style.swipesContainer}>
      {users_data?.map((card, index) => (
            <TinderCardItem card={card} key={index} />
          ))}
        </div>
    </div>
    <CardFooter />
  </div>
  )
}

export default Card