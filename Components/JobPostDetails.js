
import React, { Component, Fragment, link } from 'react'

import DeleteJobPost from './DeleteJobPost'

//MUI 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import  Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'


import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReplyIcon from '@material-ui/icons/Message';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../util/MyButton';
import Dialog from '@material-ui/core/Dialog';
import {  DialogTitle, DialogContent, TextField } from '@material-ui/core';
import { getJobPost, deleteJobPost } from '../redux/actions/dataActions'



const styles = (theme) => ({
    
...theme.shared,

invisibleSeparartor: {
        border: 'none',
        margin: 4,
        backgroundColor: "red",
    },
    expandButton: {
        top: '0%', 
    },
    closeButton:{
width: 50,
position: "absolute",
left: "90%",
top: "1%"
    },
    
    userImageUrl: {
        marginTop: 50,
        alignContent: "center",
        border:"none",
        width: 250,
        height: 250,
        borderRadius: "50%",
        objectFit: 'cover',
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        
    },

    jobPhotos: {
        alignContent: "center",
        border:"none",
        maxwidth: 100,
        height: 100,
        objectFit: 'cover',
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
    
    },

    DialogContent:{
    },
   

    username:{
        maxWidth: 3500,
        paddingTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        
    },
    jobPhotoContainer:{
        paddingTop: 10,
        display: "flex",
    },
  
   

})

export class JobPostDetails extends Component {

state = {
    open: false,
}

handleOpen = () => {
    this.setState({open: true});
    this.props.getJobPost(this.props.jobId);
}

handleClose = () => {
    this.setState({open: false});
}

deleteJobPost = () => {
    this.props.deleteJobPost(this.props.jobPostId);
    this.setState({open: false});
}




    render() {

        const hammerImg="https://firebasestorage.googleapis.com/v0/b/workservices-e4506.appspot.com/o/wheelBarrow.jpeg?alt=media&token=20367e05-ff03-4530-b014-2a7b25f55a8b"

 const { classes,
    jobPost: { jobDescription, 
    jobTitle,
    createdAt,
    username,
    userImageUrl,  
    jobPostDefaultImage, 
    jobId  
},
UI: { loading } 
}  = this.props;



    const dialogMarkup = loading ? (
        <CircularProgress
        size={200}
        />
    ) : ( 
   
    <div>
<img
src={userImageUrl}
alt = "Profile"
className={classes.userImageUrl}
>
</img>


<Typography
className={classes.username}
component={link}
color="primary"
variant="h5"
to={`/users/${username}`}
>
    {username}
</Typography>  

<hr 
className={classes.invisibleSeparartor}
/>
<Typography variant="body2" color="textSecondary" >
    {`Job Posted: ${dayjs(createdAt).format('h:mm a,MMMM DD YYYY')}`}
</Typography>
<hr 
className={classes.invisibleSeparartor}
/>
< Typography variant="h3">
    {jobTitle}
     </Typography>

< Typography 
className={classes.jobDescription}
variant="body1">
    {jobDescription}
     </Typography>

<div className={classes.jobPhotoContainer}>
     <img
src={hammerImg}
alt = "Profile"
className={classes.jobPhotos}
>
</img>

<img
src={hammerImg}
alt = "Profile"
className={classes.jobPhotos}
>
</img>

<img
src={hammerImg}
alt = "Profile"
className={classes.jobPhotos}
>
</img>
</div>

     </div>
    
    


    )
    

        return (
            <Fragment className={classes.mainFragment}>

<MyButton onClick={this.handleOpen} tip="Expand Scream" 
tipClassName={classes.expandButton}
>
<UnfoldMore color="primary" />
</MyButton>

<Dialog
                    open={this.state.open}
                    onClose={this.state.handleClose}
                    fullWidth
                    maxwidth="lg"
                    
                    >
              

               <MyButton 
                onClick={this.handleClose} 
                tip="Close"
                tipClassName={classes.closeButton}
                    >
<CloseIcon/> 
                </MyButton>

<DialogContent 
className={classes.DialogContent}
>
{dialogMarkup}
</DialogContent>

                </Dialog>

            </Fragment>
        )
    }
}



JobPostDetails.propTypes = {
    getJobPost: PropTypes.func.isRequired,
    jobId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    jobPost: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
    jobPost: state.data.jobPost,
    UI: state.UI,
})


const mapActionsToProps = {
    getJobPost,
    deleteJobPost
}



export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(JobPostDetails));

