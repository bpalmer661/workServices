
import {  SET_AUTHENTICATED,SET_UNAUTHENTICATED,GET_ALL_JOB_POSTS,GET_USERS_PROFILE_DATA, LOADING_USER,SET_USER} from '../types'


const initialState = {
authenticated: false,
loading: false,
credentials: {},
jobPosts:[],
usersJobs:[],
};

export default function(state = initialState,action) {

    switch(action.type){
        case SET_AUTHENTICATED:
  
            return {
                ...state,
                authenticated: true
            };

            case SET_UNAUTHENTICATED:
                return initialState;

                case GET_ALL_JOB_POSTS:
                    return{
                        ...state,
                        jobPosts: action.payload
                    };

                    
             
    /////////////////////lesson 25 /////////////////
                        case LOADING_USER:
                            return{
                                ...state,
                                loading: true
                            };
   
    case SET_USER:
        return{
          authenticated: true,
          ...action.payload,
        };

                    default:
                        return state;
    }
}