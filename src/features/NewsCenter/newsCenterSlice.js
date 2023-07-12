import produce from "immer";
import { newsCenterType } from "./utils/constant";
const initialState = {
  dataTableEvents: {},
  newsTool: {},
  dataDomesticMacro: {},
  dataForeignMacro: {},
  dataListEnterpriseNews: {},

};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === newsCenterType.FETCH_DATA_TABLE_EVENTS) {
      draft.dataTableEvents = payload
    }

    if (type === newsCenterType.FETCH_NEWS_TOOL) {
      draft.newsTool = payload
    }
    if (type === newsCenterType.FETCH_DATA_DOMESTIC_MARCO) {
      draft.dataDomesticMacro = payload
    }
    if (type === newsCenterType.FETCH_DATA_FOREIGN_MARCO) {
      draft.dataForeignMacro = payload
    }
    if (type === newsCenterType.FETCH_DATA_LIST_ENTERPRISE_NEWS) {
      draft.dataListEnterpriseNews = payload

    }
  });
};

export default reducer;
