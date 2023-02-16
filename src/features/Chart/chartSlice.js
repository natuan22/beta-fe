import produce from "immer";
import * as actionType from './constant'
const initialState = {
  dataCarousel: {},
  dataBarChartRight: {},
  dataBarChartLeft: {},
  indexApiBarChartLeft:'',
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if(type === actionType.UPDATE_DATA_CAROUSEL){
      draft.dataCarousel = payload
    }
    if(type === actionType.UPDATE_DATA_BARCHART_RIGHT){
      draft.dataBarChartRight = payload
    }
    if(type === actionType.SET_INDEX_BARCHART_LEFT){
      draft.indexApiBarChartLeft = payload
    }
    if(type === actionType.UPDATE_DATA_BARCHART_LEFT){
       draft.dataBarChartLeft = payload
    }
  });
};

export default reducer;
