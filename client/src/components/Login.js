import React, { useState, useContext } from 'react'
import { AppState } from '../App';

const Login = () => {
  const App = useContext(AppState);

  const {ethereum} = window;
  const [error, setError] = useState('');

  //This function will be executed on clicking Connect with Metamask button and it will open the user authetication metamask window
  const LoginWallet = async () => {
    try {
      await ethereum.request({method: "wallet_requestPermissions", params:[{eth_accounts: {}}]}) //Metamask syntax for requesting permission for MULTIPLE ACCOUNTS
      const accounts = await ethereum.request({method: "eth_requestAccounts"}) //Metamask syntax for requesting permission for ONE ACCOUNT
      App.setAddress(accounts[0]);

      const chainId = await ethereum.request({method: "eth_chainId"}) //This will get me the Current Chain Id
      //Ropsten chain id is 0x3, Goerli is 0x5. Etherum Mainnet is 0x1. Polygon mainnet is 0x89. Polygon Mumbai is 0x13881.

      App.getBal(); //To display wallet balance as soon as user log ins

      if(chainId === "0x5"){
        App.setChain("Goerli Testnet")
        App.setLogin(true); //login = false -> login page, login = true -> main page. It is false by default
        App.setCurrency("GoerliEther")
        App.setSymbol("gEth")
        App.setExplorer("https://goerli.etherscan.io")
        App.setPayCryptContractAddress('0xFd2BD5Fc4211EAc0027C4862dE2e0eAF81Fa81D5')
      } else if(chainId === "0x13881"){
        App.setChain("Polygon Mumbai")
        App.setLogin(true);
        App.setCurrency("Matic")
        App.setSymbol("Matic")
        App.setExplorer("https://mumbai.polygonscan.com")
        App.setPayCryptContractAddress('0x3b5578C8e4157AA0A71D114c554fE66B1f57c8D2')
      } else{
        App.setLogin(false);
        setError("Can only access with Goerli Testnet and Polygon Mumbai") //You cannot use any other chain
      }

    } catch (error) {
      setError(`"${error.message}"`)
    }
  }

  return (
      <div className='min-w-full h-4/5 flex justify-center flex-col items-center'>
        <img className='h-20 mt-2' src='paycrypt5.png' alt='PayCrypt' />
        <div className='w-1/3 h-40 mt-4 white-glassmorphism bg-opacity-70 p-2 shadow-lg border-opacity-40  flex flex-col justify-center items-center'>
          <h1 className='text-white text-2xl mb-4 font-medium text-center'>Login</h1>
          { ethereum != undefined ?
              <div onClick={LoginWallet} className='flex border-opacity-60 bg-opacity-90 text-lg font-medium login-button cursor-pointer justify-center items-center'>Connect with Metamask
              <img className='h-7' src='metamask.png' alt=''/>
              </div>
            :
            <div className='flex flex-col justify-center items-center'>
            {/* Install Metamask */}
              <a href='https://metamask.io/download/' target='_blank' className='flex border-opacity-60 bg-opacity-90 text-lg font-medium login-button cursor-pointer justify-center items-center' rel="noreferrer">Install Metamask
              <img className='h-7' src='metamask.png' alt=''/>
              </a>
              <p className='text-red-500 text-md mt-1'>Login Requires Metamask Extension</p>
              </div>
          }
          <p className='text-red-500 text-md mt-1'>{error}</p>
        </div>
      </div>
  )
}

export default Login