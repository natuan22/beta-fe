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
  dataMarketMap: {},
  dataRSI: {},
  dataTopNetBuyIndustry: {},
  dataTotalMarket: {},
  dataCashFlowInvestor: {},
  dataCashFlowRatio: {},
  dataTableChangesPrice: {},
  dataTableLiquidityGrowth: {},
  dataChartChangesPrice: {},
  dataChartLiquidityGrowth: {},
  dataChartEquityGrowth: {},
  dataChartLiabilitiesGrowth: {},
  dataTableEquityGrowth: {},
  dataTableLiabilitiesGrowth: {},
  dataChartNetRevenueGrowth: {},
  dataChartGrossProfitGrowth: {},
  dataChartEBITDAGrowth: {},
  dataChartEPSGrowth: {},
  dataChartOperatingProfitGrowth: {},
  dataChartCashDividendGrowth: {},
  dataHotIndustry: {},
  dataQuery: {},
  dataChartAveragePE: {},
  dataChartAveragePB: {},
  dataTableAveragePE: {},
  dataTableAveragePB: {},
  dataChartPayoutRatio: {},
  dataChartAssetTurnoverRatio: {},
  dataTableAverageDebtRatio: {},
  dataChartMiningProfitMargin: {},
  dataChartInterestCoverageRatio: {},
  dataChartAverageDebitIndustry: {}
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
    if (type === marketType.FETCH_DATA_CASHFLOW_INVESTOR) {
      draft.dataCashFlowInvestor = payload
    }
    if (type === marketType.FETCH_DATA_TOTAL_MARKET) {
      draft.dataTotalMarket = payload
    }
    if (type === marketType.FETCH_DATA_CASHFLOW_RATIO) {
      draft.dataCashFlowRatio = payload
    }
    if (type === marketType.FETCH_DATA_MARKET_MAP) {
      draft.dataMarketMap = payload
    }
    if (type === marketType.FETCH_DATA_TABLE_CHANGES_PRICE) {
      draft.dataTableChangesPrice = payload
    }
    if (type === marketType.FETCH_DATA_TABLE_LIQUIDITY_GROWTH) {
      draft.dataTableLiquidityGrowth = payload
    }
    if (type === marketType.FETCH_DATA_CHART_CHANGES_PRICE) {
      draft.dataChartChangesPrice = payload
    }
    if (type === marketType.FETCH_DATA_CHART_LIQUIDITYGROWTH) {
      draft.dataChartLiquidityGrowth = payload
    }
    if (type === marketType.FETCH_DATA_CHART_EQUITY_GROWTH) {
      draft.dataChartEquityGrowth = payload
    }
    if (type === marketType.FETCH_DATA_CHART_LIABILITIES_GROWTH) {
      draft.dataChartLiabilitiesGrowth = payload
    }
    if (type === marketType.FETCH_DATA_TABLE_EQUITY_GROWTH) {
      draft.dataTableEquityGrowth = payload
    }
    if (type === marketType.FETCH_DATA_TABLE_LIABILITIES_GROWTH) {
      draft.dataTableLiabilitiesGrowth = payload
    }
    if (type === marketType.FETCH_DATA_CHART_NET_REVENUE_GROWTH) {
      draft.dataChartNetRevenueGrowth = payload
    }
    if (type === marketType.FETCH_DATA_CHART_GROSS_PROFIT_GROWTH) {
      draft.dataChartGrossProfitGrowth = payload
    }
    if (type === marketType.FETCH_DATA_CHART_EBITDA_GROWTH) {
      draft.dataChartEBITDAGrowth = payload
    }
    if (type === marketType.FETCH_DATA_CHART_EPS_GROWTH) {
      draft.dataChartEPSGrowth = payload
    }
    if (type === marketType.FETCH_DATA_CHART_OPERATING_PROFIT_GROWTH) {
      draft.dataChartOperatingProfitGrowth = payload
    }
    if (type === marketType.FETCH_DATA_CHART_CASH_DIVIDEND_GROWTH) {
      draft.dataChartCashDividendGrowth = payload
    }
    if (type === marketType.FETCH_DATA_HOT_INDUSTRY) {
      draft.dataHotIndustry = payload
    }
    if (type === 'QUERY') {
      draft.dataQuery = payload
    }
    if (type === marketType.FETCH_DATA_CHART_AVERAGE_PE) {
      draft.dataChartAveragePE = payload
    }
    if (type === marketType.FETCH_DATA_CHART_AVERAGE_PB) {
      draft.dataChartAveragePB = payload
    }
    if (type === marketType.FETCH_DATA_TABLE_AVERAGE_PE) {
      draft.dataTableAveragePE = payload
    }
    if (type === marketType.FETCH_DATA_TABLE_AVERAGE_PB) {
      draft.dataTableAveragePB = payload
    }
    if (type === marketType.FETCH_DATA_CHART_PAYOUT_RATIO) {
      draft.dataChartPayoutRatio = payload
    }
    if (type === marketType.FETCH_DATA_CHART_CASH_PAYOUT_RATIO) {
      draft.dataChartCashPayoutRatio = payload
    }
    if (type === marketType.FETCH_DATA_CHART_ASSET_TURNOVER_RATIO) {
      draft.dataChartAssetTurnoverRatio = payload
    }
    if (type === marketType.FETCH_DATA_TABLE_AVERAGE_DEBT_RATIO) {
      draft.dataTableAverageDebtRatio = payload
    }
    if (type === marketType.FETCH_DATA_CHART_MINING_PROFIT_MARGIN) {
      draft.dataChartMiningProfitMargin = payload
    }
    if (type === marketType.FETCH_DATA_CHART_INTEREST_COVERAGE_RATIO) {
      draft.dataChartInterestCoverageRatio = payload
    }
    if (type === marketType.FETCH_DATA_CHART_AVERAGE_DEBIT_INDUSTRY) {
      draft.dataChartAverageDebitIndustry = payload
    }
  });
};

export default reducer;
