import React, { Component } from 'react'

import hammerLogo from '../Images/hammerlogo.png'
import axios from 'axios'
import { Link } from 'react-router-dom';

//MUI 
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
mainGrid:{
display: 'flex'
},
form: {
textAlign: 'center'
},
image:{
    border: '1px solid black',
    width: '50px',
    borderRadius: '4px',
    //top right bottom left
    margin: '20px auto 20px auto'
},
pageTitle:{
    margin: '10px auto 10px auto'
},
textField:{
    margin: '20px auto 20px auto'
},
button:{
    margin: '30px auto 10px auto',
    width: "130px",
    height: "25px",
},
customError:{
    color: 'red',
    fontSize: '0.8rem',
}
}







export class login extends Component {

    //controlled component using state
    constructor(){
        super();
     this.state = {
         email: "",
         password:"",
         username:"",
         loading: false,
         errors:  {},
     }

    }


handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
        [event.target.name]:event.target.value
    });
}


handleSubmit = (event) => {
    event.preventDefault();
 this.setState({
     loading:true
 });

 const user = {
email: this.state.email,
password: this.state.password,
username: this.state.username,
}

 axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/login',user)
.then(res => {
    this.setState({
        loading: false
    });
    this.props.history.push('/')
})
.catch(err => {
    this.setState({
        errors: err.response.data,
        loading: false,
    })
})

}




    render() {

const { classes } = this.props

const {errors, loading } = this.state


        return (
            
            <Grid className={classes.mainGrid}>
                
                <Grid item sm/>


                <Grid item sm>
                    <img src={hammerLogo} alt="hammer" className={classes.image}/>

                    <Typography variant="h3" className={classes.pageTitle}> 
                  Login
                    </Typography>


                    <form noValidate onSubmit={this.handleSubmit}>
                    
                     <TextField id='email' 
                     name="email" 
                     type="email" 
                     label="Email" 
                     className={classes.textField}
                     helperText={errors.email}
                     error={errors.email ? true : false }
                     value={this.state.email}
                     onChange={this.handleChange}
                     fullWidth
                     />

                     <TextField id='password' 
                     name="password" 
                     type="password" 
                     label="Password" 
                     className={classes.textField}
                     helperText={errors.password}
                     //error seet field to be red
                     error={errors.password ? true : false }
                     value={this.state.password}
                     onChange={this.handleChange}
                     fullWidth
                     />       
                        
                        {errors.general && (
                        <Typography variant="body2" 
                        className={classes.customError}
                        >
                    {errors.general}
                        </Typography>
                    )}


                    {errors.error && (
                        <Typography variant="body2" 
                        className={classes.customError}
                        >
                    {errors.error}
                        </Typography>
                    )}

                     <Button type="submit" 
                     variant="contained"  
                     color="primary"  
                     className={classes.button}
                     disabled={loading}
                       >Login</Button>

 <br></br>
 <br></br>    
<small>  <Link to="/signup" >don't have an account? sign up</Link>  </small>
<br></br>
 <br></br>
{ loading && (
<CircularProgress/>
)
    }

                    </form>
                </Grid>
                <Grid item sm/>
             
            </Grid>
        )
    }
}




export default withStyles(styles)(login);
