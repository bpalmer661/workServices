import React from 'react';
import './App.css';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'




import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import home from './Pages/home'
import login from './Pages/login'
import signup from './Pages/signup'
import Navbar from './Components/Navbar';



const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
});




function App() {
  return (
<MuiThemeProvider theme={theme}>

    <div className="App">
  <Router>
    <Navbar className=".nav-container"/>
   <div className="container">
   <Switch>
       <Route exact path="/" component={home}/>
       <Route exact path="/login" component={login}/>
       <Route exact path="/signup" component={signup}/>
    </Switch>
   </div>
  </Router>
  </div>
  </MuiThemeProvider>

  );
}


export default App;
