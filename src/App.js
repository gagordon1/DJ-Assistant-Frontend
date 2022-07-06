import './App.css';
import Workspaces from './components/Workspaces'
import { authorizeFromCode } from './controllers/spotify-controller'
import { useState, useEffect} from 'react'
import { REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE, SCOPE,
  CLIENT_ID } from './config';

function App() {
  const [accessToken, setAccessToken] = useState("")
  const [refreshToken, setRefreshToken] = useState("")
  const logout = () => {
          setAccessToken("")
          window.localStorage.removeItem("code")
          window.localStorage.removeItem("accessToken")
      }


    useEffect(() => {
      const authorize = async (authCode) =>{

        const result = await authorizeFromCode(authCode)
        const accessTok = result.access_token
        setAccessToken(accessTok)
        window.localStorage.setItem("accessToken", accessTok)
      }

      let code = window.localStorage.getItem("code")
      let accessTok = window.localStorage.getItem("accessToken")
      const windowUrl = window.location.search;
      const params = new URLSearchParams(windowUrl);
      const authCode = params.get("code");

      if (accessTok){
        setAccessToken(accessTok)
      }
      //otherwise check if we haven't authorized yet
      else if (!code){

        if (authCode){
          try{
            authorize(authCode);
            window.localStorage.setItem("code", authCode)
          }
          catch(error){
            console.log(error)
            window.localStorage.removeItem("code")
            window.localStorage.removeItem("accessToken")
            return
          }
        }

      }

    }, [])
  return (
    <div className="App">
      <header className="App-header">

      </header>
      {!accessToken ?
            <a style={{position : "absolute"}} href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login
                to Spotify</a>
            :
            <button style={{position : "absolute"}}onClick={logout}> Logout </button>}
      <Workspaces accessToken={accessToken}/>
    </div>
  );
}

export default App;
