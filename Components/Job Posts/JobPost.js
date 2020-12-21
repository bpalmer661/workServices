
import React, { Component } from 'react'
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


import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import  ReplyToJobPost from './ReplyToJobPost';

import  JobPostDetails  from './JobPostDetails';


const styles = {
    card:{
        display: 'flex',
        marginBottom: 20,

    },
    image:{
        minWidth:200,
    },
    content:{
        padding: 25,
        objectFit: 'cover'
    },
    buttonContainer:{
        display: "flex"
    }
}







 class JobPost extends Component {

    
    render() {
      dayjs.extend(relativeTime)
    
        const { classes, jobPost : {createdAt,
            jobDescription,
            userImageUrl,
            jobId, jobTitle,username},
            user: {
                authenticated,
                credentials
            },
        } = this.props
           

            const deleteButton = authenticated && username === credentials.username ? (
                <DeleteJobPost jobPostId =
                {jobId}/>
            ) : null
     

            const replyButton  = authenticated && username !== credentials.username ? (
        
                <ReplyToJobPost jobPostId={jobId}/> 
            ) : null
        return (

            
            <Card className={classes.card}>
                <CardMedia
                image={userImageUrl}
                title="Profile Image"
                className={classes.image}
                />

              <CardContent className={classes.content}>

        
              <Typography variant="h5" component={Link} to={`/users/${username}`} color="primary">
              {username}
              </Typography>

              {/* npm i dayjs */}
              <Typography variant="body2" color="textSecondary">
             
              {dayjs(createdAt).fromNow()}
              </Typography>

              <br/>
              <br/>


              <Typography variant="h5">
              {jobTitle} 
              </Typography>
            



              <Typography
        
              color="textSecondary" >
              {jobDescription}
              </Typography>
              

              <br/>
              <br/>

              <div className={classes.buttonContainer}>
    { deleteButton }
    <br/>
 { replyButton }
 <br/>


<JobPostDetails jobId={jobId} username={username} openDialog={this.props.openDialog} />

<br/>
</div>


             </CardContent>

            </Card>
        
        )
    }
}

JobPost.propTypes = {
    user: PropTypes.object.isRequired,
    jobPost: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool,

}

const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {
    DeleteJobPost,
    
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(JobPost));


