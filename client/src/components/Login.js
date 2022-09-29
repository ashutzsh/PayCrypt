import React, { useState, useContext } from 'react'
import { AppState } from '../App';

const Login = () => {
  const App = useContext(AppState);

  const {ethereum} = window;
  const [error, setError] = useState('');

  const LoginWallet = async () => {
    try {
      await ethereum.request({method: "wallet_requestPermissions", params:[{eth_accounts: {}}]}) //Metamask syntax for requesting permission for MULTIPLE ACCOUNTS
      const accounts = await ethereum.request({method: "eth_requestAccounts"}) //Metamask syntax for requesting permission for ONE ACCOUNT
      App.setLogin(true);
    } catch (error) {
      setError(`"${error.message}"`)
    }
  }

  return (
      <div className='min-w-full h-4/5 flex justify-center flex-col items-center'>
        <img className='h-20 mt-2' src='paycrypt5.png' alt='PayCrypt' />
        <div className='w-1/3 h-40 mt-4 white-glassmorphism bg-opacity-70 p-2 shadow-lg border-opacity-40  flex flex-col justify-center items-center'>
          <h1 className='text-white text-2xl font-medium text-center'>Login</h1>
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