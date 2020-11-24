import React, { Component } from 'react'
 import Grid from '@material-ui/core/Grid'

 
 import JobPost from '../Components/JobPost'
import Profile from '../Components/Profile'


import { connect } from 'react-redux';
import { getAllJobPosts } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';



export class home extends Component {



componentDidMount(){
this.props.getAllJobPosts();
}


    render() {

const { jobPosts, loading } = this.props.data;




       let jobPostMarkup = !loading ? (
     jobPosts.map((jobPost) => 
     <JobPost key={jobPost.jobId} jobPost={jobPost} />)
    ) : ( <p>loading...</p> 
    )
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
              
{jobPostMarkup}

                </Grid>
                <Grid item sm={4} xs={12}>
                    
                    <Profile/>
                   
                </Grid>
            </Grid>
            
        )
    }
}


home.propTypes = {
    getAllJobPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
}

//takes in global state
const mapStateToProps = (state) => ({
    data: state.data,
})

const mapActionsToProps = {
    getAllJobPosts
    
}

export default connect(mapStateToProps,mapActionsToProps)(home);
