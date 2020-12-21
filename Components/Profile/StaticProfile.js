
//all lesson 36

import React, { Fragment } from 'react';


import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';


//mui
import withStyles from '@material-ui/core/styles/withStyles';
import Muilink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';



const styles = (theme) => ({
    ...theme.shared,
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: theme.palette.primary.main
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
     
    },

    buttonsWrapper: {
        textAlign: 'center',
    },
   
    buttons: {
   
      color: '#fff',
      backgroundColor: '#3f50b5',
      border: 'black',
      margin: '10px',
      '& a': {
    
      }
    },   
  })


const StaticProfile = (props) => {

const { classes, profile: {
    createdAt,
    userImageUrl,
    email,
    location,
    instagram,
    username,
}} = props;

return(
    <Paper 
    className={classes.paper}> 
    <div className={classes.profile}>
        <div className={"image-wrapper"}>
            <img className={"profile-image"} src={userImageUrl}  alt="profile"/>
          
          
    
       {/* <input 
       type="file"
        id="imageInput" 
        onChange={this.handleImageChange} 
        hidden="hidden"
        /> 
    
    
      <MyButton tip="Edit Profile Picture"
     onClick={this.handleEditPicture}
      className="button">
    <EditIcon color="primary" />
     </MyButton>
     */}
    
    
     
    
    
        </div>
        <hr/>
      <div className="profile-details">
    <Muilink component={Link} to={`/users/${username}`} color="primary" variant="h5" >
    {username}
        </Muilink>
        <hr/>
        {email && <Typography variant="body2"> EMAIL: { email } </Typography>}
        <hr/>
        {location && (
    
            <Fragment>
           <LocationOn color="primary"/> <span> {location} </span>
           <hr/>
           </Fragment>
        )}
         {instagram && (
            <Fragment>
           <LinkIcon color="primary"/> 
           <a href={instagram} target="_blank" rel="noopener noreferrer" >
              {' '}{instagram}
           </a>
           <hr/>
           </Fragment>
    
    
        )}
        <CalenderToday color="primary"/>{''}
         <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
    
      </div>
    
    
    
      {/* <Tooltip title="Log Out" placement="top">
    <IconButton onClick={this.handleLogout} className="button"> 
    <KeyboardReturn color="primary" />
    </IconButton>
    </Tooltip> */}
{/*     
    <EditDetails/> */}
    
    
    
    </div>
    
    </Paper>
)

}




StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(StaticProfile);