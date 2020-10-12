import React from 'react';
import './App.css';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import home from './Pages/home'
import login from './Pages/login'
import signup from './Pages/signup'
import Navbar from './Components/Navbar';



const theme = createMuiTheme(themeFile);



let authenticated; 

const token = localStorage.FBToken
if(token){
const decodedToken = jwtDecode(token);
console.log(decodedToken)
console.log("this is data.now "  + Date.now())

if(decodedToken.exp * 1000 < Date.now()){
window.location.href = '/login';
authenticated = false;
} else {
  authenticated = true;
}
}
///////lesson 21////////////


function App() {
  return (
<MuiThemeProvider theme={theme}>

    <div className="App">
  <Router>
    <Navbar className=".nav-container"/>
   <div className="container">
   <Switch>
       <Route exact path="/" component={home}/>
       <AuthRoute exact path="/login" component={login}  authenticated={authenticated}/>
       <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
    </Switch>
   </div>
  </Router>
  </div>
  </MuiThemeProvider>

  );
}


export default App;
