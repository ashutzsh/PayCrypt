const {ethers} = require('ethers')
const payCrypt = require('./paycrypt/PayCrypt.json')

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/VmwWduw8zoltPAqRJLBLNY2Axej0TMVA");

// Contracts 
const payCryptContract = new ethers.Contract('0xFd2BD5Fc4211EAc0027C4862dE2e0eAF81Fa81D5', payCrypt.abi, provider);

async function getData() {
    const get = await payCryptContract.filters.recipients()
    const trans = await payCryptContract.queryFilter(get);
    console.log(trans)
  }
  
getData()