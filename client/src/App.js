import {useState, createContext} from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Login from './components/Login'

const AppState = createContext();

function App() {
  const [login, setLogin] = useState(false);

  return (
    <AppState.Provider value={{login, setLogin}}>
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