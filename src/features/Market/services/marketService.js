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
    fetchDataExchangeableValue: () => {
        return https.get('api/v1/cash-flow/investor-transaction-value', {
        })
    },
    fetchDataLiquidityGrowth: (type) => {
        return https.get('api/v1/cash-flow/liquidity-growth', {
            params: {
                type,
            }
        })
    },
    fetchDataTransactionValueRatio: () => {
        return https.get('api/v1/cash-flow/investor-transaction-ratio', {
        })
    },
    fetchDataIndustryCashFlow: (exchange, type) => {
        return https.get('api/v1/cash-flow/industry-cash-flow', {
            params: {
                exchange,
                type,
            }
        })
    },
    fetchDataRSI: (exchange, session) => {
        return https.get('api/v1/cash-flow/rsi', {
            params: {
                exchange,
                session,
            }
        })
    },
    fetchDataTopNetBuyIndustry: (exchange, type) => {
        return https.get('api/v1/cash-flow/top-net-buy-industry', {
            params: {
                exchange,
                type,
            }
        })
    },
}