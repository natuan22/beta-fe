import produce from "immer";
import { macroType } from "./utils/constant";
const initialState = {
    dataGDPByIndustry: {},
    dataGDPByPrice: {},
    dataGDPContributionRatio: {},
    dataGDPGrowth: {},
    dataPerGDPGrowth: {},
    dataPerCPIBySectors: {},
    dataChangeCPISectors: {},
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
        if (type === macroType.FETCH_DATA_CHANGE_CPI_SECTORS) {
            draft.dataChangeCPISectors = payload
        }
    });
};

export default reducer;