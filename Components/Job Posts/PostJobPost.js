

import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';


//mui
import withStyles from '@material-ui/core/styles/withStyles';
import {  DialogTitle, DialogContent, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';

//icons
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add'


//redux
import { connect } from 'react-redux'
////////lesson 32 , add clearErrors////////////////////////
import { postJobPost, clearErrors } from '../../redux/actions/dataActions'
///////////////////////////////////////////////////////////
import MyButton from '../../util/MyButton';



const styles = (theme) => ({
    ...theme.shared,

    submitButton:{
        position: 'relative',

    },
    progressSpinner:{
        position: 'absolute'
    },
    closeButton:{
        position: 'absolute',
        left: '90%',
        top: '10%', 
    }
  });




export class PostJobPost extends Component {


    constructor(){
        super();
this.state = {
    open: false,
    jobDescription: '',
    jobTitle: '',
    body: '',
    errors: {},
}
    };



componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
        this.setState({
            errors: nextProps.UI.errors
        })
    };
    if(!nextProps.UI.errors && !nextProps.UI.loading){

        //////lesson 32  add  open: false, errors: {}, to set state///////
        this.setState({ jobDescription: '',
        jobTitle: '', open: false,
        errors: {},});
     ///////////////////////////////////////////

        //lesson 32 remove handle close
       // this.handleClose();
    }

}

handleOpen = () => {
    this.setState({
        open: true,
    })

}

handleClose = () => {
///////lesson 32/////////////
   this.props.clearErrors();
////////////////////////////
    this.setState({
        open: false,
        errors: {},
    })
}


 
handleChange = (event) => {
    this.setState({
       [event.target.name]: event.target.value
    })
}


handleSubmit = (event) => {
    
const newJob = {
    jobDescription: this.state.jobDescription, 
    jobTitle: this.state.jobTitle
}

   event.preventDefault();
   this.props.postJobPost(newJob)

  
}



    render() {

        const { errors } = this.state;

       const { classes, UI:{ loading }} = this.props;

        return (
            <Fragment>

                <MyButton  onClick={this.handleOpen} tip="Post A Job">
                   <AddIcon/>
                </MyButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.state.handleClose}
                    fullWidth
                    maxwidth="sm"
                    >
               
                <MyButton 
                onClick={this.handleClose} 
                tip="Close"
                tipClassName={classes.closeButton}
                    >
<CloseIcon/> 
                </MyButton>
<DialogTitle>
    Post A New Job
</DialogTitle>

<DialogContent>
    <form onSubmit={this.handleSubmit}>


    <TextField
    name="jobTitle"
    type="text"
    label="Job title"
    multiline
    rows="3"
    placeholder="Job title"
    error={errors.jobTitle ? true : false}
    helperText={errors.jobTitle}
    className={classes.textField}
    onChange={this.handleChange}
    fullWidth
     maxwidth="sm"
    >
    </TextField>



    <TextField
    name="jobDescription"
    type="text"
    label="Job Description"
    multiline
    rows="3"
    placeholder="Job Description"
    error={errors.jobDescription ? true : false}
    helperText={errors.jobDescription}
    className={classes.textField}
    onChange={this.handleChange}
    fullWidth
     maxwidth="sm"
    >
    </TextField>


<Button type="submit" variant="contained" color="primary" 
className={classes.submitButton}
disabled={loading}
> 
Submit
{loading && (
<CircularProgress size={30} className={classes.progressSpinner}>
</CircularProgress>
)}

</Button>


    </form>
</DialogContent>

                </Dialog>
            </Fragment>
        )
    }
}

PostJobPost.propTypes = {
    postJobPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    ////////lesson 32 , add clearErrors//////////////////////
    clearErrors: PropTypes.func.isRequired
    ////////lesson 32 , add clearErrors//////////////////////

}

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data,
    user: state.user,
});


const mapActionsToProps = {
    postJobPost,
    ////////lesson 32 , add clearErrors//////////////////////
    clearErrors
    ////////lesson 32 , add clearErrors//////////////////////
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(PostJobPost));

