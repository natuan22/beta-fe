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
    fetchDataTableImportExportMarket: () => {
        return https.get('api/v1/retail/thi-truong-xuat-nhap-khau-chinh', {
        })
    },
    fetchDataExportValue: (order) => {
        return https.get('api/v1/retail/xuat-nhap-khau-mat-hang-chinh', {
            params: {
                order
            }
        })
    },
    fetchDataImportValue: (order) => {
        return https.get('api/v1/retail/nhap-khau-mat-hang-chinh', {
            params: {
                order
            }
        })
    },
    fetchDataLaborForce: () => {
        return https.get('api/v1/macro/luc-luong-lao-dong', {
        })
    },
    fetchDataUnemploymentRate: () => {
        return https.get('api/v1/macro/ti-le-that-nghiep-cac-nhom-lao-dong', {
        })
    },
    fetchDataAverageSalary: () => {
        return https.get('api/v1/macro/muc-luong-binh-quan-thi-truong-lao-dong', {
        })
    },
    fetchDataLaborRateBySector: () => {
        return https.get('api/v1/macro/ti-le-lao-dong-theo-linh-vuc', {
        })
    },
    fetchDataRateOfInformalEmployment: () => {
        return https.get('api/v1/macro/ti-le-lao-dong-phi-chinh-thuc', {
        })
    },
    fetchDataJobFluctuations: () => {
        return https.get('api/v1/macro/bien-dong-viec-lam-so-voi-cung-ky', {
        })
    },
    fetchDataChartTotalMeansOfPayment: () => {
        return https.get('api/v1/macro/tong-phuong-tien-thanh-toan', {
        })
    },
    fetchDataTableTotalMeansOfPayment: () => {
        return https.get('api/v1/macro/tang-truong-tong-phuong-tien-thanh-toan', {
        })
    },
    fetchDataInternationalBalanceOfPayments: () => {
        return https.get('api/v1/macro/can-can-thanh-toan-quoc-te', {
        })
    },
    fetchDataCreditBalance: () => {
        return https.get('api/v1/macro/du-no-tin-dung', {
        })
    },
    fetchDataCreditBalanceGrowth: () => {
        return https.get('api/v1/macro/tang-truong-du-no-tin-dung', {
        })
    },
    fetchDataStatisticsCreditInstitution: () => {
        return https.get('api/v1/macro/thong-ke-theo-loai-hinh-to-chuc-tin-dung', {
        })
    },
}