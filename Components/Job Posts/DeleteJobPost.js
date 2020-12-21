



//All Lesson 30////////////////////


import React, { Component,Fragment } from 'react'
import  MyButton  from '../../util/MyButton';


//Mui
import withStyles from '@material-ui/core/styles/withStyles';
import {  DialogTitle, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';


//icons
import DeleteOutLine from '@material-ui/icons/DeleteOutline';



import { connect } from 'react-redux';
import { deleteJobPost } from '../../redux/actions/dataActions';
import { PropTypes } from 'prop-types';

const styles = {

}


export class DeleteJobPost extends Component {

state = {
    open: false,
};

handleOpen = () => {
    this.setState({open: true});
}

handleClose = () => {
    this.setState({open: false});
}

deleteJobPost = () => {
    this.props.deleteJobPost(this.props.jobPostId);
    this.setState({open: false});
}


    render() {

const { classes } = this.props;

        return (
            <Fragment>
                <MyButton tip="Delete Job Post"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}
                > 
                <DeleteOutLine color = "secondary"/>
                </MyButton>


          <Dialog
          open={this.state.open}
          onClose={this.state.handleClose}
          fullWidth
          maxWidth="sm"
> 
<DialogTitle>
    Are You Sure You Want To Delete This Job Post?
</DialogTitle>
<DialogActions>
    <Button onClick={this.handleClose} color="primary"> 
cancel
    </Button>
    <Button onClick={this.deleteJobPost} color="secondary"> 
Delete
    </Button>
</DialogActions>

</Dialog>

            </Fragment>
        )
    }
}





const mapStateToProps = (state) => ({
    data: state.data,
    authenticated: state.user.authenticated,
})

DeleteJobPost.propTypes = {
    deleteJobPost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  
}

export default connect(mapStateToProps, { deleteJobPost })(withStyles(styles)(DeleteJobPost)); 

