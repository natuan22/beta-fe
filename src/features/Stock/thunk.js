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
        console.log(res)
        dispatch({
            type: stockType.FETCH_DATA_FINANCIAL_INDICATORS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

