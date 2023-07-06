import produce from "immer";
import { newsCenterType } from "./utils/constant";
const initialState = {
  dataTableEvents: {},
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === newsCenterType.FETCH_DATA_TABLE_EVENTS) {
      draft.dataTableEvents = payload
    }
  });
};

export default reducer;
