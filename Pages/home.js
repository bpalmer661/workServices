import React, { Component } from 'react'
 import Grid from '@material-ui/core/Grid'

 import axios from 'axios'
 import JobPost from '../Components/JobPost'

  ///////lesson 25////// 
import Profile from '../Components/Profile'
 ///////lesson 25////// 



export class home extends Component {



state = {
    jobPosts: []
}

componentDidMount(){
    axios.get('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPosts')
.then(res => {
   
this.setState({
    jobPosts: res.data

})
})
.catch(err =>{
    console.log(err)
})
}




    render() {
       let recentJobPosts = this.state.jobPosts ? 
    ( this.state.jobPosts.map(jobPost => <JobPost key={jobPost.jobId} jobPost={jobPost}/>))
    : <p>loading...</p>
        return (
            <Grid container spacing={10}>
               
                <Grid item sm={8} xs={12}>
                    

{recentJobPosts}

                </Grid>
                <Grid item sm={4} xs={12}>
                    {/* ///////lesson 25////// */}
                    <Profile/>
                    {/* ///////lesson 25////// */}
                </Grid>
            </Grid>
            
        )
    }
}

export default home
