import produce from "immer";
import { investToolType } from "./utils/constant";

const initialState = {
  dataRangeMinMax: {},
  dataStockFilter: {},
  dataStockList: {},
  dataInvestSimulation: {},
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === investToolType.FETCH_DATA_RANGE_MIN_MAX) {
      draft.dataRangeMinMax = payload;
    }
    if (type === investToolType.FETCH_DATA_STOCK_FILTER) {
      draft.dataStockFilter = payload;
    }
    if (type === investToolType.FETCH_DATA_STOCK_LIST) {
      draft.dataStockList = payload;
    }
    if (type === investToolType.FETCH_DATA_INVEST_SIMULATION) {
      draft.dataInvestSimulation = payload;
    }
  });
};

export default reducer;
