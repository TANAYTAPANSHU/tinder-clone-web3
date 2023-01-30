import React from "react";
import { useContext } from "react";
import { TinderContext } from "../context/TinderContext";
import { useState, useEffect, useCallback } from "react";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import { ethers } from "ethers";
import { useRouter } from 'next/router';
//Style of the components
const style = {
  wrapper: `h-24 w-screen py-11 text-white flex items-center px-16 justify-between bg-[#222229]`,
  main: `flex  items-center     w-full sm: justify-between`,
  textDinder: `text-5xl font-semibold mr-8 cursor-pointer`,
  leftMenuOptions: ` flex justify-between gap-8 text-lg  sm:flex flex-col z-10 absolute top-20 sm:bg-black-500-rgba(0, 0, 0, 0.75) usm: right-5 bg-black-500-rgba(0, 0, 0, 0.75)`,
  menuItem: `cursor-pointer m-3 self-center justify-center hover:text-red-400 duration-300 hover:scale-110`,
  selectedmenuitem: `text-red-400 scale-110`,
  rightMenuOptions: `flex gap-3 items-center sm:block hidden`,
  currentAccount: `px-2 py-1 border border-gray-500 rounded-full flex items-center`,
  accountAddress: `ml-2`,
  authButton: `bg-white font-bold text-red-500 px-6 py-3 items-center ml-4 rounded-lg hover:bg-red-500 duration-300 hover:text-white`,
};

//Header function
const Header = () => {
  const { userData,makeUserNull } =
    useContext(TinderContext);

  //sets the address of the user
  const [address, setAddress] = useState();

  //sets isOpen for the mobile screens
  const [isOpen, setIsOpen] = useState(false);

  //check if the size of the mobile
  const [isMobile, setIsMobile] = useState(false);

  //selected menut item
  const [selectedItem, setSelectedItem] = useState("");
  
  const [provider, setProvider] = useState(null);

  //all the left menu items are stored in the array
  const leftMenuItems = [
    {
      key: "problemstatement",
      label: "Problem Statement",
      link: "/ProblemStatement",
    },
    {
      key: "learn",
      label: "Learn",
      link: "/Learn",
    },
    {
      key: "contact",
      label: "Contact",
      link: "/Contact",
    }
  ];

  const router = useRouter();
 

  //useEffect to check the windows size
  useEffect(() => {
    let etherProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(etherProvider);
     setSelectedItem(router.pathname.substring(1).toLowerCase())

  
    function handleResize() {
      setIsMobile(window.innerWidth < 450);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function removeAccount() {
    // Check if MetaMask is available
   
        // Remove the account
        setProvider(null)
        makeUserNull();
        console.log(`Account ${userData.wallet_address} is removed`);

}


  return (
    <div className={style.wrapper}>
      {userData ? ( 
            <div className={style.main}>
            <Link href="/">
              {" "}
              <h1 className={style.textDinder}>Dinder </h1>
            </Link>
            <div className="flex justify-between items-center w-full usm:ml-0  sm:justify-end ml-20  ">
              {isMobile ? (
                <div class="flex  sm:hidden">
                  <button
                    onClick={() => {
                      setIsOpen((state) => !state);
                    }}
                    class="flex items-center px-3 py-2  border rounded text-white-200 border-white-400 hover:text-white hover:border-white"
                  >
                    <svg
                      class="fill-current h-3 w-3"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className={style.leftMenuOptions}>
                      {leftMenuItems.map((item) => (
                        <Link
                          href={item.link}
                          key={item.key}
                          onClick={() => {
                            setSelectedItem(item.key);
                          }}
                          className={
                            item.key == selectedItem ? " " : style.menuItem
                          }
                        >
                          {item.label}
                        </Link>
                      ))}
                      <h3 style={{
                        color:'white'
                      }}>
                        sign out
                      </h3>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-between">
                  {leftMenuItems.map((item) => (
                    <Link
                      href={item.link}
                      key={item.key}
                      onClick={(e) => {
                        setSelectedItem(item.key);
                      }}
                      className={item.key == selectedItem ? `${style.menuItem} ${style.selectedmenuitem}` : style.menuItem}
                    >
                  {item.label}
                    </Link>
                  ))}
                   <h3 onClick={() =>{
                    removeAccount()
                   } }  className={style.menuItem}>
                        Sign Out
                      </h3>
                </div>
              )}
              <div className={style.rightMenuOptions}>
                {userData.wallet_address ? (
                  <button className={style.authButton}>{userData.wallet_address.substring(0,10) }...</button>
                ) : null}
              </div>
            </div>
          </div>
      ) :  <h1>Loading . . .</h1>}
  
    </div>
  
  );
};

export default Header;
