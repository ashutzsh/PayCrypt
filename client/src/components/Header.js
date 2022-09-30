import React, {useContext, useState} from 'react';
import { AppState } from '../App';
import { TbCurrencyEthereum } from "react-icons/tb";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const Header = () => {
  const {ethereum} = window;
  const App = useContext(AppState);
  const [showChains, setShowChains] = useState(false);

  const changeToEthereum = async () => {
    await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: "0x1"}]})
    setShowChains(false)
  }
  
  const changeToPolygon = async () => {
    await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: "0x13881"}]})
    setShowChains(false)
  }
  
  const changeToGoerli = async () => {
    await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: "0x5"}]})
    setShowChains(false)
  }

  const shortAddress = `${App.address.slice(0, 7)} . . . . ${App.address.slice(App.address.length - 4)}`;
  return (
    <div>
    <div className='w-full h-1/4 pt-4 flex justify-between items-start'>
    {/* Logo */}
    <img className='h-12 ml-2' src='paycrypt5.png' alt='PayCrypt' />
    <div className='flex justify-between items-start'>
          
      {/* Select Network */}
      <div className="text-xl mr-2 font-sans border-opacity-60 border-2 border-black  font-medium bg-slate-300 px-4 py-2 text-blue-900 rounded-lg flex justify-between items-center">Select Network<BsFillArrowRightCircleFill className='ml-2'/></div>
      
      
        
        {/* Chains Section */}
        <div onClick={() => setShowChains(true)} className="text-xl py-2 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-black text-white rounded-lg flex justify-between items-center">
          {App.chain === "Ethereum Mainnet" || App.chain === "Goerli" ? (
            <img className="h-6 mr-2" src="ethereum-eth.svg" alt=''/>
          ) : (
            <img className="h-6 mr-2" src="polygon.png" alt=''/>
          )}
          {App.chain}
        </div>

        {/* All Chains Menu */}
        <div className={`${showChains ? "" : "hidden"} absolute right-0 z-50`}>
          {/* Ethereum Mainnet */}
          <div onClick={changeToEthereum} className="text-xl py-2 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer hover:bg-gray-900 bg-black text-white rounded-lg flex justify-between items-center">
            <img className="h-6 mr-2" src="ethereum-eth.svg" />
            Ethereum Mainnet
          </div>

          {/* Polygon Mumbai */}
          <div onClick={changeToPolygon} className="text-xl py-2 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer hover:bg-gray-900 bg-black text-white rounded-lg flex justify-between items-center">
            <img className="h-6 mr-2" src="polygon.png" />
            Polygon Mumbai
          </div>

          {/* Goerli */}
          <div onClick={changeToGoerli} className="text-xl py-2 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer hover:bg-gray-900 bg-black text-white rounded-lg flex justify-between items-center">
            <img className="h-6 mr-2" src="ethereum-eth.svg" />
            Goerli Testnet
          </div>

          {/* Close The chains */}
          <div onClick={() => setShowChains(false)} className="text-xl py-1 px-4 mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-red-600 hover:bg-red-800 text-white rounded-lg flex justify-center items-center">
          Close
          <AiOutlineCloseCircle className='ml-2 text-2xl'/>
          </div>
    </div>
    </div>
    </div>

    
    </div>
  )
}

export default Header