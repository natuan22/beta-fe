import produce from "immer";
import * as actionType from "./constant";
const initialState = {
  dataInternationalIndex: {},
  dataBarChartRight: {},
  dataBarChartLeft: {},
  dataEvents: {},
  dataTopNetForeignChange: {},
  dataTableDetail: {},
  dataROC5Phien: {},
  dataKhoaNgoaiMuaRong: {},
  dataGoodsDetail: {},
  dataRateDetail: {},
  dataGeneral: {},
  dataTreemapSell: [],
  dataTreemapBuy: [],
  dataChart1: {},
  dataChart2: {},
  dataStackingArea: {},
  dataTableMarketVolatility: {},
  dataTableMarketLiquidity: {},
  dataNetVolume: {},
  dataNews: {},
  dataMarketEvaluation: {},
  dataLineChart:{},
};

const reducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === actionType.UPDATE_DATA_INTERNATIONAL_INDEX) {
      draft.dataInternationalIndex = payload;
    }
    if (type === actionType.UPDATE_DATA_BARCHART_RIGHT) {
      draft.dataBarChartRight = payload;
    }
    if (type === actionType.UPDATE_DATA_EVENTS) {
      draft.dataEvents = payload;
    }
    if (type === actionType.UPDATE_DATA_TOP_NET_FOREIGN_CHANGE) {
      draft.dataTopNetForeignChange = payload;
    }
    if (type === actionType.UPDATE_DATA_BARCHART_LEFT) {
      draft.dataBarChartLeft = payload;
    }
    if (type === actionType.UPDATE_DATA_TABLEDETAIL) {
      draft.dataTableDetail = payload;
    }
    if (type === actionType.UPDATE_DATA_ROC_5PHIEN) {
      draft.dataROC5Phien = payload;
    }
    if (type === actionType.UPDATE_DATA_KHOA_NGOAI_MUA_RONG) {
      draft.dataKhoaNgoaiMuaRong = payload;
    }
    if (type === actionType.UPDATE_DATA_GOODSDETAIL) {
      draft.dataGoodsDetail = payload;
    }
    if (type === actionType.UPDATE_DATA_RATEDETAIL) {
      draft.dataRateDetail = payload;
    }
    if (type === actionType.UPDATE_DATA_GENERAL) {
      draft.dataGeneral = payload;
    }
    if (type === actionType.UPDATE_DATA_TREEMAP_SELL) {
      draft.dataTreemapSell = payload
    }
    if (type === actionType.UPDATE_DATA_TREEMAP_BUY) {
      draft.dataTreemapBuy = payload
    }
    if (type === actionType.UPDATE_DATA_AREACHART1) {
      draft.dataChart1 = payload
    }
    if (type === actionType.UPDATE_DATA_AREACHART2) {
      draft.dataChart2 = payload
    }
    if (type === actionType.UPDATE_DATA_STACKINGAREA) {
      draft.dataStackingArea = payload
    }
    if (type === actionType.UPDATE_DATA_TABLE_MARKET_VOLATILITY) {
      draft.dataTableMarketVolatility = payload
    }
    if (type === actionType.UPDATE_DATA_TABLE_MARKET_LIQUIDITY) {
      draft.dataTableMarketLiquidity = payload
    }
    if (type === actionType.UPDATE_DATA_NET_VOLUME) {
      draft.dataNetVolume = payload
    }
    if (type === actionType.UPDATE_DATA_NEWS) {
      draft.dataNews = payload
    }
    if (type === actionType.UPDATE_DATA_MARKET_EVALUATION) {
      draft.dataMarketEvaluation = payload
    }
    if(type === actionType.UPDATE_DATA_LINE_CHART) {
      draft.dataLineChart = payload
    }
  });
};

export default reducer;
