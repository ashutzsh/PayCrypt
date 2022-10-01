const main = async () => {
    const PayCryptContract = await hre.ethers.getContractFactory("PayCrypt");
    const paycryptContract = await PayCryptContract.deploy();
  
    await paycryptContract.deployed();
  
    console.log("Transactions address: ", paycryptContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); //It means process ran successfully
    } catch (error) {
      console.error(error);
      process.exit(1); //It means there was an error
    }
  };
  
  runMain(); //Running the runMain function
