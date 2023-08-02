import produce from "immer";
import { stockType } from "./utils/constant";
const initialState = {
    dataInfoHeader: {},
    dataTableTransactionStatistics: {},
    dataFinancialIndicator: {},
    dataBusinessResults: {},
    dataBalanceSheet: {},
    dataCashFlow: {},
    dataSameIndustry: {},
    dataEvents: {},
    dataTransactionData: {},
    dataTradingPriceFluctuations: {},
    dataAverageTradingVolume: {},
    dataStatisticsByMonth: {},
    dataStatisticsByQuarter: {},
    dataStatisticsByYear: {},
    dataTradingInvestors: {},
    dataNewsAndEvents: {},
    dataNews: {},
    dataTableStatementsCashFlows: {},
    dataChartStatementsCashFlows: {},
    dataCandleChart: {},
    dataInfoHeaderStatus: null
};

const reducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === stockType.FETCH_DATA_INFO_HEADER) {
            draft.dataInfoHeader = payload
        }
        if (type === stockType.FETCH_DATA_TABLE_TRANSACTION_STATISTICS) {
            draft.dataTableTransactionStatistics = payload
        }
        if (type === stockType.FETCH_DATA_FINANCIAL_INDICATORS) {
            draft.dataFinancialIndicator = payload
        }
        if (type === stockType.FETCH_DATA_BUSINESS_RESULTS) {
            draft.dataBusinessResults = payload
        }
        if (type === stockType.FETCH_DATA_BALANCE_SHEET) {
            draft.dataBalanceSheet = payload
        }
        if (type === stockType.FETCH_DATA_CASH_FLOW) {
            draft.dataCashFlow = payload
        }
        if (type === stockType.FETCH_DATA_SAME_INDUSTRY) {
            draft.dataSameIndustry = payload
        }
        if (type === stockType.FETCH_DATA_EVENTS) {
            draft.dataEvents = payload
        }
        if (type === stockType.FETCH_DATA_TRANSACTION_DATA) {
            draft.dataTransactionData = payload
        }
        if (type === stockType.FETCH_DATA_TRADING_PRICE_FLUCTUATIONS) {
            draft.dataTradingPriceFluctuations = payload
        }
        if (type === stockType.FETCH_DATA_AVERAGE_TRADING_VOLUME) {
            draft.dataAverageTradingVolume = payload
        }
        if (type === stockType.FETCH_DATA_STATISTICS_BY_MONTH) {
            draft.dataStatisticsByMonth = payload
        }
        if (type === stockType.FETCH_DATA_STATISTICS_BY_QUARTER) {
            draft.dataStatisticsByQuarter = payload
        }
        if (type === stockType.FETCH_DATA_STATISTICS_BY_YEAR) {
            draft.dataStatisticsByYear = payload
        }
        if (type === stockType.FETCH_DATA_TRADING_INVESTORS) {
            draft.dataTradingInvestors = payload
        }
        if (type === stockType.FETCH_DATA_NEWS_AND_EVENTS) {
            draft.dataNewsAndEvents = payload
        }
        if (type === stockType.FETCH_DATA_NEWS) {
            draft.dataNews = payload
        }
        if (type === stockType.FETCH_DATA_TABLE_STATEMENTS_CASH_FLOWS) {
            draft.dataTableStatementsCashFlows = payload
        }
        if (type === stockType.FETCH_DATA_CHART_STATEMENTS_CASH_FLOWS) {
            draft.dataChartStatementsCashFlows = payload
        }
        if (type === stockType.FETCH_DATA_CANDLE_CHART) {
            draft.dataCandleChart = payload
        }
        if (type === stockType.FETCH_DATA_INFO_HEADER_STATUS) {
            draft.dataInfoHeaderStatus = payload
        }
    });
};

export default reducer;
