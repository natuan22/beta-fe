import { marketServices } from "./services/marketService";
import { marketType } from "./utils/constant";

export const fecthDataTableThanhKhoan = (exchange, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchTableThanhKhoanData(exchange, type, order)
        dispatch({
            type: marketType.FETCH_DATA_TABLE_THANH_KHOAN,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchChartTickerContribute = (exchange, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchChartTickerContribute(exchange, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_TICKER_CONTRIBUTE,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataLineChartMarket = (index, type) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataLineChartMarket(index, type)
        dispatch({
            type: marketType.FETCH_DATA_LINE_CHART_MARKET,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataInvestorTransaction = (type, investorType) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataInvestorTransaction(type, investorType)
        dispatch({
            type: marketType.FETCH_DATA_INVESTOR_TRANSACTION,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataCashValue = (type) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataCashValue(type)
        dispatch({
            type: marketType.FETCH_DATA_CASH_VALUE,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataDoRongThiTruong = (exchange, type) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataDoRongThiTruong(exchange, type)
        dispatch({
            type: marketType.FETCH_DATA_DO_RONG_THI_TRUONG,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}