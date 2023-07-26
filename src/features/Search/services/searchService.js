import { https } from "../../../services/config"

export const searchService = {
    handleDebounceSearch: (key_search) => {
        return https.get('/api/v1/stock/search', {
            params: {
                key_search
            }
        })
    }
}