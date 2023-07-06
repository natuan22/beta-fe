import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import chartReducer from '../features/Chart/chartSlice'
import authenReducer from '../features/Auth/authenSlice'
import marketReducer from '../features/Market/marketSlice'
import marcoReducer from '../features/Macro/macroSlice'
import newsCenterReducer from '../features/NewsCenter/newsCenterSlice'
import rootColor from '../services/servicesSlice'
const reducer = combineReducers({
  chart: chartReducer,
  authen: authenReducer,
  market: marketReducer,
  marco: marcoReducer,
  newsCenter: newsCenterReducer,
  color: rootColor
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
