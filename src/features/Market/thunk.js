import { marketServices } from "./services/marketService";
import { marketType } from "./utils/constant";

export const  fecthDataTableThanhKhoan = (exchange, type, order) => async (dispatch) =>{
    try{
        const res = await marketServices.fetchTableThanhKhoanData(exchange,type,order)
        console.log(res.data.data)
    }catch(err){
        console.log(err)
    }
}