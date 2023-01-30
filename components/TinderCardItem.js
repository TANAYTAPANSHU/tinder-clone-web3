import { useState, useContext, useEffect } from "react";
import { TinderContext } from "../context/TinderContext";
import { FaUndoAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { BsFillLightningChargeFill } from "react-icons/bs";
import TinderCard from "react-tinder-card";
import abi from "../utils/TinderERC721.json";
import { ethers } from "ethers";
import { Alert } from "antd";

const style = {
  tinderCardWrapper: `w-full h-full absolute bg-yellow-700`,
  wrapper: `w-full h-full overflow-hidden bg-no-repeat bg-cover bg-center relative px-8 py-4 `,
  space: `flex justify-between h-3/4 items-end mb-6`,
  name: `flex text-white text-3xl font-extrabold items-center -mb-4`,
  age: `ml-4 font-semibold text-xl`,
  walletAddress: `font-bolder text-xl text-white mb-2`,
  reactionsContainer: `flex justify-between w-full px-2 gap-5`,
  buttonContainer: `rounded-full flex items-center justify-center cursor-pointer border-2 md:h-16 md:w-16   usm:h-11 usm:w-11` ,
  buttonSymbol: `text-3xl`,
  backColors: `border-white text-white`,
  xColors: `border-red-500 text-red-500`,
  starColors: `border-blue-400 text-blue-400`,
  lightningColors: `border-purple-500 text-purple-500`,
};

const TinderCardItem = ({ card }) => {
  const [address, setAddress] = useState();
  const { userData } = useContext(TinderContext);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      console.log("Injected Web3 Wallet is installed!");
    } else {
      alert("Add a metamask account in your browser");
    }

    let userAddress = localStorage.getItem("walletAddress");
    if (userAddress) {
      setAddress(userAddress);
    }
  }, []);

  //function is used to mint a nft
  const mintNFT = async (cardData, currentUserAddress) => {
    console.log("THi sis the card data , cirasd")
    let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = abi.abi;

    if (ethereum && currentUserAddress) {
      //injected metamask object, we are making the connection to the blockchain
      const provider = new ethers.providers.Web3Provider(ethereum, "any");

      //We are getting the ablity to sign the contract
      const signer = provider.getSigner();
      const dinderContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      let metadata = {
        name: `tanay & tapanshu`,
        description: `just matched!`,
        image: `https://ipfs.filebase.io/ipfs/QmVof9goPgwgVHzJPMWdnh5AL2VV269AsRJHSG1cRLSc4r`,
      };

      metadata = JSON.stringify(metadata);
      const dinderTxn = await dinderContract.minNFT(
        cardData.wallet_address,
        currentUserAddress,
        metadata
      );

      await dinderTxn.wait();

      Alert("mined ", dinderTxn.hash);
    }
  };

  //function to handle the right swipe
  const handleRightSwipe = async (cardData, currentUserAddress) => {
    console.log("this is the card data",cardData);
    console.log("this is the user data" , userData)
    //post the like data in the dinder_users_like table
   let createLike = {
      "user_id": userData?.id,
      "like_id":cardData?.id
      }
      
      fetch("http://localhost:3300/users/likes", {
        method: "POST",
        body: JSON.stringify(createLike),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then(() => {
          mintNFT(cardData,currentUserAddress)
        })
        .catch((error) => console.error("Error:", error));
  


  };

  const onSwipe = (dir) => {
    if (dir === "right") {
      handleRightSwipe(card, address);
    }
  };

  return (
    <TinderCard
      className={style.tinderCardWrapper}
      preventSwipe={["up", "down"]}
      onSwipe={onSwipe}
    >
      <div
        className={style.wrapper}
        style={{ backgroundImage: `url('${card.image_url}')` }}
      >
        <div className={style.space}>
          <div className={style.name}>
            {card.username}
            <span className={style.age}>{card.age}</span>
          </div>
        </div>
        <div className={style.walletAddress}>
          {card.wallet_address.slice(0, 6)}...{card.wallet_address.slice(39)}
        </div>
        <div className={style.reactionsContainer}>
          <div className={`${style.backColors} ${style.buttonContainer}`}>
            <FaUndoAlt
              className={`${style.backColors} ${style.buttonSymbol}`}
              onClick={() => goBack()}
            />
          </div>
          <div className={`${style.xColors} ${style.buttonContainer}`}>
            <AiOutlineClose
              className={`${style.xColors} ${style.buttonSymbol}`}
            />
          </div>
          <div className={`${style.starColors} ${style.buttonContainer}`}>
            <AiFillStar
              className={`${style.starColors} ${style.buttonSymbol}`}
            />
          </div>
          {/* <div className={`${style.lightningColors} ${style.buttonContainer}`}>
            <BsFillLightningChargeFill
              className={`${style.lightningColors} ${style.buttonSymbol}`}
            />
          </div> */}
        </div>
      </div>
    </TinderCard>
  );
};

export default TinderCardItem;
