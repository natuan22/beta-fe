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
    fetchDataBusinessResults: (stock, order, type) => {
        return https.get('api/v1/shares/ket-qua-kinh-doanh', {
            params: {
                stock,
                order,
                type
            }
        })
    },
    fetchDataBalanceSheet: (stock, order, type) => {
        return https.get('api/v1/shares/can-doi-ke-toan', {
            params: {
                stock,
                order,
                type
            }
        })
    },
    fetchDataCashFlow: (stock, order, type) => {
        return https.get('api/v1/shares/can-doi-ke-toan', {
            params: {
                stock,
                order,
                type
            }
        })
    },
    fetchDataSameIndustry: (stock, exchange) => {
        return https.get('api/v1/shares/doanh-nghiep-cung-nganh', {
            params: {
                stock,
                exchange
            }
        })
    },
    fetchDataEvents: (stock) => {
        return https.get('api/v1/shares/lich-su-kien', {
            params: {
                stock
            }
        })
    },
}