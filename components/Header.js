import React from "react";
import { useContext } from 'react'
import { TinderContext } from "../context/TinderContext";
import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";



//Style of the components 
const style = {
  wrapper: `h-24 w-screen py-11 text-white flex items-center px-16 justify-between`,
  main: `flex items-center   w-full`,
  textDinder: `text-5xl font-semibold mr-8 cursor-pointer`,
  leftMenuOptions: `flex gap-8 text-lg`,
  menuItem: `cursor-pointer hover:text-red-400 duration-300 hover:scale-110`,
  rightMenuOptions: `flex gap-3 items-center`,
  currentAccount: `px-2 py-1 border border-gray-500 rounded-full flex items-center`,
  accountAddress: `ml-2`,
  authButton: `bg-white font-bold text-red-500 px-6 py-3 items-center ml-4 rounded-lg hover:bg-red-500 duration-300 hover:text-white`,
};

//Header function
const Header = () => {
  const  {connectWallet,currentAccount,setCurrentUserAccount  }= useContext(TinderContext)
  const [address,setAddress ] = useState()
  useEffect(() => {
    let userAddress = localStorage.getItem("walletAddress")
    if(userAddress)
    {
      let connectionAddress =
      userAddress[0] +
      userAddress[1] +
      userAddress[2] +
      userAddress[3] +
      userAddress[4] +
      userAddress[5] +
      "..." +
      userAddress[38] +
      userAddress[39] +
      userAddress[40] +
      userAddress[41];
      setAddress(connectionAddress)
    }
    //Connect Account Function
  }, []);
  useEffect(()=>{
    if(address){
      requestToCreateUserProfile(address, faker.name.findName())
    }
    

  },[address] )


  const requestToCreateUserProfile = async (walletAddress, name) => {
    const apiBody = {
      userWalletAddress: walletAddress,
      name: name,
    }
    try {
      await fetch(`/api/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiBody),
      });
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        <h1 className={style.textDinder}>Dinder</h1>
        <div className="flex justify-between items-center w-full  ">
        <div className={style.leftMenuOptions}>
          <div className={style.menuItem}>Problem Statement</div>
          <div className={style.menuItem}>Learn</div>
          <div className={style.menuItem}>Safety</div>
          <div className={style.menuItem}>Support</div>
        </div>

        <div className={style.rightMenuOptions}>
          { address ?(
           
            <button
              className={style.authButton}
            >
              {address}
            </button>
          ) : null}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
