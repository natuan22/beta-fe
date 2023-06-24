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
    fetchDataChartLiabilitiesGrowth: (exchange, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-no-phai-tra-nganh', {
            params: {
                exchange,
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
    fetchDataChartNetRevenueGrowth: (exchange, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-doanh-thu-thuan-nganh', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataChartGrossProfitGrowth: (exchange, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-loi-nhuan-gop-nganh', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataChartEBITDAGrowth: (exchange, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-ebitda', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataChartEPSGrowth: (exchange, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-eps', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataChartOperatingProfitGrowth: (exchange, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-loi-nhuan-kinh-doanh-nganh', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataChartCashDividendGrowth: (exchange, type, order) => {
        return https.get('api/v1/market/hieu-suat-tang-truong-co-tuc-tien-mat', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataHotIndustry: () => {
        return https.get('api/v1/market/top-nganh-hot')
    },
    fetchDataChartAveragePB: (exchange, type, order) => {
        return https.get('/api/v1/finance-health/p-b-binh-quan-nganh', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataChartAveragePE: (exchange, type, order) => {
        return https.get('/api/v1/finance-health/p-e-binh-quan-nganh', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
    fetchDataTableAveragePE: (exchange, industry) => {
        return https.get('api/v1/finance-health/p-e-binh-quan-co-phieu', {
            params: {
                exchange,
                industry
            }
        })
    },
    fetchDataTableAveragePB: (exchange, industry) => {
        return https.get('api/v1/finance-health/p-b-binh-quan-co-phieu', {
            params: {
                exchange,
                industry
            }
        })
    },
    fetchDataChartPayoutRatio: (exchange, order) => {
        return https.get('api/v1/finance-health/ty-so-thanh-toan', {
            params: {
                exchange,
                order
            }
        })
    },
    fetchDataChartCashPayoutRatio: (exchange, order) => {
        return https.get('api/v1/finance-health/ty-so-thanh-toan-tien-mat', {
            params: {
                exchange,
                order
            }
        })
    },
    fetchDataChartAssetTurnoverRatio: (exchange, order) => {
        return https.get('api/v1/finance-health/ty-so-vong-xoay', {
            params: {
                exchange,
                order
            }
        })
    },
    fetchDataTableAverageDebtRatio: (exchange, order) => {
        return https.get('api/v1/finance-health/cac-chi-so-kha-nang-tra-no-nganh', {
            params: {
                exchange,
                order
            }
        })
    },
    fetchDataChartMiningProfitMargin: (exchange, type, order) => {
        return https.get('api/v1/finance-health/ty-suat-loi-nhuan-gop-bien-cac-nhom-nganh', {
            params: {
                exchange,
                type,
                order
            }
        })
    },
}