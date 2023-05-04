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