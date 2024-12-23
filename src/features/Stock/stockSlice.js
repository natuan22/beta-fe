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
  dataInfoHeaderStatus: null,
  dataTableBusinessReport: {},
  dataChartBusinessReport: {},
  dataTableBalanceSheet: {},
  dataChartBalanceSheet: {},
  dataChartPieBalanceSheet: {},
  dataTableFinancialIndicators: {},
  dataChartFinancialIndicators: {},
  dataFinancialHealthAnalysis: {},
  dataFinancialHealthAnalysisStatus: {},
  dataBussinessAnalysis: {},
  dataBussinessAnalysisStatus: {},
  dataBusinessPosition: {},
  dataBusinessPositionStatus: {},
  dataBasicPrice: {},
  dataBasicPriceStatus: {},
  dataTechnicalAnalysis: {},
  dataTechnicalAnalysisStatus: {},
  dataIndividualInvestorBenefits: {},
  dataIndividualInvestorBenefitsStatus: {},
  dataRatingHeader: {},
  dataFilterCanslim: {},
  dataTechnicalIndex: {},
  dataInfoStock: {},
  dataPriceFluctuationCorrelation: {},
  dataPriceFluctuation: {},
  dataSalesOrderStatistics: {},
  dataHistoricalPEPB: {},
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === stockType.FETCH_DATA_INFO_HEADER) {
      draft.dataInfoHeader = payload;
    }
    if (type === stockType.FETCH_DATA_TABLE_TRANSACTION_STATISTICS) {
      draft.dataTableTransactionStatistics = payload;
    }
    if (type === stockType.FETCH_DATA_FINANCIAL_INDICATORS) {
      draft.dataFinancialIndicator = payload;
    }
    if (type === stockType.FETCH_DATA_BUSINESS_RESULTS) {
      draft.dataBusinessResults = payload;
    }
    if (type === stockType.FETCH_DATA_BALANCE_SHEET) {
      draft.dataBalanceSheet = payload;
    }
    if (type === stockType.FETCH_DATA_CASH_FLOW) {
      draft.dataCashFlow = payload;
    }
    if (type === stockType.FETCH_DATA_SAME_INDUSTRY) {
      draft.dataSameIndustry = payload;
    }
    if (type === stockType.FETCH_DATA_EVENTS) {
      draft.dataEvents = payload;
    }
    if (type === stockType.FETCH_DATA_TRANSACTION_DATA) {
      draft.dataTransactionData = payload;
    }
    if (type === stockType.FETCH_DATA_TRADING_PRICE_FLUCTUATIONS) {
      draft.dataTradingPriceFluctuations = payload;
    }
    if (type === stockType.FETCH_DATA_AVERAGE_TRADING_VOLUME) {
      draft.dataAverageTradingVolume = payload;
    }
    if (type === stockType.FETCH_DATA_STATISTICS_BY_MONTH) {
      draft.dataStatisticsByMonth = payload;
    }
    if (type === stockType.FETCH_DATA_STATISTICS_BY_QUARTER) {
      draft.dataStatisticsByQuarter = payload;
    }
    if (type === stockType.FETCH_DATA_STATISTICS_BY_YEAR) {
      draft.dataStatisticsByYear = payload;
    }
    if (type === stockType.FETCH_DATA_TRADING_INVESTORS) {
      draft.dataTradingInvestors = payload;
    }
    if (type === stockType.FETCH_DATA_NEWS_AND_EVENTS) {
      draft.dataNewsAndEvents = payload;
    }
    if (type === stockType.FETCH_DATA_NEWS) {
      draft.dataNews = payload;
    }
    if (type === stockType.FETCH_DATA_TABLE_STATEMENTS_CASH_FLOWS) {
      draft.dataTableStatementsCashFlows = payload;
    }
    if (type === stockType.FETCH_DATA_CHART_STATEMENTS_CASH_FLOWS) {
      draft.dataChartStatementsCashFlows = payload;
    }
    if (type === stockType.FETCH_DATA_CANDLE_CHART) {
      draft.dataCandleChart = payload;
    }
    if (type === stockType.FETCH_DATA_INFO_HEADER_STATUS) {
      draft.dataInfoHeaderStatus = payload;
    }
    if (type === stockType.FETCH_DATA_TABLE_BUSINESS_REPORT) {
      draft.dataTableBusinessReport = payload;
    }
    if (type === stockType.FETCH_DATA_CHART_BUSINESS_REPORT) {
      draft.dataChartBusinessReport = payload;
    }
    if (type === stockType.FETCH_DATA_TABLE_BALANCE_SHEET) {
      draft.dataTableBalanceSheet = payload;
    }
    if (type === stockType.FETCH_DATA_CHART_BALANCE_SHEET) {
      draft.dataChartBalanceSheet = payload;
    }
    if (type === stockType.FETCH_DATA_CHART_PIE_BALANCE_SHEET) {
      draft.dataChartPieBalanceSheet = payload;
    }
    if (type === stockType.FETCH_DATA_TABLE_FINANCIAL_INDICATORS) {
      draft.dataTableFinancialIndicators = payload;
    }
    if (type === stockType.FETCH_DATA_CHART_FINANCIAL_INDICATORS) {
      draft.dataChartFinancialIndicators = payload;
    }
    if (type === stockType.FETCH_DATA_FINANCIAL_HEALTH_ANALYSIS) {
      draft.dataFinancialHealthAnalysis = payload;
    }
    if (type === stockType.FETCH_DATA_FINANCIAL_HEALTH_ANALYSIS_STATUS) {
      draft.dataFinancialHealthAnalysisStatus = payload;
    }
    if (type === stockType.FETCH_DATA_BUSSINESS_ANALYSIS) {
      draft.dataBussinessAnalysis = payload;
    }
    if (type === stockType.FETCH_DATA_BUSSINESS_ANALYSIS_STATUS) {
      draft.dataBussinessAnalysisStatus = payload;
    }
    if (type === stockType.FETCH_DATA_BUSSINESS_POSITION) {
      draft.dataBusinessPosition = payload;
    }
    if (type === stockType.FETCH_DATA_BUSSINESS_POSITION_STATUS) {
      draft.dataBusinessPositionStatus = payload;
    }
    if (type === stockType.FETCH_DATA_BASIC_PRICE) {
      draft.dataBasicPrice = payload;
    }
    if (type === stockType.FETCH_DATA_BASIC_PRICE_STATUS) {
      draft.dataBasicPriceStatus = payload;
    }
    if (type === stockType.FETCH_DATA_TECHNICAL_ANALYSIS) {
      draft.dataTechnicalAnalysis = payload;
    }
    if (type === stockType.FETCH_DATA_TECHNICAL_ANALYSIS_STATUS) {
      draft.dataTechnicalAnalysisStatus = payload;
    }
    if (type === stockType.FETCH_DATA_INDIVIDUAL_INVESTOR_BENEFITS) {
      draft.dataIndividualInvestorBenefits = payload;
    }
    if (type === stockType.FETCH_DATA_INDIVIDUAL_INVESTOR_BENEFITS_STATUS) {
      draft.dataIndividualInvestorBenefitsStatus = payload;
    }
    if (type === stockType.FETCH_DATA_RATING_HEADER) {
      draft.dataRatingHeader = payload;
    }
    if (type === stockType.FETCH_DATA_FILTER_CANSLIM) {
      draft.dataFilterCanslim = payload;
    }
    if (type === stockType.FETCH_DATA_TECHNICAL_INDEX) {
      draft.dataTechnicalIndex = payload;
    }
    if (type === stockType.FETCH_DATA_INFO_STOCK) {
      draft.dataInfoStock = payload;
    }
    if (type === stockType.FETCH_DATA_PRICE_FLUCTUATION_CORRELATION) {
      draft.dataPriceFluctuationCorrelation = payload;
    }
    if (type === stockType.FETCH_DATA_PRICE_FLUCTUATION) {
      draft.dataPriceFluctuation = payload;
    }
    if (type === stockType.FETCH_DATA_SALES_ORDER_STATISTICS) {
      draft.dataSalesOrderStatistics = payload;
    }
    if (type === stockType.FETCH_DATA_HISTORICAL_PE_PB) {
      draft.dataHistoricalPEPB = payload;
    }
  });
};

export default reducer;
