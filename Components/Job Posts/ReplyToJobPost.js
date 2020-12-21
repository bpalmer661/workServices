
import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';

//redux
import { connect } from 'react-redux'
import { replyToAJobPost } from '../../redux/actions/dataActions'


//mui
import withStyles from '@material-ui/core/styles/withStyles';
import { Tooltip, DialogTitle, DialogContent, TextField, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

//icons
import IconButton from '@material-ui/core/IconButton';
import ReplyIcon from '@material-ui/icons/Message';




const styles = (theme) => ({
    ...theme.shared,
    button: {
        float: 'right'
    }
})

export class ReplyToJobPost extends Component {


state = {
    replyText:"",
    username: "",
    number: "",
    email: "",
    open: false,
    userImage: "",
    
}

handleOpen = () => {
    this.setState({
        open: true
    })
    this.mapUserDetailsToState(this.props.credentials)
}

handleClose = () => {
    this.setState({
        open: false,
    })
    this.mapUserDetailsToState(this.props.credentials)
}

componentDidMount(){
const {credentials} = this.props;
this.mapUserDetailsToState(credentials)
}

mapUserDetailsToState = (credentials) => {
    this.setState({
        username: credentials.username ? credentials.username : '', 
        userImage: credentials.userImageUrl ? credentials.userImageUrl : "https://firebasestorage.googleapis.com/v0/b/workservices-e4506.appspot.com/o/100846351935.png?alt=media&token=b5490b00-ba72-4663-934b-6a921627fcd0",
        ///////////////////
    });
};



onChange = (event) => {
    this.setState({
        [event.target.name]:event.target.value
    });
}


handleSubmit = () => {

    //need to pass this down
    const jobPostId = this.props.jobPostId

    console.log("this is userImage: " + this.state.userImage)

    const jobPostDetails = {
        replyText: this.state.replyText,
        email: this.state.email,
        number: this.state.number,
        username: this.state.username,
        userImage: this.state.userImage
        ///////////////////
    };
    
    this.props.replyToAJobPost(jobPostDetails,jobPostId);
    this.handleClose();
}





    render() {

        const { classes } = this.props;

        return (

           <Fragment>

              

               <Tooltip title="reply" placement="right">
             <IconButton onClick={this.handleOpen} >
                 <ReplyIcon color="primary"> </ReplyIcon>
             </IconButton>
               </Tooltip>

<Dialog
open={this.state.open}
onClose={this.handleClose}
fullWidth
maxWidth = "sm"
>
    <DialogTitle> Reply To Job Post </DialogTitle>
   <DialogContent> 
       <form>
           
  {/* service */}
  <TextField 
           name="replyText" 
           type="text"
           label="Message"
           multiline
           rows="1"
           placeholder="Please Enter A Response Here"
           className={classes.TextField}
           value={this.state.replyText}
           onChange={this.onChange}
           fullWidth
           >
           </TextField>




           {/* number */}
           <TextField 
           name="number" 
           type="text"
           label="Number"
           multiline
           rows="1"
           placeholder="Please Enter A Contact Number"
           className={classes.TextField}
           value={this.state.number}
           onChange={this.onChange}
           fullWidth
           >
           </TextField>

           
          {/* email */}
           <TextField 
           name="email" 
           type="email"
           label="Email"
           multiline
           rows="1"
           placeholder="Please Enter Your Email Here"
           className={classes.TextField}
           value={this.state.email}
           onChange={this.onChange}
           fullWidth
           >
           </TextField>

       </form>

   </DialogContent>

<DialogActions>

    <Button
    onClick={this.handleClose}
    color="primary"
    >
        Close
    </Button>

    <Button
    onClick={this.handleSubmit}
    color="primary"
    >
        Submit
    </Button>
</DialogActions>

</Dialog>

           </Fragment>

        )
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    credentials: state.user.credentials,

});

       ReplyToJobPost.propTypes = {
    //editUserDetails: PropTypes.func.isRequired,
   classes: PropTypes.object.isRequired,  
}

const mapActionsToProps = {
    replyToAJobPost,
    
}


export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ReplyToJobPost));


