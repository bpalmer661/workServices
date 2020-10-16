import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,GET_ALL_JOB_POSTS} from '../types'
import axios from 'axios'



export const loginUser = (user,history) => (dispatch) => {

dispatch({ type: LOADING_UI});

    axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/login',user)
.then(res => {

const FBTOKEN = `${res.data.token}`
localStorage.setItem('FBToken', FBTOKEN);
axios.defaults.headers.common['Authoriztion'] = FBTOKEN

dispatch(getAllJobPosts());
dispatch({type: CLEAR_ERRORS});
    history.push('/')
})
.catch(err => {
 dispatch({
     type:SET_ERRORS,
     payload: err.response.data,
 })
});
}




export const getAllJobPosts = () => (dispatch) => {
    axios.get('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPosts')
   
   
    .then(res => {
        
        dispatch({
            type: GET_ALL_JOB_POSTS,
            payload: res.data
            
        })
    })
 .catch(err => console.log(err));
}
