///all lesson 36 

import React, { Component } from 'react'
import Proptypes from 'prop-types';
import axios from 'axios';
import JobPost from '../Components/Job Posts/JobPost'
import StaticProfile  from '../Components/Profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import { Typography } from '@material-ui/core';


class user extends Component {


    state= {
        profile: null,
        ///////lesson 37//////
        jobPostIdParam: null,
          ///////lesson 37//////
    }

    //this user profile page will be a static page and nothing will change on it 
    //so therefore we do not need to store it in the global state.
componentDidMount(){
    const username = this.props.match.params.username;


  /////////lesson 37/////////
    const jobId = this.props.match.params.jobId;
    if (jobId) {
        this.setState({jobPostIdParam: jobId})
    }
  /////////lesson 37/////////


    this.props.getUserData(username);

    axios.get(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user/${username}`)
    .then(res => {

this.setState({
    profile: res.data.user
})
    })
    .catch(err => console.log(err))
}


    render() {
        /////////lesson 37/////////

const { jobPosts, loading } = this.props.data;
const { jobPostIdParam } = this.state;

const jobPostsMarkup = loading ? (
    <p> loading data...</p>
) : jobPosts === null ? (

    <p> No Job Posts From This User </p>

) 
////if we have job Posts we do another check , if !jobPostIdParam/ jobPostIdParam is null
//do this 
: !jobPostIdParam ? ( 

    jobPosts.map(jobPost => <JobPost key={jobPost.jobId} jobPost={jobPost} /> )
     ) : 
     //else , if jobPostIdParam is not null , map through the jobPosts and openDialog for the one that's  in the params
(
    jobPosts.map(jobPost => {
if(jobPost.jobId !== jobPostIdParam)
return <JobPost key={jobPost.jobId} jobPost={jobPost} />

////openDialog , just passes a property of openDialog with a value of true
else return <JobPost key={jobPost.jobId} jobPost={jobPost} openDialog/>
    })
)

 /////////lesson 37/////////

        return (

           
            <div>


{this.state.profile === null ? (
     <p> Loading  Profile</p>
 ) : (
     <StaticProfile profile={this.state.profile} />
 )
 
}
<br/>
<Typography variant="h3"> User's Job Posts </Typography>
<br/>


            <Grid container spacing={10}>
                
                <Grid item sm={8} xs={12}>
{jobPostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    
                </Grid>
            </Grid>
            </div>
        )
   }
}

user.propTypes = {
    getUserData: Proptypes.func.isRequired,
    data: Proptypes.object.isRequired,
}

const mapStateToProps = state => ({
    data: state.data,
})


export default connect(mapStateToProps, {getUserData})(user);

