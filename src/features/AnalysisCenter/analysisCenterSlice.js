import produce from "immer";
import { analysisCenterType } from "./utils/contant";

const initialState = {
  dataAnalysisCenter: {},
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === analysisCenterType.FETCH_DATA_ANALYSIS_CENTER) {
      draft.dataAnalysisCenter = payload;
    }
  });
};

export default reducer;
