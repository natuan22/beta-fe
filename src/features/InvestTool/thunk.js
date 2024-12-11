import { investToolService } from "./services/investToolService";
import { investToolType } from "./utils/constant";

export const fetchRangeMinMax = () => async (dispatch) => {
  try {
    const res = await investToolService.fetchRangeMinMax();
    dispatch({
      type: investToolType.FETCH_DATA_RANGE_MIN_MAX,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataStockFilter = (formData) => async (dispatch) => {
  try {
    const res = await investToolService.fetchDataStockFilter(formData);
    dispatch({
      type: investToolType.FETCH_DATA_STOCK_FILTER,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchStockList = (stock) => async (dispatch) => {
  try {
    const res = await investToolService.fetchStockList(stock);
    dispatch({
      type: investToolType.FETCH_DATA_STOCK_LIST,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataCateInvestKnowledge = () => async (dispatch) => {
  try {
    const res = await investToolService.fetchDataCateInvestKnowledge();
    dispatch({
      type: investToolType.FETCH_DATA_CATE_INVEST_KNOWLEDGE,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

