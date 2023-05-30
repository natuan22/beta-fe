import { https } from "../../../services/config"
export const chartServices = {
    fetchDataInternationalIndex: () => {
        return https.get('/api/v1/stock/international-index')
    },
    fetchDataBarChartRight: (exchange) => {
        return https.get('/api/v1/stock/top-net-foreign', {
            params: {
                exchange
            }
        })
    },
    fetchDataBarChartLeft: (exchange) => {
        return https.get('/api/v1/chart/ticker-contribute', {
            params: {
                exchange,
                type: 0,
                order: 0
            }
        })
    },
    fetchDataEvents: () => {
        return https.get('/api/v1/stock/get-events')
    },
    fetchDataTableDetail: () => {
        return https.get('/api/v1/stock/domestic-index')
    },
    fetchDataTopNetForeignChange: (exchange) => {
        return https.get('/api/v1/stock/top-net-foreign-change', {
            params: {
                exchange
            }
        })
    },
    fetchDataROC5Phien: (exchange) => {
        return https.get('/api/v1/stock/top-roc', {
            params: {
                exchange
            }
        })
    },
    fetchDataGoodsDetail: () => {
        return https.get('/api/v1/stock/merchandise-price?type=0')
    },
    fetchDataRateDetail: () => {
        return https.get('/api/v1/stock/merchandise-price?type=1')
    },
    fetchDataGeneralIndustry: (exchange) => {
        return https.get('/api/v1/stock/industry', {
            params: {
                exchange
            }
        })
    },
    fetchDataTreeMapSell: (exchange) => {
        return https.get('/api/v1/stock/net-foreign', {
            params: {
                exchange,
                transaction: 1
            }
        })
    },
    fetchDataTreeMapBuy: (exchange) => {
        return https.get('/api/v1/stock/net-foreign', {
            params: {
                exchange,
                transaction: 0
            }
        })
    },
    fetchDataAreaChart1: () => {
        return https.get('/api/v1/chart/liquidity-today')
    },
    fetchDataAreaChart2: () => {
        return https.get('/api/v1/chart/liquidity-yesterday')
    },
    fetchDataWidthMarket: (index) => {
        return https.get('/api/v1/chart/market-breadth', {
            params: {
                index
            }
        })
    },
    fetchDataTableMarketVolatility: () => {
        return https.get('/api/v1/stock/market-volatility')
    },
    fetchDataTableMarketLiquidity: (order) => {
        return https.get('/api/v1/stock/market-liquidity', {
            params: {
                order
            }
        })
    },
    fetchDataNetVolume: (exchange) => {
        return https.get('/api/v1/stock/net-transaction-value', {
            params: {
                exchange
            }
        })
    },
    fetchDataNews: () => {
        return https.get('/api/v1/stock/get-news')
    },
    fetchDataMarketEvaluation: () => {
        return https.get('/api/v1/stock/market-evaluation')
    },
    fetchDataMacroNews: () => {
        return https.get('/api/v1/stock/get-macro-news')
    },
    fetchDataLineChartHomePage: (index) => {
        return https.get('/api/v1/chart/line-chart-now', {
            params: {
                index
            }
        })
    },
    fetchDataCashFlowAllocation: () => {
        return https.get('/api/v1/chart/market-cash-flow')
    }
}