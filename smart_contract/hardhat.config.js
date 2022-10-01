require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const myPrivateKey = process.env.PRIVATE_KEY;
const alchemyUrl = process.env.ALCHEMY_URL;
const polygonalchemyUrl = process.env.POLYGON_ALCHEMY_URL;
module.exports = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${alchemyUrl}`, //Alchemy Link Key
      accounts: [`${myPrivateKey}`] //Private Key
    },
    polygon: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${polygonalchemyUrl}`, //Alchemy Link Key
      accounts: [`${myPrivateKey}`] //Private Key
    },
  },
};
