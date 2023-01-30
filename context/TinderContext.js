import { useState, createContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { faker } from "@faker-js/faker";
import { ethers } from "ethers";
import abi from "../utils/TinderERC721.json";

export const TinderContext = createContext();

export const TinderProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeUserNull = () =>{

  setUserData([])

  }

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

  const handleRightSwipe = async () => {
    let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = abi.abi;
    if (ethereum) {
      console.log("This is the contractABI ", contractABI, ethereum);
      //injected metamask object, we are making the connection to the blockchain
      const provider = new ethers.providers.Web3Provider(ethereum, "any");

      //We are getting the ablity to sign the contract
      const signer = provider.getSigner();
      const tinderContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      let metadata = {
        name: `tanay & tapanshu`,
        description: `just matched!`,
        image: `https://ipfs.filebase.io/ipfs/QmVof9goPgwgVHzJPMWdnh5AL2VV269AsRJHSG1cRLSc4r`,
      }

      console.log("buying coffee..")
      metadata = JSON.stringify(metadata)
      console.log(metadata)
      const coffeeTxn = await tinderContract.minNFT(
        "0x08669c40C57fcE2FB807BF17336a8da41a5C7163",
        "0xb4800cDfa6365f2Af3E392fc4b7262CD872d8446",
        metadata
      );

      await coffeeTxn.wait();

      console.log("mined ", coffeeTxn.hash);

      console.log("coffee purchased!");
    }
  };
 

  return (
    <TinderContext.Provider
      value={{
        userData,
        setUserData,
        users,
        handleRightSwipe,
        makeUserNull
      }}
    >
      {children}
    </TinderContext.Provider>
  );
};
