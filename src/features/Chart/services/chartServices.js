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
}