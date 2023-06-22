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
    fetchDataPerGDPGrowth: () => {
        return https.get('api/v1/macro/per-gdp-tang-truong', {
        })
    },
    fetchDataPerCPIBySectors: () => {
        return https.get('api/v1/macro/per-cpi-theo-linh-vuc', {
        })
    },
    fetchDataChangeCPISectors: (order) => {
        return https.get('api/v1/macro/cpi-thay-doi', {
            params: {
                order
            }
        })
    },
    fetchDataTablePerCPIBySectors: () => {
        return https.get('api/v1/macro/table-cpi-theo-linh-vuc', {
        })
    },
    fetchDataPerCPIMonth: () => {
        return https.get('api/v1/macro/per-cpi-cung-ky', {
        })
    },
    fetchDataWeightedCPICommodityBasket: () => {
        return https.get('api/v1/macro/cpi-quyen-so', {
        })
    },
}