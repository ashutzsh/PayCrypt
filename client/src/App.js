import {useState, useEffect, createContext} from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Login from './components/Login'

const AppState = createContext();

function App() {
  const {ethereum} = window;
  const [login, setLogin] = useState(false);
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('');

  useEffect(() => {
    ethereum.on("chainChanged", async (chainId) => {
      if(chainId === "0x1"){
        setChain("Ethereum Mainnet")
      } else if(chainId === "0x5"){
        setChain("Goerli Testnet")
      } else if(chainId === "0x13881"){
        setChain("Polygon Mumbai")
      } else{
        setLogin(false);
      }
      ethereum.on("accountChanged", async (accounts) =>{
        setAddress(accounts[0]);
      })
    })
  }, [])
  

  return (
    <AppState.Provider value={{login, setLogin, address, setAddress, chain, setChain}}>
    <div className="min-w-full h-screen">
      { login 
      ? 
      <div className="min-w-full min-h-full">
        {/* Main Application */}
        <Header />
        <Main />
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