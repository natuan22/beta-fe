import produce from "immer";
import { stockType } from "./utils/constant";
const initialState = {
    dataInfoHeader: {},
    dataTableTransactionStatistics: {},
    dataFinancialIndicator: {},
    dataBusinessResults: {},
    dataBalanceSheet: {},
    dataCashFlow: {},
    dataSameIndustry: {},
    dataEvents: {}

};

const reducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
        if (type === stockType.FETCH_DATA_INFO_HEADER) {
            draft.dataInfoHeader = payload
        }
        if (type === stockType.FETCH_DATA_TABLE_TRANSACTION_STATISTICS) {
            draft.dataTableTransactionStatistics = payload
        }
        if (type === stockType.FETCH_DATA_FINANCIAL_INDICATORS) {
            draft.dataFinancialIndicator = payload
        }
        if (type === stockType.FETCH_DATA_BUSINESS_RESULTS) {
            draft.dataBusinessResults = payload
        }
        if (type === stockType.FETCH_DATA_BALANCE_SHEET) {
            draft.dataBalanceSheet = payload
        }
        if (type === stockType.FETCH_DATA_CASH_FLOW) {
            draft.dataCashFlow = payload
        }
        if (type === stockType.FETCH_DATA_SAME_INDUSTRY) {
            draft.dataSameIndustry = payload
        }
        if (type === stockType.FETCH_DATA_EVENTS) {
            draft.dataEvents = payload
        }
    });
};

export default reducer;
