import { https } from "../../../services/config";

export const marketServices = {
    fetchTableThanhKhoanData: (exchange, type, order) => {
        return https.get('api/v1/stock/liquidity-contribute', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchChartTickerContribute: (exchange, type, order) => {
        return https.get('api/v1/chart/ticker-contribute', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataLineChartMarket: (index, type) => {
        return https.get('api/v1/chart/line-chart', {
            params: {
                index,
                type
            }
        })
    },
    fetchDataInvestorTransaction: (type, investorType) => {
        return https.get('api/v1/cash-flow/investor-transaction', {
            params: {
                type,
                investorType
            }
        })
    },
    fetchDataCashValue: (type) => {
        return https.get('api/v1/cash-flow/value', {
            params: {
                type,
            }
        })
    },
    fetchDataDoRongThiTruong: (exchange, type) => {
        return https.get('api/v1/chart/do-rong-thi-truong', {
            params: {
                exchange,
                type,
            }
        })
    },
    fetchDataBienDongThiTruong: (index) => {
        return https.get('api/v1/stock/bien-dong-thi-truong', {
            params: {
                index,
            }
        })
    },
}