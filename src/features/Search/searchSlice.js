import produce from "immer";
import { searchType } from "./utils/constant";
const initialState = {
  searchResult: {},
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === searchType.DEBOUNCE_SEARCH) {
      draft.searchResult = payload;
    }
  });
};

export default reducer;
