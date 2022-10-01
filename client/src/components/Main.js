import React, {useContext, useState} from 'react';
import Send from './Send'
import { AppState } from '../App';
import Recipients from './Recipients'
import RecentTx from './RecentTx'
import GlobalTx from './GlobalTx'
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

const Main = () => {
  const [route, setRoute] = useState('send'); //By default send tab is displayed
  const App = useContext(AppState);

  const shortAddress = `${App.address.slice(0, 7)} . . . . ${App.address.slice(App.address.length - 4)}`;

  return (
    <div className='flex flex-row mt-24'>
    {/* LHS */}
    <div className='w-1/2 flex flex-col justify-center items-center text-white'>
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto 
          </h1>
          <h1 className='text-2xl sm:text-4xl text-white py-1 mb-4'>Across the world</h1>
        
    {/* The card thing */}
    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  {App.chain === "Goerli Testnet" ? (
                  <SiEthereum fontSize={21} color="#fff" />
                  ) : (
                  <img className="h-5" src="polygon2.png" alt=''/>
                  )}
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-md">
                  {shortAddress}
                </p>
                <p className="text-white font-semibold text-xl mt-1">
                  {App.chain}
                </p>
              </div>
            </div>
          </div>
          <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-xl">
            Explore the crypto world. Send transactions easily on PayCrypto.
          </p>
    </div>

    {/* RHS */}
    <div className='w-1/2  flex-col justify-center items-end'>
      {/* Tabs Navigation Bar */}
      <div className='flex justify-around text-lg font-medium items-center bg-gray-900 border-2 border-b-0 text-white border-opacity-50 border-blue-800 rounded-t-lg w-3/4'>
      {/* Send Tab */}
        <li onClick={() => setRoute('send')} className={`list-none cursor-pointer py-2 w-1/4 ${route === 'send' ? "bg-black bg-opacity-60" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
          Send
        </li>
      {/* Recipients Tab */}
        <li onClick={() => setRoute('recipients')} className={`list-none cursor-pointer py-2 w-1/4 ${route === 'recipients' ? "bg-black bg-opacity-60" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
          Recipients
        </li>
      {/* RecentTx Tab */}
        <li onClick={() => setRoute('recent_tx')} className={`list-none cursor-pointer py-2 w-1/4 ${route === 'recent_tx' ? "bg-black bg-opacity-60" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
          Recent Tx
        </li>
      {/* GlobalTx Tab */}
        <li onClick={() => setRoute('global_tx')} className={`list-none cursor-pointer py-2 w-1/4 ${route === 'global_tx' ? "bg-black bg-opacity-60" : "bg-gray-900"} text-center rounded-tl-lg hover:bg-black hover:bg-opacity-60`}>
          Global Tx
        </li>
      </div>
      {/* Screen (below the navigation tabs) */}
      <div className='blue-glassmorphism bg-opacity-60 pb-5 overflow-y-auto border-2 border-t-0 shadow-lg border-opacity-50 border-blue-800 rounded-b-lg w-3/4'>
      {/* Below you will notice some unusual syntax */}
        {(() => {
          if(route === 'send') {
            return <Send />
          } else if(route === 'recipients') {
            return <Recipients />
          } else if(route === 'recent_tx') {
            return <RecentTx />
          } else if(route === "global_tx") {
            return <GlobalTx />
          }
        })()}
      </div>
    </div>

    </div>
  )
}

export default Main