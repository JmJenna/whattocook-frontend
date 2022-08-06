import React , {useEffect , useState} from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./components/auth/UserContext";
import Routes from './components/routes/Routes';
import Navigation from './components/routes/Navigation';
import Footer from './components/page/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import UserApi from './api/Api';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';

export const TOKEN_STORAGE_ID = "whattocook-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {

    async function getCurrentUser() {
      if(token) {
        try {
          let { username } = jwt_decode(token); 
          // put the token on the Api class so it can use it to call the API.
          UserApi.token = token;
          let currentUser = await UserApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await UserApi.signup(signupData);
      setToken(token);
      console.log(setToken(token))
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await UserApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  /** Save a recipe and favorite as well.
   *
   * Make sure you await this function and check its return value!
   */
  async function makeRecipe(detail) {
    try {
     let token = await UserApi.saveRecipes(detail);
    } catch (errors) {
      console.error("fail to save a recipe", errors);
      return { success: false, errors };
    }

  }


  if (!infoLoaded) return <LoadingSpinner />;

  return (

        <BrowserRouter>
          <UserContext.Provider
            value={{ currentUser, setCurrentUser , makeRecipe }}>
              <Navigation logout={logout} />
              <Routes login={login} signup={signup} />
              <Footer/>
          </UserContext.Provider>   
        </BrowserRouter>

  );
}

export default App;