import React, {useState, useContext} from "react";
import { Bars, TailSpin } from "react-loader-spinner";
import { AppState } from "../App";
import { BsCoin, BsArrowDownCircle, BsWallet2 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

const Send = () => {
  const App = useContext(AppState);

  return (
    <div className="flex flex-col justify-center items-center text-white">
      {/* Balance */}
      <div className="flex w-4/5 justify-around items-center mt-7">
        <div onClick={() => App.setShowErc(App.showErc ? false : true)} className="flex cursor-pointer justify-center items-center border-2 border-blue-900 border-opacity-60 p-3 bg-black bg-opacity-70 rounded-lg">
          <BsCoin />
          <h1 className="ml-2 text-lg font-medium">{App.currency}</h1>
          <IoIosArrowDown className="ml-2"/> 
          </div>
          <div className="flex justify-center items-center border-2 border-blue-900 border-opacity-60 p-3 bg-black bg-opacity-70 rounded-lg">
          <BsWallet2 />
          <h1 className="ml-2 text-lg font-medium">Balance :</h1>
          <h1 className="ml-2 text-lg font-medium">{App.balance.slice(0,5)} {App.symbol}</h1>
        </div>
      </div>

      {/* ERC-20 Address */}
      <div className={`${App.showErc ? '' : "hidden"} flex w-4/5 justify-between items-center mt-5`}>
        <input onChange={(e) => App.setErcTokenAddress(e.target.value)} value={App.ercTokenAddress} className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Paste ERC20 Token Address" /> {/* Storing the address of ERC-20 Token that is typed by the user inside the input box */}
        {App.ercLoading ?
          <div className="flex p-2 cursor-pointer justify-around items-center w-1/4 ml-4 bg-blue-800 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
          <TailSpin
            width={28} 
            height={28}
            color={"white"}
          />
          </div>
          :
          (App.tokenChanged ?
          <div onClick={App.removeToken} className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-red-600 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
            Remove
          </div>
            : 
            <div onClick={App.selectToken} className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-blue-800 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
            Select
            </div>
          )
        }
      </div>
        {/* ERC-20 Logic will be in App.js */}


      {/* Transfer To */}
      <div className="flex w-4/5 justify-between items-center mt-5">
        <input onChange={(e) => App.setRecipientAddress(e.target.value)} value={App.recipientAddress} className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Paste Recipient Address" />
        <input onChange={(e) => App.setAmount(e.target.value)} value={App.amount} type={"number"} className="w-1/4 ml-4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg" placeholder="Amount" />
      </div>

      {/* Transfer Button */}
      { App.txLoading ?
        <div className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-blue-700 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
          <Bars
            width={30}
            height={46}
            color={'white'}
          />
        </div>
        :
      <div onClick={App.transferAmount} className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-blue-700 hover:bg-blue-600 ease-in duration-200 bg-opacity-70 border-2 border-blue-800 border-opacity-80 text-xl font-medium rounded-lg">
        Transfer
      </div>
      }

      {/* Recent Tx section */}
      <div className={`${App.showRecentTx ? '' : 'hidden'} bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-4/5 mt-2`}> 
        <div className="flex w-full items-center justify-center rounded-t-lg">
          <div className="w-4/6 py-2 px-2">
            <p className="text-xl font-mono">Amount: {App.recentTx.amount} {App.recentTx.symbol}</p>
            <p className="text-xs font-mono">to: {App.recentTx.to}</p>
          </div>
          {App.saveTxLoad ? 
          <div className="flex justify-center bg-green-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">
            <TailSpin 
              height={18}
              width={18}
              color={'white'}
            />
          </div>
            :
          <button onClick={App.saveTx} className="bg-green-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">Save</button>
          }
          <button onClick={() => App.setShowRecentTx(false)} className="bg-red-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">Ignore</button>
        </div>
        <a target={'_blank'} href={`${App.explorer}/tx/${App.recentTx.txhash}`} rel="noreferrer">
          <div className="font-mono w-full rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
            View Transaction
          </div>
        </a>
      </div>

      {/* Error & Message */}
      <p className="text-red-600 text-lg mt-2 px-3">{App.error}</p>
      <p className="text-green-600 text-lg mt-2 px-1">{App.message}</p>
    </div>
  );
};

export default Send;
