import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import chartReducer from '../features/Chart/chartSlice'
import authenReducer from '../features/Auth/authenSlice'
import marketReducer from '../features/Market/marketSlice'
import macroReducer from '../features/Macro/macroSlice'
import newsCenterReducer from '../features/NewsCenter/newsCenterSlice'
import rootColor from '../services/servicesSlice'
import searchReducer from '../features/Search/searchSlice'
import stockReducer from '../features/Stock/stockSlice'
const reducer = combineReducers({
  chart: chartReducer,
  authen: authenReducer,
  market: marketReducer,
  macro: macroReducer,
  newsCenter: newsCenterReducer,
  color: rootColor,
  search: searchReducer,
  stock: stockReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
