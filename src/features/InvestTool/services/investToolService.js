import { https } from "../../../services/config";

export const investToolService = {
    fetchRangeMinMax: () => {
        return https.get('/api/v1/investment/key-filter')
    },
    fetchDataStockFilter: (formData) => {
        return https.post('/api/v1/investment/filter', formData)
    },
    fetchStockList: (key_search) => {
        return https.get('/api/v1/shares/search', {
            params: {
                key_search
            }
        })
    }
}