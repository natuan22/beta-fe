import { https } from "../../../services/config";

export const newsCenterServices = {
    fetchDataTableEvents: (page, limit, exchange) => {
        return https.get('api/v1/news/event', {
            params: {
                page,
                limit,
                exchange
            }
        })
    },
    fetchDataDomesticMacro: (page, limit) => {
        return https.get('api/v1/news/vi-mo-trong-nuoc', {
            params: {
                page,
                limit
            }
        })
    },
    fetchDataForeignMacro: (page, limit) => {
        return https.get('api/v1/news/vi-mo-quoc-te', {
            params: {
                page,
                limit
            }
        })
    },
    fetchDataListEnterpriseNews: () => {
        return https.get('api/v1/news/tin-tuc-doanh-nghiep', {
        })
    },
}