


import {createStore, combineReducers,applyMiddleware, compose} from 'redux'

import thunk from 'redux-thunk';


import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'



const initialState = {};


const middleware = [thunk];

//user,data,UI will be objects stored in our state.     

const reducers = combineReducers({
    user: userReducer,
    data:dataReducer,
    UI: uiReducer,
})

//store , where we store the current data/state in or app
const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))


export default store;