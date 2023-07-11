import { newsCenterServices } from "./services/newsCenterServices";
import { newsCenterType } from "./utils/constant";

export const fetchTableEvents = (page, limit, exchange) => async (dispatch) => {
    try {
        const res = await newsCenterServices.fetchTableEvents(page, limit, exchange)
        dispatch({
            type: newsCenterType.FETCH_DATA_TABLE_EVENTS,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}

export const fetchNewsTool = () => async dispatch => {
    try {
        const res = await newsCenterServices.fetchNewsTool()
        dispatch({
            type: newsCenterType.FETCH_NEWS_TOOL,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}


