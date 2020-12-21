
//////////ALL LESSON 38///////////////////////


import React, { Component, Fragment } from 'react'


//MUI 
import  Typography  from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

//icons
import NotificationIcon from '@material-ui/icons/Notifications';

//redux
 import { connect } from 'react-redux';
 import { markNotificationsRead } from '../../redux/actions/userActions'


import PropTypes from 'prop-types';



export class Notifications extends Component {

state = {
    anchorEl: null
}
 handleOpen = (event) => {
     this.setState({anchorEl: event.target})
 }

 handleClose = () => {
     this.setState({anchorEl: null});
 }

 onMenuOpened = () => {
     //this will return us an array of notification ID's that have a read of false
     let unreadNotificationsIds = this.props.notifications.filter(not => !not.read)
     .map(not => not.notificationId);

     this.props.markNotificationsRead(unreadNotificationsIds);
 }

    render() {

const notifications = this.props.notifications;
const anchorEl = this.state.anchorEl;

dayjs.extend(relativeTime);

let notificationsIcon;
if(notifications && notifications.length > 0 ) {
    notifications.filter(not => not.read === false).length > 0 
    ? notificationsIcon = (
        <Badge
        badgeContent={notifications.filter(not => not.read === false).length}
        color="secondary"
        >
            <NotificationIcon/>
        </Badge>
    ) : (
        notificationsIcon = <NotificationIcon/>
    )
} else {
    notificationsIcon = <NotificationIcon/>
}


let notificationsMarkup = 
notifications && notifications.length > 0 ? (
    notifications.map(not => {
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? 'primary' : 'secondary';
        const icon = <NotificationIcon color={iconColor} style={{ marginRight: 10}}/>

return (
<MenuItem key={not.createdAt} onClick={this.handleClose}>
    {icon}
    <Typography
    component={Link}
    color="primary"
    variant="body1"
    to={`/users/${not.recipient}/jobPost/${not.jobPostId}`}
    >
        {not.sender} Replied To Your Job Post - {time}
    </Typography>
</MenuItem>
)

    })
) :(
    <MenuItem onClick={this.handleClose}>
        You Have No Notifications Yet...
    </MenuItem>
)


        return (
            <Fragment>
 <Tooltip
 placement="top"
 title="Notifications"
 >
<IconButton 
 aria-owns={anchorEl ? "simple-menu" : undefined}
 aria-haspopup="true"
 onClick={this.handleOpen}
>
 {notificationsIcon}
</IconButton>
 </Tooltip>

<Menu
anchorEl={anchorEl}
open={Boolean(anchorEl)}
onClose={this.handleClose}
onEntered={this.onMenuOpened}
>
   {notificationsMarkup} 
    </Menu> 
            </Fragment>
        )
    }
    
}

    Notifications.propTypes = {
        markNotificationsRead: PropTypes.func.isRequired,
        notifications: PropTypes.array
    }


    const mapStateToProps = state => ({
        notifications: state.user.notifications
    })

export default connect(mapStateToProps, { markNotificationsRead})(Notifications)
