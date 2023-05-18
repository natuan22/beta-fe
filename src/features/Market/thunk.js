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

export const fetchDataBienDongThiTruong = (exchange) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataBienDongThiTruong(exchange)
        dispatch({
            type: marketType.FETCH_DATA_DIEN_DONG_THI_TRUONG,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataExchangeableValue = () => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataExchangeableValue()
        dispatch({
            type: marketType.FETCH_DATA_EXCHANGEABLE_VALUE,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataLiquidityGrowth = (type) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataLiquidityGrowth(type)
        dispatch({
            type: marketType.FETCH_DATA_LIQUIDITY_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataTransactionValueRatio = () => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataTransactionValueRatio()
        dispatch({
            type: marketType.FETCH_DATA_TRANSACTION_VALUE_RATIO,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataIndustryCashFlow = (exchange, type) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataIndustryCashFlow(exchange, type)
        dispatch({
            type: marketType.FETCH_DATA_INDUSTRY_CASH_FLOW,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataRSI = (exchange, session) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataRSI(exchange, session)
        dispatch({
            type: marketType.FETCH_DATA_RSI,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataTopNetBuyIndustry = (exchange, type) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataTopNetBuyIndustry(exchange, type)
        dispatch({
            type: marketType.FETCH_DATA_TOP_NET_BUY_INDUSTRY,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}


export const fetchDataCashFlowInvestor = (type ,investorType ,exchange) => async (dispatch) => {
    try{
        const res = await marketServices.fetchDataCashFlowInvestor(type, investorType, exchange)
        console.log(res.data.data)
        dispatch({
            type: marketType.FETCH_DATA_CASHFLOW_INVESTOR,
            payload: res.data.data
        })
    } catch(err) {
        console.log(err)
    }
} 