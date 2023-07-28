import produce from "immer";
import { stockType } from "./utils/constant";
const initialState = {
    dataInfoHeader: {},
    dataTableTransactionStatistics: {}
};

const reducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === stockType.FETCH_DATA_INFO_HEADER) {
            draft.dataInfoHeader = payload
        }
        if (type === stockType.FETCH_DATA_TABLE_TRANSACTION_STATISTICS) {
            draft.dataTableTransactionStatistics = payload
        }
    });
};

export default reducer;
