
import React, { Component, Fragment, link } from 'react'

import DeleteJobPost from './DeleteJobPost'

//MUI 
import PropTypes from 'prop-types';
import  Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'

import dayjs from 'dayjs'
import CircularProgress from '@material-ui/core/CircularProgress';


import { connect } from 'react-redux';

import UnfoldMore from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../../util/MyButton';
import Dialog from '@material-ui/core/Dialog';
import {  DialogContent } from '@material-ui/core';
import { getJobPost, deleteJobPost } from '../../redux/actions/dataActions'
import  ReplyToJobPost from './ReplyToJobPost';


import Replys from './Replys'


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
 
    replyIcon:{
        width: 100,
        marginLeft: "auto",
        marginRight: "auto",
    },
    visibleSeparator:{
        width:'100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20,
    }

})

export class JobPostDetails extends Component {

state = {
    open: false,
    //////lesson 37/////////
    oldPath: "",
    newPath:"",
    //////lesson 37/////////
}

handleOpen = () => {

////lesson 37///////
let oldPath = window.location.pathname;
const  { username, jobId } = this.props;

const newPath = `/users/${username}/jobPost/${jobId}`

//edge case
if(oldPath === newPath ) oldPath = `/users/${username}`

window.history.pushState(null, null, newPath);
//////lesson 37///////

///////lesson 37 add values for oldPath and newPath
    this.setState({open: true, oldPath,newPath});
    ///////////////////////////////
    this.props.getJobPost(this.props.jobId);
}

handleClose = () => {
    //////lesson 37/////////
    window.history.pushState(null,null, this.state.oldPath);
    //////lesson 37/////////
    this.setState({open: false});
}

deleteJobPost = () => {
    this.props.deleteJobPost(this.props.jobId);
    this.setState({open: false});
}

componentDidMount(){
    if(this.props.openDialog){
        console.log("componentDidMount called inside jobPostDetails")
        this.handleOpen();
    }
}




    render() {

        const hammerImg="https://firebasestorage.googleapis.com/v0/b/workservices-e4506.appspot.com/o/wheelBarrow.jpeg?alt=media&token=20367e05-ff03-4530-b014-2a7b25f55a8b"

 const { classes,
    jobPost: { jobDescription, 
    jobTitle,
    createdAt,
    username,
    userImageUrl,  
    //jobPostDefaultImage, 
    jobId ,
    //////lesson 34//////
    JobReplys,
    /////////////
},
UI: { loading } ,
user: {
    authenticated,
    credentials
},
}  = this.props;

const deleteButton = authenticated && username === credentials.username ? (
    <DeleteJobPost jobPostId =
    {jobId}/>
) : null

const replyButton  = authenticated && username !== credentials.username ? (
   

<ReplyToJobPost jobPostId={jobId}/> 
) : null



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

<br/>
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

   <br/>
   <br/>
     
 { deleteButton }
 { replyButton }
 <br/>
   <br/>
     

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

{/* 
/////////lesson 34////////////// */}
<hr className={classes.visibleSeparator}/>

 <Replys  JobReplys={JobReplys}/>

{/* /////////lesson 34////////////// */}
     </div>
    
  
    


    )
    

        return (
            <Fragment >

<MyButton onClick={this.handleOpen} tip="Job Details" 
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
    // jobPost: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    
};


const mapStateToProps = (state) => ({
    jobPost: state.data.jobPost,
    UI: state.UI,
    user: state.user,
})


const mapActionsToProps = {
    getJobPost,
    deleteJobPost
}



export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(JobPostDetails));

