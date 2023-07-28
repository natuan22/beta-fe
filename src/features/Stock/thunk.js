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

