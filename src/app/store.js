import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import analysisCenterReducer from "../features/AnalysisCenter/analysisCenterSlice";
import authenReducer from "../features/Auth/authenSlice";
import chartReducer from "../features/Chart/chartSlice";
import investToolReducer from "../features/InvestTool/investToolSlice";
import macroReducer from "../features/Macro/macroSlice";
import marketReducer from "../features/Market/marketSlice";
import newsCenterReducer from "../features/NewsCenter/newsCenterSlice";
import searchReducer from "../features/Search/searchSlice";
import stockReducer from "../features/Stock/stockSlice";
import rootColor from "../services/servicesSlice";

const reducer = combineReducers({
  chart: chartReducer,
  authen: authenReducer,
  market: marketReducer,
  macro: macroReducer,
  newsCenter: newsCenterReducer,
  color: rootColor,
  search: searchReducer,
  stock: stockReducer,
  investTool: investToolReducer,
  analysisCenter: analysisCenterReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
