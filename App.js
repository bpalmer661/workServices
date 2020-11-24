import React from 'react';
import './App.css';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { Provider } from "react-redux";
import store from './redux/store';
import { SET_AUTHENTICATED} from './redux/types'
import { logoutUser, getUsersProfileData } from './redux/actions/userActions'
import axios from 'axios'


import home from './Pages/home'
import login from './Pages/login'
import signup from './Pages/signup'
import Navbar from './Components/Navbar';



const theme = createMuiTheme(themeFile);

const token = localStorage.FBToken
if(token){
const decodedToken = jwtDecode(token);
if(decodedToken.exp * 1000 < Date.now()){
store.dispatch(logoutUser())
  window.location.href = '/login';

localStorage.clear();
} else {
  
   store.dispatch({type: SET_AUTHENTICATED})
  axios.defaults.headers.common['Authorization'] = token
  store.dispatch(getUsersProfileData());
}
}

function App() {
  return (
<MuiThemeProvider theme={theme}>

<Provider store={store}>


  <Router>
    <Navbar className=".nav-container"/>
   <div className="container">
   <Switch>
       <Route exact path="/" component={home}/>
       <AuthRoute exact path="/login" component={login} 
        
        />
       <AuthRoute exact path="/signup" component={signup}
       
        />
    </Switch>
   </div>
  </Router>
  


</Provider>



    
  </MuiThemeProvider>

  );
}


export default App;
