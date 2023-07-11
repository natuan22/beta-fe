import { https } from "../../../services/config";

export const newsCenterServices = {
    fetchTableEvents: (page, limit, exchange) => {
        return https.get('api/v1/news/event', {
            params: {
                page,
                limit,
                exchange
            }
        })
    },
    fetchNewsTool: () => {
        return https.get('/api/v1/news/filter')
    }
}
