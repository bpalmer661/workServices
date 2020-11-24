
import { SET_ALL_JOB_POSTS, LOADING_DATA, SET_REPLYS_TO_JOB_POST,DELETE_JOB_POST,POST_JOB_POST, SET_JOB_POST} from '../types'


const initialState= {
    jobPosts: [],
    jobPost: [],
    jobPostReplys: [],
    loading: false,
};



export default function(state = initialState, action){


    switch(action.type){
    
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            };
            
            case SET_ALL_JOB_POSTS:
                return{
                    ...state,
                    jobPosts: action.payload,
                    loading: false,
                }
    



    case SET_REPLYS_TO_JOB_POST: 
    return {
        ...state,
        jobPostReplys: action.payload,
        loading: false
    };



    case DELETE_JOB_POST: 
let index = state.jobPosts.findIndex((jobPost) => jobPost.jobId === action.payload) 
console.log(action.payload)

state.jobPosts.splice(index, 1);
return{ 
    ...state

}


case POST_JOB_POST: 

return {
    ...state,
    jobPosts: [
        action.payload,
        ...state.jobPosts
    ]
};


//////////////lesson 32////////////
case SET_JOB_POST:
return {
    ...state,
  jobPost: action.payload
};

//////////////////////////////////




                default:
                    return state;
    }
    }