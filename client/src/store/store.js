import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import locations from './reducers/locations';
import auth from './reducers/auth';
import rides from "./reducers/rides";
import routes from './reducers/routes';
import dashboard from './reducers/dashboard';

const reducer  = combineReducers({
    locations,auth,rides,routes,dashboard
});


const initialState = {};

const store  = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;