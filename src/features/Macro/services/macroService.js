import { https } from "../../../services/config";

export const macroServices = {
    fetchDataGDPByIndustry: () => {
        return https.get('api/v1/macro/gdp-theo-nganh', {
        })
    },
    fetchDataGDPByPrice: () => {
        return https.get('api/v1/macro/gdp-theo-gia', {
        })
    },
    fetchDataGDPContributionRatio: () => {
        return https.get('api/v1/macro/gdp-dong-gop', {
        })
    },
    fetchDataGDPGrowth: (order) => {
        return https.get('api/v1/macro/gdp-tang-truong', {
            params: {
                order
            }
        })
    },
}