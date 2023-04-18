import { https } from "../../../services/config";

export const marketServices={
    fetchTableThanhKhoanData: (exchange, type, order) => {
        return https.get('api/v1/stock/liquidity-contribute',{
            params:{
                exchange,
                type,
                order
            }
        })
    }
}