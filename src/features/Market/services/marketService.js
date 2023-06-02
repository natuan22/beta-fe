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
    fetchDataMarketMap: (exchange, order) => {
        return https.get('api/v1/stock/get-market-map', {
            params: {
                exchange,
                order
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
    fetchDataCashFlowInvestor: (type, investorType, exchange) => {
        return https.get('api/v1/cash-flow/investor-cash-flow-by-industry', {
            params: {
                type,
                investorType,
                exchange
            }
        })
    },
    fetchDataTotalMarket: (exchange, type) => {
        return https.get('api/v1/cash-flow/market-total-value', {
            params: {
                exchange,
                type
            }
        })
    },
    fetchDataCashFlowRatio: (exchange, type) => {
        return https.get('api/v1/cash-flow/investor-transaction-cash-flow-ratio', {
            params: {
                exchange,
                type
            }
        })
    },
    fetchDataTableChangesPrice: (exchange, industry) => {
        return https.get('api/v1/market/hieu-suat-thay-doi-gia-co-phieu', {
            params: {
                exchange,
                industry
            }
        })
    },
    fetchDataTableLiquidityGrowth: (exchange, industry) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-thanh-khoan-co-phieu', {
            params: {
                exchange,
                industry
            }
        })
    },
    fetchDataChartLiquidityGrowth: (exchange, type, order) => {
        return https.get('api/v1/market/hieu-suat-thay-doi-thanh-khoan-nganh', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataChartChangesPrice: (exchange, type, order) => {
        return https.get('api/v1/market/hieu-suat-thay-doi-von-hoa-nganh', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataChartEquityGrowth: (exchange, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-von-chu-so-huu-nganh', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataChartLiabilitiesGrowth: (exchange, industry, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-no-phai-tra-nganh', {
            params: {
                exchange,
                industry,
                type,
                order
            }
        })
    },
    fetchDataTableEquityGrowth: (exchange, industry) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-von-chu-so-co-phieu', {
            params: {
                exchange,
                industry
            }
        })
    },
    fetchDataTableLiabilitiesGrowth: (exchange, industry) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-no-phai-tra-co-phieu', {
            params: {
                exchange,
                industry
            }
        })
    },
    fetchDataChartNetRevenueGrowth: (exchange, industry, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-doanh-thu-thuan-nganh', {
            params: {
                exchange,
                industry,
                type,
                order
            }
        })
    },
    fetchDataChartGrossProfitGrowth: (exchange, industry, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-loi-nhuan-gop-nganh', {
            params: {
                exchange,
                industry,
                type,
                order
            }
        })
    },
    fetchDataChartEBITDAGrowth: (exchange, industry, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-ebitda', {
            params: {
                exchange,
                industry,
                type,
                order
            }
        })
    },
    fetchDataChartEPSGrowth: (exchange, industry, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-eps', {
            params: {
                exchange,
                industry,
                type,
                order
            }
        })
    },
    fetchDataChartOperatingProfitGrowth: (exchange, industry, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-loi-nhuan-kinh-doanh-nganh', {
            params: {
                exchange,
                industry,
                type,
                order
            }
        })
    },
    fetchDataChartCashDividendGrowth: (exchange, industry, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-co-tuc-tien-mat', {
            params: {
                exchange,
                industry,
                type,
                order
            }
        })
    },
    fetchDataHotIndustry: () => {
        return https.get('api/v1/market/top-nganh-hot')
    },


    fetchDataChartAveragePE: (exchange, industry, type, order) => {
        return https.get('api/v1/finance-health/p-e-binh-quan-nganh', {
            params: {
                exchange,
                industry,
                type,
                order
            }
        })
    },

}