import produce from "immer";
import { macroType } from "./utils/constant";
const initialState = {
    dataGDPByIndustry: {},
    dataGDPByPrice: {},
    dataGDPContributionRatio: {},
    dataGDPGrowth: {},
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
    });
};

export default reducer;