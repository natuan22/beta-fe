import { https } from "../../../services/config"

export const stockService = {
    fetchDataInfoHeader: (stock) => {
        return https.get('api/v1/stock/header', {
            params: {
                stock
            }
        })
    },
    fetchDataTableTransactionStatistics: (stock) => {
        return https.get('api/v1/stock/thong-ke-giao-dich', {
            params: {
                stock
            }
        })
    },
}