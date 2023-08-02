import { stockService } from "./services/stockService"
import { stockType } from "./utils/constant"

export const fetchDataInfoHeader = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataInfoHeader(stock)
        dispatch({
            type: stockType.FETCH_DATA_INFO_HEADER,
            payload: res.data.data
        })
    } catch (err) {
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
