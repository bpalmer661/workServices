
import React, { Component,Fragement } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//mui
import Button from '@material-ui/core/Button';
//npm i @material-ui/icons
import icons from '@material-ui/core/Icon';
import withStyles from '@material-ui/core/styles/withStyles';
import Muilink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from '../util/theme';


//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalenderToday from '@material-ui/icons/CalendarToday';



//redux
import {connect} from 'react-redux';


const theme = createMuiTheme(themeFile);


const styles = (theme) => ({
    ...theme.shared,
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
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
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
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






      
  const authenticated = false;

export class Profile extends Component {

   

    render() {

        const {
            classes, 
           user: {
                credentials: {
                createdAt,
                userImageUrl,
                email,
                location,
                instagram,
                username,
            },
        
            loading,
            authenticated,
        }
    } = this.props;





let profileMarkup = !loading ? (authenticated ? (
<Paper 
className={classes.paper}> 
<div className={classes.profile}>
    <div className={"image-wrapper"}>
        <img className={"profile-image"} src={userImageUrl}  alt="profile"/>
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
        <Fragement>
       <LocationOn color="primary"/> <span> {location} </span>
       <hr/>
       </Fragement>
    )}
     {instagram && (
        <Fragement>
       <LinkIcon color="primary"/> 
       <a href={instagram} target="_blank" rel="noopener noreferrer" >
          {' '}{instagram}
       </a>
       <hr/>
       </Fragement>
    )}
    <CalenderToday color="primary"/>{''}
     <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>

  </div>
</div>

</Paper>
) : (<Paper className={classes.paper}> 
<Typography variant="body2" align="center">
No Profile Found Please Login Again
</Typography>

<div className={classes.buttonsWrapper}> 
<Button className={classes.buttons} variant="container"  component={Link} to="/login"> Login </Button>
<Button  className={classes.buttons} variant="container"  component={Link} to="/signup"> SignUp </Button>

</div>

</Paper>)) : (<p>loading...</p>)


        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
     user: state.user
})

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));
