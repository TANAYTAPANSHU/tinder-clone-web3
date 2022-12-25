require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

// Deployment address =  0x5FbDB2315678afecb367f032d93F642f64180aa3

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks :{
    goerli:{
      url: process.env.ALCHEMY_NETWORK_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
