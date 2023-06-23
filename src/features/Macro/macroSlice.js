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
    });
};

export default reducer;