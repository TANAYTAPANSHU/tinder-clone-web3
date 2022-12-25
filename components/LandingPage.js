import React from "react";
import { useState, useEffect, useContext } from "react";
import { TinderContext } from "../context/TinderContext";
import RegisterForm from "./RegisterForm";

function LandingPage(props) {
  const [address, setAddress] = useState();
  const [userAddress, setUserAddress] = useState();
  const { setUserData } = useContext(TinderContext);
  useEffect(() => {
    // Web3 Browswer Detection
    if (typeof window.ethereum !== "undefined") {
    } else {
      alert("Add a metamask account in your browser");
    }
    //Connect Account Function
  }, []);

  useEffect(() => {
    checkAccountExist(userAddress);
  }, [userAddress]);

  async function connectAccount() {
    let user_Address = localStorage.getItem("walletAddress");
    if (user_Address) {
      setUserAddress(user_Address);
      let connectionAddress =
        user_Address[0] +
        user_Address[1] +
        user_Address[2] +
        user_Address[3] +
        user_Address[4] +
        user_Address[5] +
        "..." +
        user_Address[38] +
        user_Address[39] +
        user_Address[40] +
        user_Address[41];
      setAddress(connectionAddress);
      props.setLogin(true)
    } else {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      localStorage.setItem("walletAddress", accounts);
      setUserAddress(accounts);

      const account = accounts[0];
      let connectionAddress =
        account[0] +
        account[1] +
        account[2] +
        account[3] +
        account[4] +
        account[5] +
        "..." +
        account[38] +
        account[39] +
        account[40] +
        account[41];
      setAddress(connectionAddress);
      props.setLogin(true)
    }
  }

  //Check if a account already exists
  async function checkAccountExist(userAddress) {
    //api for the get request
    await fetch(`http://localhost:3300/users/${userAddress}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data[0]);
      })
      .catch((err) => {
        console.log(`This is the error ${err}`);
      });
  }

  //Create account
  async function createAccount(userDetails) {
    //API post request to create user entry
    fetch("http://localhost:3300/users", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
       alert("Account Created !!")
       props.setLogin(true)
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url('https://ipfs.filebase.io/ipfs/QmYms5bW2BpzjCJrBDuVa2svB4PYopGmmBRKDSatEY8jR5')`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {!address ? (
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
          Welcome to Dinder
        </button>
      ) : (
        <RegisterForm wallet_address={userAddress} createAccount={createAccount} />
      )}
    </div>
  );
}

export default LandingPage;
