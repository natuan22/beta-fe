import { stockService } from "./services/stockService"
import { stockType } from "./utils/constant"

export const fetchDataInfoHeader = (stock) => async (dispatch) => {
    try {
        const res = await stockService.fetchDataInfoHeader(stock)
        console.log(res)
        dispatch({
            type: stockType.FETCH_DATA_INFO_HEADER,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}

