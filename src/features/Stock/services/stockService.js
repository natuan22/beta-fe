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
    fetchDataFinancialIndicators: (stock) => {
        return https.get('api/v1/shares/chi-so-tai-chinh', {
            params: {
                stock
            }
        })
    },
    fetchDataTransactionData: (stock, from, to) => {
        return https.get('api/v1/shares/du-lieu-giao-dich', {
            params: {
                stock,
                from,
                to
            }
        })
    },
    fetchDataTradingPriceFluctuations: (stock) => {
        return https.get('api/v1/shares/bien-dong-gia-giao-dich', {
            params: {
                stock,
            }
        })
    },
    fetchDataAverageTradingVolume: (stock) => {
        return https.get('api/v1/shares/khoi-luong-giao-dich-binh-quan-ngay', {
            params: {
                stock,
            }
        })
    },
    fetchDataStatisticsByMonth: (stock) => {
        return https.get('api/v1/shares/thong-ke-theo-cac-thang-quy-nam', {
            params: {
                stock,
                order: 2
            }
        })
    },
    fetchDataStatisticsByQuarter: (stock) => {
        return https.get('api/v1/shares/thong-ke-theo-cac-thang-quy-nam', {
            params: {
                stock,
                order: 0
            }
        })
    },
    fetchDataStatisticsByYear: (stock) => {
        return https.get('api/v1/shares/thong-ke-theo-cac-thang-quy-nam', {
            params: {
                stock,
                order: 1
            }
        })
    },
    fetchDataTradingInvestors: (stock) => {
        return https.get('api/v1/shares/giao-dich-cac-nhom-nha-dau-tu', {
            params: {
                stock
            }
        })
    },
    fetchDataNewsAndEvents: (stock, type) => {
        return https.get('api/v1/shares/chi-tiet-lich-su-kien', {
            params: {
                stock,
                type
            }
        })
    },
    fetchDataNews: (stock) => {
        return https.get('api/v1/shares/tin-tuc', {
            params: {
                stock
            }
        })
    },
}