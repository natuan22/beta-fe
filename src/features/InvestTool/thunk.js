import { investToolService } from "./services/investToolService"
import { investToolType } from "./utils/constant"


export const fetchRangeMinMax = () => async dispatch => {
    try {
        const res = await investToolService.fetchRangeMinMax()
        dispatch({
            type: investToolType.FETCH_DATA_RANGE_MIN_MAX,
            payload: res.data.data
        })
    } catch (err) {
        console.error(err)
    }
}


export const fetchDataStockFilter = (formData) => async dispatch => {
    try {
        const res = await investToolService.fetchDataStockFilter(formData)
        console.log(res)
    } catch (err) {
        console.error(err)
    }
}