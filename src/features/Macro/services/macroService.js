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
    fetchDataIndexIndustrialProduction: () => {
        return https.get('api/v1/macro/ipp-chi-so-cong-nghiep', {
        })
    },
    fetchDataTableIndexIndustrialProduction: () => {
        return https.get('api/v1/macro/ipp-chi-so-cong-nghiep-table', {
        })
    },
    fetchDataIndexConsumptionStorage: (industry) => {
        return https.get('api/v1/macro/ipp-tieu-thu-va-ton-kho', {
            params: {
                industry
            }
        })
    },
    fetchDataIndexIndustrialProductionByIndustry: (industry) => {
        return https.get('api/v1/macro/ipp-san-xuat-cong-nghiep', {
            params: {
                industry
            }
        })
    },
    fetchDataIndustrialProductionPrimarily: (industry) => {
        return https.get('api/v1/macro/ipp-san-luong-cong-nghiep', {
            params: {
                industry
            }
        })
    },
    fetchDataRetailValue: (order) => {
        return https.get('api/v1/retail/ban-le-theo-nganh', {
            params: {
                order
            }
        })
    },
    fetchDataRetailSalesGrowth: (order) => {
        return https.get('api/v1/retail/tang-truong-doanh-so-theo-nganh', {
            params: {
                order
            }
        })
    },
    fetchDataTableTotalRetail: () => {
        return https.get('api/v1/retail/tong-ban-le', {
        })
    },
    fetchDataTotalImportExport: (order) => {
        return https.get('api/v1/retail/tong-xuat-nhap-khau', {
            params: {
                order
            }
        })
    },
}