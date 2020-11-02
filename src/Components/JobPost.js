import React, { Component } from 'react'



//MUI 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import  Typography  from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles'

import { Link } from 'react-router-dom';

//////lesson 20 //////
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
/////lesson 20 //////

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
    }
}




 class JobPost extends Component {
    render() {

        ////lesson 20///////
      dayjs.extend(relativeTime)
         ////lesson 20///////

        const { classes, jobPost : {createdAt,
            jobDescription,
            userImageUrl,
            username}} = this.props
            

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
              {/* ////lesson 20/////// */}
              {dayjs(createdAt).fromNow()}
              {/* ////lesson 20/////// */}
              </Typography>

              <Typography variant="body1">
              {jobDescription}
              </Typography>

             </CardContent>
            </Card>
        
        )
    }
}

export default withStyles(styles)(JobPost)
