import produce from "immer";
import { macroType } from "./utils/constant";
const initialState = {
    dataGDPByIndustry: {},
    dataGDPByPrice: {},
    dataGDPContributionRatio: {},
    dataGDPGrowth: {},
    dataPerGDPGrowth: {},
    dataPerCPIBySectors: {},
    dataTablePerCPIBySectors: {},
    dataChangeCPISectors: {},
    dataPerCPIMonth: {},
    dataWeightedCPICommodityBasket: {},
    dataIndexIndustrialProduction: {},
    dataTableIndexIndustrialProduction: {},
    dataIndexConsumptionStorage: {},
    dataIndexIndustrialProductionByIndustry: {},
    dataIndustrialProductionPrimarily: {},
    dataRetailValue: {},
    dataRetailSalesGrowth: {},
    dataTableTotalRetail: {},
    dataTotalImportExport: {},
    dataTableImportExportMarket: {},
    dataExportValue: {},
    dataImportValue: {},
    dataLaborForce: {},
    dataUnemploymentRate: {},
    dataAverageSalary: {},
    dataLaborRateBySector: {},
    dataRateOfInformalEmployment: {},
    dataJobFluctuations: {},
    dataChartTotalMeansOfPayment: {},
    dataTableTotalMeansOfPayment: {},
    dataInternationalBalanceOfPayments: {},
    dataCreditBalance: {},
    dataCreditBalanceGrowth: {},
    dataStatisticsCreditInstitution: {},
    dataTotalInvestProjects: {},
    dataForeignInvestIndex: {},
    dataTotalRegisteredAndDisbursedCapital: {},
    dataAccumulatedAndTotalInvestment: {},
    dataMapExImport: {},
    dataBondsIssued: {},
    dataBondInterestRate: {},
    dataTotalOutstandingDebtAndBondInterest: {},
    dataEstimatedValueBondsDueDate: {},
    dataListMaturityBonds: {},
    dataListOverdueBondObligation: {},
    dataDebtBalanceStructure: {},
    dataProportionOutstandingLoans: {},
};

const reducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === macroType.FETCH_DATA_GDP_BY_INDUSTRY) {
            draft.dataGDPByIndustry = payload
        }
        if (type === macroType.FETCH_DATA_GDP_BY_PRICE) {
            draft.dataGDPByPrice = payload
        }
        if (type === macroType.FETCH_DATA_GDP_CONTRIBUTION_RATIO) {
            draft.dataGDPContributionRatio = payload
        }
        if (type === macroType.FETCH_DATA_GDP_GROWTH) {
            draft.dataGDPGrowth = payload
        }
        if (type === macroType.FETCH_DATA_PER_GDP_GROWTH) {
            draft.dataPerGDPGrowth = payload
        }
        if (type === macroType.FETCH_DATA_PER_CPI_BY_SECTORS) {
            draft.dataPerCPIBySectors = payload
        }
        if (type === macroType.FETCH_DATA_TABLE_PER_CPI_BY_SECTORS) {
            draft.dataTablePerCPIBySectors = payload
        }
        if (type === macroType.FETCH_DATA_CHANGE_CPI_SECTORS) {
            draft.dataChangeCPISectors = payload
        }
        if (type === macroType.FETCH_DATA_PER_CPI_MONTH) {
            draft.dataPerCPIMonth = payload
        }
        if (type === macroType.FETCH_DATA_WEIGHTED_CPI_COMMODITY_BASKET) {
            draft.dataWeightedCPICommodityBasket = payload
        }
        if (type === macroType.FETCH_DATA_INDEX_INDUSTRIAL_PRODUCTION) {
            draft.dataIndexIndustrialProduction = payload
        }
        if (type === macroType.FETCH_DATA_TABLE_INDEX_INDUSTRIAL_PRODUCTION) {
            draft.dataTableIndexIndustrialProduction = payload
        }
        if (type === macroType.FETCH_DATA_INDEX_CONSUMPTION_STORAGE) {
            draft.dataIndexConsumptionStorage = payload
        }
        if (type === macroType.FETCH_DATA_INDEX_INDUSTRIAL_PRODUCTION_BY_INDUSTRY) {
            draft.dataIndexIndustrialProductionByIndustry = payload
        }
        if (type === macroType.FETCH_DATA_INDUSTRIAL_PRODUCTION_PRIMARILY) {
            draft.dataIndustrialProductionPrimarily = payload
        }
        if (type === macroType.FETCH_DATA_RETAIL_VALUE) {
            draft.dataRetailValue = payload
        }
        if (type === macroType.FETCH_DATA_RETAIL_SALES_GROWTH) {
            draft.dataRetailSalesGrowth = payload
        }
        if (type === macroType.FETCH_DATA_TABLE_TOTAL_RETAIL) {
            draft.dataTableTotalRetail = payload
        }
        if (type === macroType.FETCH_DATA_TOTAL_IMPORT_EXPORT) {
            draft.dataTotalImportExport = payload
        }
        if (type === macroType.FETCH_DATA_TABLE_IMPORT_EXPORT_MARKET) {
            draft.dataTableImportExportMarket = payload
        }
        if (type === macroType.FETCH_DATA_EXPORT_VALUE) {
            draft.dataExportValue = payload
        }
        if (type === macroType.FETCH_DATA_IMPORT_VALUE) {
            draft.dataImportValue = payload
        }
        if (type === macroType.FETCH_DATA_LABOR_FORCE) {
            draft.dataLaborForce = payload
        }
        if (type === macroType.FETCH_DATA_UNEMPLOYMENT_RATE) {
            draft.dataUnemploymentRate = payload
        }
        if (type === macroType.FETCH_DATA_AVERAGE_SALARY) {
            draft.dataAverageSalary = payload
        }
        if (type === macroType.FETCH_DATA_LABOR_RATE_BY_SECTOR) {
            draft.dataLaborRateBySector = payload
        }
        if (type === macroType.FETCH_DATA_RATE_OF_INFORMAL_EMPLOYMENT) {
            draft.dataRateOfInformalEmployment = payload
        }
        if (type === macroType.FETCH_DATA_JOB_FLUCTUATIONS) {
            draft.dataJobFluctuations = payload
        }
        if (type === macroType.FETCH_DATA_CHART_TOTAL_MEANS_OF_PAYMENT) {
            draft.dataChartTotalMeansOfPayment = payload
        }
        if (type === macroType.FETCH_DATA_TABLE_TOTAL_MEANS_OF_PAYMENT) {
            draft.dataTableTotalMeansOfPayment = payload
        }
        if (type === macroType.FETCH_DATA_INTERNATIONAL_BALANCE_OF_PAYMENTS) {
            draft.dataInternationalBalanceOfPayments = payload
        }
        if (type === macroType.FETCH_DATA_CREDIT_BALANCE) {
            draft.dataCreditBalance = payload
        }
        if (type === macroType.FETCH_DATA_CREDIT_BALANCE_GROWTH) {
            draft.dataCreditBalanceGrowth = payload
        }
        if (type === macroType.FETCH_DATA_STATISTICS_CREDIT_INSTITUTION) {
            draft.dataStatisticsCreditInstitution = payload
        }
        if (type === macroType.FETCH_DATA_TOTAL_INVEST_PROJECTS) {
            draft.dataTotalInvestProjects = payload
        }
        if (type === macroType.FETCH_DATA_FOREIGN_INVEST_INDEX) {
            draft.dataForeignInvestIndex = payload
        }
        if (type === macroType.FETCH_DATA_TOTAL_REGISTERED_AND_DISBURSED_CAPITAL) {
            draft.dataTotalRegisteredAndDisbursedCapital = payload
        }
        if (type === macroType.FETCH_DATA_ACCUMULATED_AND_TOTAL_INVESTMENT) {
            draft.dataAccumulatedAndTotalInvestment = payload
        }
        if (type === macroType.FETCH_DATA_MAP_IMPORT_AND_EXPORT) {
            draft.dataMapExImport = payload
        }
        if (type === macroType.FETCH_DATA_BONDS_ISSUED) {
            draft.dataBondsIssued = payload
        }
        if (type === macroType.FETCH_DATA_BONDS_INTEREST_RATE) {
            draft.dataBondInterestRate = payload
        }
        if (type === macroType.FETCH_DATA_TOTAL_OUTSTANDING_DEBT_AND_BOND_INTEREST) {
            draft.dataTotalOutstandingDebtAndBondInterest = payload
        }
        if (type === macroType.FETCH_DATA_ESTIMATED_VALUE_BONDS_DUE_DATE) {
            draft.dataEstimatedValueBondsDueDate = payload
        }
        if (type === macroType.FETCH_DATA_LIST_MATURITY_BONDS) {
            draft.dataListMaturityBonds = payload
        }
        if (type === macroType.FETCH_DATA_LIST_OVERDUE_BOND_OBLIGATION) {
            draft.dataListOverdueBondObligation = payload
        }
        if (type === macroType.FETCH_DATA_DEBT_BALANCE_STRUCTURE) {
            draft.dataDebtBalanceStructure = payload
        }
        if (type === macroType.FETCH_DATA_PROPORTION_OUTSTANDING_LOANS) {
            draft.dataProportionOutstandingLoans = payload
        }
    });
};

export default reducer;