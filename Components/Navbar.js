
import React, { Component, Fragment } from 'react'


import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import MyButton from '../util/MyButton'
import { logoutUser} from '../redux/actions/userActions'

//icons
// import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


///npm install @material-ui/core
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

////////lesson 31/////////
import PostJobPost from './PostJobPost'
////////lesson 31/////////

export class Navbar extends Component {

    handleLogout = () => {
        console.log("handleLogout Called inside  Navbar")
        this.props.logoutUser();
    }
    

    render() {


const { authenticated } = this.props


        return (
            //AppBar defaults to position fixed
            <AppBar>
               <Toolbar className="nav-container">
{authenticated ? ( 

   <Fragment>


 <PostJobPost/>


<Link to='/'>
 <MyButton
 tip="Home"
 >
<HomeIcon
/>
 </MyButton>
 </Link>



 <MyButton
 tip="Notifications">
<Notifications
/>
 </MyButton>



 <Link to='/login'>
 <MyButton
 tip="Logout"
 onClick={this.handleLogout}
 >
     <KeyboardReturn color="primary" />
 </MyButton>
 </Link>

   </Fragment>

) : (

<Fragment> 
<Button color="inherit" component={Link} to="/login"> Login</Button>
<Button color="inherit" component={Link} to="/"> Home</Button>
<Button color="inherit" component={Link} to="/signup"> SignUp</Button>
</Fragment> 

) }

               </Toolbar>
              
            </AppBar>
        )
    }
}



Navbar.propTypes = {
    authenticated: Proptypes.bool.isRequired,
    logoutUser: Proptypes.func.isRequired,
}


const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
})

export default connect(mapStateToProps,{logoutUser})(Navbar)
