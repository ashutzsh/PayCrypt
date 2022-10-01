import {useState, useEffect, createContext} from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Login from './components/Login'
import { ethers } from 'ethers';
import PayCrypt from '../src/paycrypt/PayCrypt.json'
import Footer from './components/Footer';

const AppState = createContext();

function App() {
  //States
  const {ethereum} = window;
  const [login, setLogin] = useState(false);
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('');
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');
  const [currency, setCurrency] = useState('');
  const [ercTokenAddress, setErcTokenAddress] = useState(''); //Initially its blank. User will type the address in the input box and the typed address will be stored
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [payCryptContractAddress, setPayCryptContractAddress] = useState('');
  const [explorer, setExplorer] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [tokenChanged, setTokenChanged] = useState(false);
  const [showErc, setShowErc] = useState(false);
  const [ercLoading, setErcLoading] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [showRecentTx, setShowRecentTx] = useState(false);
  const [recentTx, setRecentTx] = useState({
    txhash: '',
    from: '',
    to: '',
    amount: '',
    symbol: ''
  })
  const [saveTxLoad, setSaveTxLoad] = useState(false);
  
  async function getBal() { //Calling getBal() from Login.js. This function is to display the balance of the wallet
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const balance = await signer.getBalance();
    setBalance(ethers.utils.formatEther(balance))
}

//To get data of a contract we need 3 things: Contract address, Contract ABI and my provider. The address is supposed to be typed by the user in the input box. We have stored the address in ercTokenAddress. Below are code for provider and ABI.

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

//Using Ethers.js we can define ABI functions like this:. Erc-20 is a standard and every erc-20 token must contain these functions.It not complete ABI but only those functions which I will use. We can define which functions present in the contract the we wanna use like this: We know that any ERC20 contract contains these functions so we can access those functions in our app like this.
const ERCABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
  "function symbol() external view returns (string memory)",
  "function name() external view returns (string memory)"
]

// Contracts instance
const ERCContract = new ethers.Contract(ercTokenAddress, ERCABI, signer); //ERC20 Contract instance
const payCryptContract = new ethers.Contract(payCryptContractAddress, PayCrypt.abi, signer); //Our PayCrypt Contract instance
//Now I can start making request to the contract and get the data from the contract


const selectToken = async () => {
  try {
  setErcLoading(true); //Loading animation
  const name = await ERCContract.name(); //name, balanceOf, symbol are functions present in ERCContract. We are getting the data from the ERCContract
  const balance = await ERCContract.balanceOf(address);
  const symbol = await ERCContract.symbol();
  setBalance(ethers.utils.formatEther(balance)); //Convert wei to Ether
  setSymbol(symbol);
  setCurrency(name);
  setTokenChanged(true);//This will change the 'Select' button to 'Remove' button. Logic is defined in Send.js
  setErcLoading(false);
  } catch(error) {
    setError(error.message)
    setErcLoading(false);
  }
}

const removeToken = async () => {
  try {
    if(chain === "Goerli Testnet") {
    setCurrency("GoerliEther")
    setSymbol("gEth")
  } else if(chain === "Polygon Mumbai") {
    setCurrency("Matic")
    setSymbol("Matic")
  }
  setErcTokenAddress('');
  setShowErc(false);
  setTokenChanged(false);//This will change the 'Remove' button to 'Select' button.
  getBal();
  } catch(error) {
    setError(error.message)
  }
}

//Now lets code the transfer fuctionalities

const transferAmount = async () => {
  setMessage('');
  setTxLoading(true);
  try {
    if(tokenChanged) {
      const tx = await ERCContract.transfer(recipientAddress, ethers.utils.parseEther(amount));
      await tx.wait();
      selectToken();

      setRecentTx({
        txhash: tx.hash,
        from: address,
        to: recipientAddress,
        amount: amount,
        symbol: symbol
      })

      setShowRecentTx(true);

    } else {
      const tx = await payCryptContract._transfer(recipientAddress, symbol, {
        value: ethers.utils.parseEther(amount)
      });

      await tx.wait();
      getBal();
    }

    setMessage("Transaction Sucessfull!")
    setAmount('');
  } catch (error) {
    setError(error.message)
  }

  setTxLoading(false);
 
  }

  const saveTx = async () => {
  setSaveTxLoad(true);
  try {
    const tx = await payCryptContract.saveTx(recentTx.from, recentTx.to, ethers.utils.parseEther(recentTx.amount), recentTx.symbol);
    await tx.wait();

    setMessage("Transaction Saved Sucessfully!")
  } catch (error) {
    setError(error.message)
  }
  
  setShowRecentTx(false);
  setSaveTxLoad(false);
}


  useEffect(() => {
    ethereum.on("chainChanged", async (chainId) => {
      if(chainId === "0x5"){
        setChain("Goerli Testnet")
        setCurrency("GoerliEther")
        setSymbol("gEth")
        setExplorer("https://goerli.etherscan.io")
        setPayCryptContractAddress('0xFd2BD5Fc4211EAc0027C4862dE2e0eAF81Fa81D5')
      } else if(chainId === "0x13881"){
        setChain("Polygon Mumbai")
        setCurrency("Matic")
        setSymbol("Matic")
        setExplorer("https://mumbai.polygonscan.com")
        setPayCryptContractAddress('0x3b5578C8e4157AA0A71D114c554fE66B1f57c8D2')
      } else{
        setLogin(false);
      }

      getBal();
      }) 
      ethereum.on("accountsChanged", async (accounts) => {
        setAddress(accounts[0])
      })
  })

  
  useEffect(() => {
    if(tokenChanged) {
      selectToken();
    } else {
      getBal()
    }
  }, [address]) 

  useEffect(() => {
    removeToken();
  }, [chain])


  return (
    <AppState.Provider value={{login, setLogin, address, setAddress, chain, setChain, symbol, setSymbol, balance, setBalance, currency, setCurrency, getBal, ercTokenAddress, setErcTokenAddress, recipientAddress, setRecipientAddress, amount, setAmount, payCryptContractAddress, setPayCryptContractAddress, explorer, setExplorer, error, setError, message, setMessage, tokenChanged, setTokenChanged, removeToken, selectToken, transferAmount, showErc, setShowErc, ercLoading, setErcLoading, txLoading, setTxLoading, showRecentTx, setShowRecentTx, recentTx, setRecentTx, saveTxLoad, setSaveTxLoad, saveTx, payCryptContract }}>
    <div className="min-w-full h-screen">
      { login 
      ? 
      <div className="min-w-full min-h-full">
        {/* Main Application */}
        <Header />
        <Main />
        <Footer />
      </div>
      :
      <Login />
      }
    </div>
  </AppState.Provider>
  )
}

export default App;
export {AppState};