import React from "react";
import { useState, useEffect, useContext } from "react";
import { TinderContext } from "../context/TinderContext";
import RegisterForm from "./RegisterForm";
import { ethers } from "ethers";

// -> In this we will be connecting the metamask wallet to the dinder application
// -> There is no use of saving the wallet address in local storage
// -> ,check the Server , if the user_address exist
// -> If it doesnt exist open the registration form
// Check the backend once
// -> We can later on store the

function LandingPage(props) {
  const [address, setAddress] = useState();
  const { setUserData } = useContext(TinderContext);
  const [provider, setProvider] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [createUser, setCreateUser] = useState(false);
  useEffect(() => {
    // Web3 Browswer Detection
    if (typeof window.ethereum !== "undefined") {
      let etherProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(etherProvider);
    } else {
      alert("Add a metamask account in your browser");
    }
    //Connect Account Function
  }, []);

  //check if account is connected to dapp
  async function connectAccount() {
    // Get the list of connected accounts
    const accounts = await provider.listAccounts();

    // Check if there are any connected accounts
    if (accounts.length === 0) {
      console.log("No Ethereum accounts connected.");
      // await provider.request({ method: 'eth_requestAccounts' })
      let accounts = await ethereum.send("eth_requestAccounts");
      await provider.getSigner();
      let tanay = accounts[0]?.wallet_address;
      console.log("thi sis diasnd", tanay);
    } else {
      console.log(`Connected Ethereum account: ${accounts[0]}`);
      await provider.getSigner();
      setAddress(accounts[0]);
      setAccount(accounts[0]);
    }
  }

  //Check if a account already exists
  async function setAccount(userAddress) {
    //api for the get request
    await fetch(`http://localhost:3300/users/${userAddress}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the data ", data);
        setUserData(data[0]);
        console.log("this is the data ", data, data.length);
        if (data?.length > 0) {
          props.setLogin(true);
        } else {
          setCreateUser(true);
        }
      })
      .catch((err) => {
        console.log(`This is the error ${err}`);
      });
  }

  //Create account
  async function createAccount(userDetails) {
    console.log("this is the userDetails", JSON.stringify(userDetails));
    //API post request to create user entry
    fetch("http://localhost:3300/users", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        console.log("here i come sddasd", response);
      })
      .then((data) => {
        alert("Account Created !!");
        props.setLogin(true);
        console.log("account created ", data[0]);
        setUserData(data[0]);
      })
      .catch((error) => console.error("Error ", error));
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url('https://ipfs.filebase.io/ipfs/QmYms5bW2BpzjCJrBDuVa2svB4PYopGmmBRKDSatEY8jR5')`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {!address ? (
        provider ? (
          <button
            onClick={connectAccount}
            style={{
              backgroundColor: "white",
              padding: 20,
              backgroundColor: "transparent",
              color: "white",
              fontSize: 25,
              borderWidth: 2,
              fontWeight: "500",
            }}
          >
            Connect to Dinder
          </button>
        ) : (
          <h1>Provider not present</h1>
        )
      ) : null}

      {createUser && (
        <RegisterForm wallet_address={address} createAccount={createAccount} />
      )}
    </div>
  );
}

export default LandingPage;
