import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'
import { GiDiamonds } from 'react-icons/gi'
import { TiMessages } from 'react-icons/ti'

const style = {
  wrapper: `h-16 w-full flex items-center justify-around py-5 px-4 bg-white`,
  logo: `object-contain cursor-pointer`,
  icon: `text-3xl text-gray-400 cursor-pointer`,
}

const CardFooter = () => {
  return (
    <div className={style.wrapper}>
      <Image
        src="http://bafybeihsuwkuf2oirhxrpkfhs24fnqzy3czrp567j7aw6fnzmzgqdsrzhe.ipfs.localhost:8080/?filename=Tinder%20Flame%20vector%20logo%20(_EPS%20%2B%20.SVG%20%2B%20.CDR)%20download%20for%20free"
        height={35}
        width={35}
        alt='fire-logo'
        className={style.logo}
      />
      {/* <FaSearch className={style.icon} />
      <GiDiamonds className={style.icon} /> */}
      <TiMessages className={style.icon} />
    </div>
  )
}

export default CardFooter