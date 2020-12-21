///////lesson 38 add MARK_NOTIFICATIONS_READ//////////////
import {  SET_AUTHENTICATED,SET_UNAUTHENTICATED,SET_ALL_JOB_POSTS, LOADING_USER,SET_USER, MARK_NOTIFICATIONS_READ} from '../types'
///////lesson 38 //////////////

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

                case SET_ALL_JOB_POSTS:
                    return{
                        ...state,
                        jobPosts: action.payload
                    };

                    
             
                        case LOADING_USER:
                            return{
                                ...state,
                                loading: true
                            };
   
    case SET_USER:
        return{
            authenticated: true,
            loading: false,
          ...action.payload,
        };

        ///////lesson 38 //////////////
case MARK_NOTIFICATIONS_READ:
state.notifications.forEach(not => not.read = true)
return {
...state
};


        ///////lesson 38 //////////////

                    default:
                        return state;
    }
}