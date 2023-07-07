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
        console.log(err)
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
        console.log(err)
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
        console.log(err)
    }
}