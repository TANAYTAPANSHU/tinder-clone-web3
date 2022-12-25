import { useState, createContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { faker } from "@faker-js/faker";
import { ethers } from "ethers";

export const TinderContext = createContext();

export const TinderProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [users,setUsers] = useState([])

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    fetch("http://localhost:3300/users/")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("This is the error", err);
      });
  };

  // const handleRightSwipe = async (cardData, currentUserAddress) => {
  //   const likeData = {
  //     likedUser: cardData.walletAddress,
  //     currentUser: currentUserAddress,
  //   };

  //   try {
  //     await fetch("/api/saveLike", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(likeData),
  //     });

  //     const response = await fetch("/api/checkMatches", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(likeData),
  //     });

  //     const responseData = await response.json();

  //     const matchStatus = responseData.data.isMatch;

  //     if (matchStatus) {
  //       const mintData = {
  //         walletAddresses: [cardData.walletAddress, currentUserAddress],
  //         names: [cardData.name, currentUser.name],
  //       };

  //       await fetch("/api/mintMatchNft", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(mintData),
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <TinderContext.Provider
      value={{
        userData,
        setUserData,
        users
      }}
    >
      {children}
    </TinderContext.Provider>
  );
};
