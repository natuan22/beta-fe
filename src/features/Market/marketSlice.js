import produce from "immer";
import { marketType } from "./utils/constant";
const initialState = {
  tableThanhKhoanData: {},
  chartTickerContribute: {},
  lineChartMarketData: {},
  dataInvestorTransaction: {},
  topCashValue: {},
  dataDoRongThiTruong: {},
  dataBienDongThiTruong: {},
  dataExchangeableValue: {},
  dataLiquidityGrowth: {},
  dataTransactionValueRatio: {},
  dataIndustryCashFlow: {},
  dataRSI: {},
  dataTopNetBuyIndustry: {},
  dataCashFlowInvestor:{},
  dataTotalMarket:{}
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
    if (type === marketType.FETCH_DATA_DO_RONG_THI_TRUONG) {
      draft.dataDoRongThiTruong = payload
    }
    if (type === marketType.FETCH_DATA_DIEN_DONG_THI_TRUONG) {
      draft.dataBienDongThiTruong = payload
    }
    if (type === marketType.FETCH_DATA_EXCHANGEABLE_VALUE) {
      draft.dataExchangeableValue = payload
    }
    if (type === marketType.FETCH_DATA_LIQUIDITY_GROWTH) {
      draft.dataLiquidityGrowth = payload
    }
    if (type === marketType.FETCH_DATA_TRANSACTION_VALUE_RATIO) {
      draft.dataTransactionValueRatio = payload
    }
    if (type === marketType.FETCH_DATA_INDUSTRY_CASH_FLOW) {
      draft.dataIndustryCashFlow = payload
    }
    if (type === marketType.FETCH_DATA_RSI) {
      draft.dataRSI = payload
    }
    if (type === marketType.FETCH_DATA_TOP_NET_BUY_INDUSTRY) {
      draft.dataTopNetBuyIndustry = payload
    }
    if(type === marketType.FETCH_DATA_CASHFLOW_INVESTOR) {
      draft.dataCashFlowInvestor = payload
    }
    if(type === marketType.FETCH_DATA_TOTAL_MARKET) {
      draft.dataTotalMarket = payload
    }
  });
};

export default reducer;
