import { newsCenterServices } from "./services/newsCenterServices";
import { newsCenterType } from "./utils/constant";


export const fetchDataTableEvents = (page, limit, exchange) => async (dispatch) => {
    try {
        const res = await newsCenterServices.fetchDataTableEvents(page, limit, exchange)
        dispatch({
            type: newsCenterType.FETCH_DATA_TABLE_EVENTS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchNewsTool = async (dispatch) => {
    try {
        const res = await newsCenterServices.fetchNewsTool()
        dispatch({
            type: newsCenterType.FETCH_NEWS_TOOL,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}


export const fetchDataDomesticMacro = (page, limit) => async (dispatch) => {
    try {
        const res = await newsCenterServices.fetchDataDomesticMacro(page, limit)
        dispatch({
            type: newsCenterType.FETCH_DATA_DOMESTIC_MARCO,

            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataForeignMacro = (page, limit) => async (dispatch) => {
    try {
        const res = await newsCenterServices.fetchDataForeignMacro(page, limit)
        dispatch({
            type: newsCenterType.FETCH_DATA_FOREIGN_MARCO,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataListEnterpriseNews = async (dispatch) => {
    try {
        const res = await newsCenterServices.fetchDataListEnterpriseNews()
        dispatch({
            type: newsCenterType.FETCH_DATA_LIST_ENTERPRISE_NEWS,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataStockInfo = async dispatch => {
    try {
        const res = await newsCenterServices.fetchDataStockInfo()
        dispatch({
            type: newsCenterType.FETCH_DATA_STOCK_INFO,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

export const fetchDataNewsFilter = (page, limit, code) => async (dispatch) => {
    try {
        const res = await newsCenterServices.fetchDataNewsFilter(page, limit, code)
        dispatch({
            type: newsCenterType.FETCH_DATA_NEWS_FILTER,

            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}