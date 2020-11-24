
import { SET_ALL_JOB_POSTS,SET_ERRORS, 
    CLEAR_ERRORS, LOADING_UI,
     SET_UNAUTHENTICATED,
     LOADING_USER, SET_AUTHENTICATED, SET_USER} from '../types'


import axios from 'axios'







export const loginUser = (user,history) => (dispatch) => {

dispatch({ type: LOADING_UI});
    axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/login',user)
.then(res => {

    setAuthorizationHeader(res.data.token)
    
dispatch(getUsersProfileData());
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




export const getUsersProfileData = () => (dispatch) => {

    console.log("getUsersProfileData Called")

dispatch({type: LOADING_USER});
    axios.get(`https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user`)
    .then(res => {

        dispatch({type: SET_AUTHENTICATED});

console.log(res.data)

        dispatch({
            type: SET_USER,
            payload: res.data
        });
    })
 .catch(err => console.log("you got an error" + err.code));
 
}





export const uploadImage = (formData) => (dispatch) => {
    
    dispatch({type: LOADING_USER})
    axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user/image',formData)
    .then(() => {
      dispatch(getUsersProfileData())
    })
    .catch(err => console.log(err));
}







export const getAllJobPosts = () => (dispatch) => {
    axios.get('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/JobPosts')
   
    .then(res => {
        dispatch({
            type: SET_ALL_JOB_POSTS,
            payload: res.data
        })
    })
 .catch(err => console.log(err));
}






export const signUpUser = (user,history) => (dispatch) => {

    dispatch({ type: LOADING_UI});
    
        axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/signup',user)
    .then(res => {
    
        setAuthorizationHeader(res.data.token)

         
dispatch(getUsersProfileData());

  

   


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




    export const logoutUser = () =>  (dispatch) => {
        console.log("logoutUser Called inside  userActions")
        localStorage.removeItem('FBToken')
        delete axios.defaults.headers.common["Authorization"];
        dispatch({type: SET_UNAUTHENTICATED })

    }




    const setAuthorizationHeader = (token) => {
        console.log("this is the token: " + token)
        const FBTOKEN = `${token}`
        localStorage.setItem('FBToken', FBTOKEN);
        axios.defaults.headers.common['Authorization'] = FBTOKEN
    }



export const editUserDetails = (userDetails) =>  (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('https://australia-southeast1-workservices-e4506.cloudfunctions.net/api/user', userDetails)
    .then(() => {
        dispatch(getUsersProfileData());
    })
    .catch(err => console.log(err));
}

