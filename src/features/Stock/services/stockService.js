import { https } from "../../../services/config"

export const stockService = {
    fetchDataInfoHeader: (stock) => {
        return https.get('api/v1/shares/header', {
            params: {
                stock
            }
        })
    },
    fetchDataTableTransactionStatistics: (stock) => {
        return https.get('api/v1/shares/thong-ke-giao-dich', {
            params: {
                stock
            }
        })
    },
    fetchDataFinancialIndicators: (stock) => {
        return https.get('/api/v1/shares/chi-so-tai-chinh', {
            params: {
                stock
            }
        })
    }
}