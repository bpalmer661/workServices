
////////////lesson 32 add SET_JOB_POST and  STOP_LOADING_UI///////////////////
import { SET_ALL_JOB_POSTS, LOADING_DATA, SET_REPLYS_TO_JOB_POST,
    DELETE_JOB_POST,POST_JOB_POST,
     CLEAR_ERRORS, SET_ERRORS, LOADING_UI, SET_JOB_POST,STOP_LOADING_UI} from '../types'
///////////////////////////////////////////


import axios from 'axios'


//GET ALL JOB POSTS
export const getAllJobPosts = () => dispatch => {

console.log("getAllJobPosts called")

    dispatch({ type: LOADING_DATA })
    axios.get('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPosts')
    .then(res => {
        dispatch({
            type: SET_ALL_JOB_POSTS,
            payload: res.data
        })
    })
    .catch(err => {
    
        dispatch({
            type: SET_ALL_JOB_POSTS,
            payload: []
        })
    })
}

//DELETE A JOB POST
export const deleteJobPost = (jobId) => dispatch => {
    console.log("this is jobPostId" + jobId)
    axios.delete(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPost/${jobId}`)
    .then(res => {
        dispatch({
            type: DELETE_JOB_POST,
            payload: jobId
        })
    })
    .catch(err => console.log(err));
}


export const postJobPost = (newJob) => dispatch => {

    dispatch({ type: LOADING_UI})
    axios.post(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/createJobPost`,newJob)
    .then(res => {
    
        dispatch({
            type: POST_JOB_POST,
            payload: res.data
        })
        dispatch({type: CLEAR_ERRORS});
    })
    .catch(err => {

            dispatch({
                type: SET_ERRORS,
                 payload: err.response.data
            })
    });
}




export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS});
}



export const getJobPost = (jobId) => dispatch => {
    dispatch({ type: LOADING_UI})
    axios.get(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPost/${jobId}`)
 .then(res => {
        dispatch({
            type: SET_JOB_POST,
            payload: res.data
        });
        dispatch({type: STOP_LOADING_UI})
    })
    .catch(err => console.log(err));
}




//REPLY TO A JOB POST
export const replyToAJobPost = (jobId) => dispatch => {
     
    axios.post(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPost/${jobId}`)
    .then(res => {
        dispatch({
            type: SET_REPLYS_TO_JOB_POST,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}


