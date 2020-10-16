

import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED,SET_UNAUTHENTICATED,GET_ALL_JOB_POSTS} from '../types'



const initialState = {
authenticated: false,
user: {},
jobPosts:[],
userJobs:[],
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

                    default:
                        return state;
    }
}