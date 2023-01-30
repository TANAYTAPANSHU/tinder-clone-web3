import Head from "next/head";
import Image from "next/image";
import Card from "../components/Card";
import Header from "../components/Header";
import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useState, useContext } from "react";
import LandingPage from "../components/LandingPage";
import { TinderContext } from "../context/TinderContext";

const style = {
  wrapper: `h-screen w-screen flex flex-col bg-[#222229]`,
  cardsContainer: `flex flex-col  items-center justify-center mb-10 md:mt-0 usm:my-10  `,
};

export default function Home() {
  const  { userData,users }= useContext(TinderContext)
  const [login,setLogin] = useState(false)
  return (
    <div className={style.wrapper}>
      {/* <Header /> */}
      <Header />
      {userData.length <1? (

        <LandingPage setLogin={setLogin} />

      ) : (
        <div className={style.cardsContainer}>
          <Card />
        </div>
      )}
    </div>
  );
}
