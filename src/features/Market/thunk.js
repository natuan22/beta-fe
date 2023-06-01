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

export const fetchDataMarketMap = (exchange, order) => async dispatch => {
    try {
        const res = await marketServices.fetchDataMarketMap(exchange, order)
        dispatch({
            type: marketType.FETCH_DATA_MARKET_MAP,
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

export const fetchDataCashFlowInvestor = (type, investorType, exchange) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataCashFlowInvestor(type, investorType, exchange)
        dispatch({
            type: marketType.FETCH_DATA_CASHFLOW_INVESTOR,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataCashFlowRatio = (exchange, type) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataCashFlowRatio(exchange, type)
        dispatch({
            type: marketType.FETCH_DATA_CASHFLOW_RATIO,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataTotalMarket = (exchange, type) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataTotalMarket(exchange, type)
        dispatch({
            type: marketType.FETCH_DATA_TOTAL_MARKET,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataTableChangesPrice = (exchange, industry) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataTableChangesPrice(exchange, industry)
        dispatch({
            type: marketType.FETCH_DATA_TABLE_CHANGES_PRICE,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataTableLiquidityGrowth = (exchange, industry) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataTableLiquidityGrowth(exchange, industry)
        dispatch({
            type: marketType.FETCH_DATA_TABLE_LIQUIDITY_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartLiquidityGrowth = (exchange, industry, type, order) => async dispatch => {
    try {
        const res = await marketServices.fetchDataChartLiquidityGrowth(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_LIQUIDITYGROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartChangesPrice = (exchange, industry, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataChartChangesPrice(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_CHANGES_PRICE,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartEquityGrowth = (exchange, industry, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataChartEquityGrowth(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_EQUITY_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartLiabilitiesGrowth = (exchange, industry, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataChartLiabilitiesGrowth(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_LIABILITIES_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataTableEquityGrowth = (exchange, industry) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataTableEquityGrowth(exchange, industry)
        dispatch({
            type: marketType.FETCH_DATA_TABLE_EQUITY_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataTableLiabilitiesGrowth = (exchange, industry) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataTableLiabilitiesGrowth(exchange, industry)
        dispatch({
            type: marketType.FETCH_DATA_TABLE_LIABILITIES_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartNetRevenueGrowth = (exchange, industry, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataChartNetRevenueGrowth(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_NET_REVENUE_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartGrossProfitGrowth = (exchange, industry, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataChartGrossProfitGrowth(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_GROSS_PROFIT_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartEBITDAGrowth = (exchange, industry, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataChartEBITDAGrowth(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_EBITDA_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartEPSGrowth = (exchange, industry, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataChartEPSGrowth(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_EPS_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartOperatingProfitGrowth = (exchange, industry, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataChartOperatingProfitGrowth(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_OPERATING_PROFIT_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartCashDividendGrowth = (exchange, industry, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataChartCashDividendGrowth(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_CASH_DIVIDEND_GROWTH,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataHotIndustry = async dispatch => {
    try {
        const res = await marketServices.fetchDataHotIndustry()
        dispatch({
            type: marketType.FETCH_DATA_HOT_INDUSTRY,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchDataChartAveragePE = (exchange, industry, type, order) => async (dispatch) => {
    try {
        const res = await marketServices.fetchDataChartAveragePE(exchange, industry, type, order)
        dispatch({
            type: marketType.FETCH_DATA_CHART_AVERAGE_PE,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}