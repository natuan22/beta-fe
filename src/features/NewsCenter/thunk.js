import { newsCenterServices } from "./services/newsCenterServices";
import { newsCenterType } from "./utils/constant";

export const fetchTableEvents = (exchange) => async (dispatch) => {
    try {
        const res = await newsCenterServices.fetchTableEvents(exchange)
        dispatch({
            type: newsCenterType.FETCH_DATA_TABLE_EVENTS,
            payload: res.data.data
        })
    } catch (err) {
        console.log(err)
    }
}