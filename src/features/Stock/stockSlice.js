import produce from "immer";
import { stockType } from "./utils/constant";
const initialState = {
    dataInfoHeader: {},
};

const reducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === stockType.FETCH_DATA_INFO_HEADER) {
            draft.dataInfoHeader = payload
        }
    });
};

export default reducer;
