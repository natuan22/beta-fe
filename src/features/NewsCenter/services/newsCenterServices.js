import { https } from "../../../services/config";

export const newsCenterServices = {
    fetchTableEvents: (exchange) => {
        return https.get('api/v1/news/event', {
            params: {
                exchange
            }
        })
    },
}