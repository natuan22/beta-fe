import { analysisCenterService } from "./services/analysisCenterService";
import { analysisCenterType } from "./utils/contant";

export const fetchDataAnalysisCenter = (type) => async (dispatch) => {
  try {
    const res = await analysisCenterService.fetchDataAnalysisCenter(type);
    dispatch({
      type: analysisCenterType.FETCH_DATA_ANALYSIS_CENTER,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};
