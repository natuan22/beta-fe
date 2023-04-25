import produce from "immer";
import { marketType } from "./utils/constant";
const initialState = {
  tableThanhKhoanData: {},
  chartTickerContribute: {}
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === marketType.FETCH_DATA_TABLE_THANH_KHOAN) {
      draft.tableThanhKhoanData = payload
    }
    if (type === marketType.FETCH_DATA_CHART_TICKER_CONTRIBUTE) {
      draft.chartTickerContribute = payload
    }
  });
};

export default reducer;
