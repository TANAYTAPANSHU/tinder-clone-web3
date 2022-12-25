

import React from 'react'
import { IoIosNotifications } from 'react-icons/io'
import Image from 'next/image'
import { useContext } from 'react'
import { TinderContext } from '../context/TinderContext'

const style = {
  wrapper: `flex items-center bg-white w-full h-20 p-12 justify-between `,
  profileImage: `object-cover rounded-full `,
  logo: `object-contain`,
  notificationIcon: `text-3xl cursor-pointer text-gray-400 absolute`,
  notifications: `h-2 w-2 flex rounded-full relative bg-red-500 -top-3 -right-5`,
}

const CardHeader = () => {
  const { userData } = useContext(TinderContext)
  return (
    <div className={style.wrapper}>
      <Image
        src={userData?.image_url || "https://bafybeies3hqdurwhuhuuk765z43twttvig4zumlmhzqzpgoc5zj5wn2h3q.ipfs.w3s.link/nft_ape.jpeg"}
        width={40}
        height={40}
        alt='profile-pic'
        className={style.profileImage}
      />
      <Image
        src="http://bafybeihsuwkuf2oirhxrpkfhs24fnqzy3czrp567j7aw6fnzmzgqdsrzhe.ipfs.localhost:8080/?filename=Tinder%20Flame%20vector%20logo%20(_EPS%20%2B%20.SVG%20%2B%20.CDR)%20download%20for%20free"
        height={150}
        width={60}
        alt='logo'
        className={style.logo}
      />
      <div className='flex items-center'>
        <IoIosNotifications className={style.notificationIcon} />
        <div className={style.notifications} />
      </div>
    </div>
  )
}

export default CardHeader