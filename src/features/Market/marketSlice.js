import produce from "immer";
import { marketType } from "./utils/constant";
const initialState = {
  tableThanhKhoanData: {},
  chartTickerContribute: {},
  lineChartMarketData: {},
  dataInvestorTransaction: {},
  topCashValue: {}
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === marketType.FETCH_DATA_TABLE_THANH_KHOAN) {
      draft.tableThanhKhoanData = payload
    }
    if (type === marketType.FETCH_DATA_CHART_TICKER_CONTRIBUTE) {
      draft.chartTickerContribute = payload
    }
    if (type === marketType.FETCH_DATA_LINE_CHART_MARKET) {
      draft.lineChartMarketData = payload
    }
    if (type === marketType.FETCH_DATA_INVESTOR_TRANSACTION) {
      draft.dataInvestorTransaction = payload
    }
    if (type === marketType.FETCH_DATA_CASH_VALUE) {
      draft.topCashValue = payload
    }
  });
};

export default reducer;
