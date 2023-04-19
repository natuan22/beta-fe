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