import { useState, useContext, useEffect } from "react";
import { TinderContext } from "../context/TinderContext";
import { FaUndoAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { BsFillLightningChargeFill } from "react-icons/bs";
import TinderCard from "react-tinder-card";

const style = {
  tinderCardWrapper: `w-full h-full absolute`,
  wrapper: `w-full h-full overflow-hidden bg-no-repeat bg-cover bg-center relative px-8 py-4`,
  space: `flex justify-between h-3/4 items-end mb-6`,
  name: `flex text-white text-3xl font-extrabold items-center -mb-4`,
  age: `ml-4 font-semibold text-xl`,
  walletAddress: `font-bolder text-xl text-white mb-2`,
  reactionsContainer: `flex justify-between w-full px-2 gap-5`,
  buttonContainer: `h-16 w-16 rounded-full flex items-center justify-center cursor-pointer border-2`,
  buttonSymbol: `text-3xl`,
  backColors: `border-white text-white`,
  xColors: `border-red-500 text-red-500`,
  starColors: `border-blue-400 text-blue-400`,
  lightningColors: `border-purple-500 text-purple-500`,
};

const TinderCardItem = ({ card }) => {
  const [address, setAddress] = useState();



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

  const onSwipe = (dir) => {
    if (dir === "right") {
      handleRightSwipe(card, address);
    }
  };

  const handleRightSwipe = async (cardData, currentUserAddress) => {
    const likeData = {
      likedUser: cardData.walletAddress,
      currentUser: currentUserAddress,
    };

    try {
      await fetch("/api/saveLike", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likeData),
      });

      const response = await fetch("/api/checkMatches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(likeData),
      });

      const responseData = await response.json();

      const matchStatus = responseData.data.isMatch;

      if (matchStatus) {
        const mintData = {
          walletAddresses: [cardData.walletAddress, currentUserAddress],
          names: [cardData.name, currentUser.name],
        };

        await fetch("/api/mintMatchNft", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mintData),
        });
      }
    } catch (error) {
      console.error(error);
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
        style={{ backgroundImage: `url('${card.image_url
        }')` }}
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
          <div className={`${style.lightningColors} ${style.buttonContainer}`}>
            <BsFillLightningChargeFill
              className={`${style.lightningColors} ${style.buttonSymbol}`}
            />
          </div>
        </div>
      </div>
    </TinderCard>
  );
};

export default TinderCardItem;
