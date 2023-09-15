import { stockService } from "./services/stockService"
import { stockType } from "./utils/constant"

export const fetchDataInfoHeader = (stock, type) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataInfoHeader(stock, type)
        dispatch({
            type: stockType.FETCH_DATA_INFO_HEADER,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: stockType.FETCH_DATA_INFO_HEADER_STATUS,
            payload: err.response.data.status
        })
        console.error(err)
    }
}

export const fetchDataTableTransactionStatistics = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataTableTransactionStatistics(stock)
        dispatch({
            type: stockType.FETCH_DATA_TABLE_TRANSACTION_STATISTICS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataFinancialIndicators = (stock) => async dispatch => {
    try {
        const res = await stockService.fetchDataFinancialIndicators(stock)
        dispatch({
            type: stockType.FETCH_DATA_FINANCIAL_INDICATORS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}
export const fetchDataBusinessResults = (stock, order, type) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataBusinessResults(stock, order, type)
        dispatch({
            type: stockType.FETCH_DATA_BUSINESS_RESULTS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataBalanceSheet = (stock, order, type) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataBalanceSheet(stock, order, type)
        dispatch({
            type: stockType.FETCH_DATA_BALANCE_SHEET,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataCashFlow = (stock, order, type) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataCashFlow(stock, order, type)
        dispatch({
            type: stockType.FETCH_DATA_CASH_FLOW,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataSameIndustry = (stock, exchange) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataSameIndustry(stock, exchange)
        dispatch({
            type: stockType.FETCH_DATA_SAME_INDUSTRY,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataEvents = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataEvents(stock)
        dispatch({
            type: stockType.FETCH_DATA_EVENTS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataTransactionData = (stock, from, to) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataTransactionData(stock, from, to)
        dispatch({
            type: stockType.FETCH_DATA_TRANSACTION_DATA,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataTradingPriceFluctuations = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataTradingPriceFluctuations(stock)
        dispatch({
            type: stockType.FETCH_DATA_TRADING_PRICE_FLUCTUATIONS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataAverageTradingVolume = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataAverageTradingVolume(stock)
        dispatch({
            type: stockType.FETCH_DATA_AVERAGE_TRADING_VOLUME,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataStatisticsByMonth = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataStatisticsByMonth(stock)
        dispatch({
            type: stockType.FETCH_DATA_STATISTICS_BY_MONTH,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataStatisticsByQuarter = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataStatisticsByQuarter(stock)
        dispatch({
            type: stockType.FETCH_DATA_STATISTICS_BY_QUARTER,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataStatisticsByYear = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataStatisticsByYear(stock)
        dispatch({
            type: stockType.FETCH_DATA_STATISTICS_BY_YEAR,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataTradingInvestors = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataTradingInvestors(stock)
        dispatch({
            type: stockType.FETCH_DATA_TRADING_INVESTORS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataNewsAndEvents = (stock, type) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataNewsAndEvents(stock, type)
        dispatch({
            type: stockType.FETCH_DATA_NEWS_AND_EVENTS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataNews = (stock, type) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataNews(stock, type)
        dispatch({
            type: stockType.FETCH_DATA_NEWS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataTableStatementsCashFlows = (stock, order) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataTableStatementsCashFlows(stock, order)
        dispatch({
            type: stockType.FETCH_DATA_TABLE_STATEMENTS_CASH_FLOWS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataChartStatementsCashFlows = (stock, order) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataChartStatementsCashFlows(stock, order)
        dispatch({
            type: stockType.FETCH_DATA_CHART_STATEMENTS_CASH_FLOWS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataCandleChart = stock => async dispatch => {
    try {
        const res = await stockService.fetchDataCandleChart(stock)
        dispatch({
            type: stockType.FETCH_DATA_CANDLE_CHART,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataTableBusinessReport = (stock, order) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataTableBusinessReport(stock, order)
        dispatch({
            type: stockType.FETCH_DATA_TABLE_BUSINESS_REPORT,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataChartBusinessReport = (stock, order) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataChartBusinessReport(stock, order)
        dispatch({
            type: stockType.FETCH_DATA_CHART_BUSINESS_REPORT,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataTableBalanceSheet = (stock, order) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataTableBalanceSheet(stock, order)
        dispatch({
            type: stockType.FETCH_DATA_TABLE_BALANCE_SHEET,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataChartBalanceSheet = (stock, order) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataChartBalanceSheet(stock, order)
        dispatch({
            type: stockType.FETCH_DATA_CHART_BALANCE_SHEET,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataChartPieBalanceSheet = (stock, order) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataChartPieBalanceSheet(stock, order)
        dispatch({
            type: stockType.FETCH_DATA_CHART_PIE_BALANCE_SHEET,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataTableFinancialIndicators = (stock, order) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataTableFinancialIndicators(stock, order)
        dispatch({
            type: stockType.FETCH_DATA_TABLE_FINANCIAL_INDICATORS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataChartFinancialIndicators = (stock, order) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataChartFinancialIndicators(stock, order)
        dispatch({
            type: stockType.FETCH_DATA_CHART_FINANCIAL_INDICATORS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}




export const fetchDataFinancialHealthAnalysis = (stock) => async (dispatch, getState) => {
    try {
        const res = await stockService.fetchDataFinancialHealthAnalysis(stock)
        dispatch({
            type: stockType.FETCH_DATA_FINANCIAL_HEALTH_ANALYSIS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: stockType.FETCH_DATA_FINANCIAL_HEALTH_ANALYSIS_STATUS,
            payload: err.response.data.status
        })
        console.error(err)
    }
}

export const fetchDataBussinessAnalysis = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataBussinessAnalysis(stock)
        dispatch({
            type: stockType.FETCH_DATA_BUSSINESS_ANALYSIS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: stockType.FETCH_DATA_BUSSINESS_ANALYSIS_STATUS,
            payload: err.response.data.status
        })
        console.error(err)
    }
}

export const fetchDataBusinessPosition = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataBusinessPosition(stock)
        dispatch({
            type: stockType.FETCH_DATA_BUSSINESS_POSITION,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: stockType.FETCH_DATA_BUSSINESS_POSITION_STATUS,
            payload: err.response.data.status
        })
        console.error(err)
    }
}

export const fetchDataBasicPrice = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataBasicPrice(stock)
        dispatch({
            type: stockType.FETCH_DATA_BASIC_PRICE,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: stockType.FETCH_DATA_BASIC_PRICE_STATUS,
            payload: err.response.data.status
        })
        console.error(err)
    }
}

export const fetchDataTechnicalAnalysis = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataTechnicalAnalysis(stock)
        dispatch({
            type: stockType.FETCH_DATA_TECHNICAL_ANALYSIS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: stockType.FETCH_DATA_TECHNICAL_ANALYSIS_STATUS,
            payload: err.response.data.status
        })
        console.error(err)
    }
}

export const fetchDataIndividualInvestorBenefits = (stock) => async (dispatch,) => {
    try {
        const res = await stockService.fetchDataIndividualInvestorBenefits(stock)
        dispatch({
            type: stockType.FETCH_DATA_INDIVIDUAL_INVESTOR_BENEFITS,
            payload: res.data.data
        })
    } catch (err) {
        dispatch({
            type: stockType.FETCH_DATA_INDIVIDUAL_INVESTOR_BENEFITS_STATUS,
            payload: err.response.data.status
        })
        console.error(err)
    }
}



// rating header

export const fetchDataRatingHeader = (stock) => async dispacth => {
    try {
        const res = await stockService.fetchDataRatingHeader(stock)
        dispacth({
            type: stockType.FETCH_DATA_RATING_HEADER,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}


export const fetchDataFilterCanslim = stock => async dispatch => {
    try {
        const res = await stockService.fetchDataFilterCanslim(stock)
        dispatch({
            type: stockType.FETCH_DATA_FILTER_CANSLIM,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}
