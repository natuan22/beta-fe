import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import chartReducer from '../features/Chart/chartSlice'
import authenReducer from '../features/Auth/authenSlice'
const reducer = combineReducers({
  chart : chartReducer,
  authen : authenReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
