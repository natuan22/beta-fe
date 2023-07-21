import { chartServices } from "./services/chartServices";

export const fetchDataInternationalIndex = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataInternationalIndex()
    dispatch({
      type: "beta/UPDATE_DATA_INTERNATIONAL_INDEX",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataBarChartRight = (exchange) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataBarChartRight(exchange)
    dispatch({
      type: "beta/UPDATE_DATA_BARCHART_RIGHT",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataBarChartLeft = (exchange) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataBarChartLeft(exchange)
    dispatch({
      type: "beta/UPDATE_DATA_BARCHART_LEFT",
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataEvents = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataEvents()
    dispatch({
      type: "beta/UPDATE_DATA_EVENTS",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataTableDetail = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataTableDetail()
    dispatch({
      type: "beta/UPDATE_DATA_TABLEDETAIL",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataTopNetForeignChange = (exchange) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataTopNetForeignChange(exchange)
    dispatch({
      type: "beta/UPDATE_DATA_TOP_NET_FOREIGN_CHANGE",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataROC5Phien = (exchange) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataROC5Phien(exchange)
    dispatch({
      type: "beta/UPDATE_DATA_ROC_5PHIEN",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataGoodsDetail = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataGoodsDetail()
    dispatch({
      type: "beta/UPDATE_DATA_GOODSDETAIL",
      payload: res.data,

    });
  } catch (err) {
    console.error(err);
  }
}

export const fetchDataRateDetail = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataRateDetail()
    dispatch({
      type: "beta/UPDATE_DATA_RATEDETAIL",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
}

export const fetchDataGeneralIndustry = (exchange) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataGeneralIndustry(exchange)
    dispatch({
      type: "beta/UPDATE_DATA_GENERAL",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
}

export const fetchDataTreeMapSell = (exchange) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataTreeMapSell(exchange)
    dispatch({
      type: "beta/UPDATE_DATA_TREEMAP_SELL",
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataTreeMapBuy = (exchange) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataTreeMapBuy(exchange)
    dispatch({
      type: "beta/UPDATE_DATA_TREEMAP_BUY",
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const fetchDataAreaChart1 = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataAreaChart1()
    dispatch({
      type: "beta/UPDATE_DATA_AREACHART1",
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
}

export const fetchDataAreaChart2 = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataAreaChart2()
    dispatch({
      type: "beta/UPDATE_DATA_AREACHART2",
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err);
  }
}

export const fetchDataWidthMarket = (index) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataWidthMarket(index)
    dispatch({
      type: "beta/UPDATE_DATA_STACKINGAREA",
      payload: res.data,
    });


  } catch (err) {
    console.error(err);
  }
}

export const fetchDataTableMarketVolatility = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataTableMarketVolatility()
    dispatch({
      type: "beta/UPDATE_DATA_TABLE_MARKET_VOLATILITY",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
}

export const fetchDataTableMarketLiquidity = (order) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataTableMarketLiquidity(order)
    dispatch({
      type: "beta/UPDATE_DATA_TABLE_MARKET_LIQUIDITY",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
}

export const fetchDataNetVolume = (exchange) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataNetVolume(exchange)
    dispatch({
      type: "beta/UPDATE_DATA_NET_VOLUME",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
}

export const fetchDataNews = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataNews()
    dispatch({
      type: "beta/UPDATE_DATA_NEWS",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
}

export const fetchDataMarketEvaluation = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataMarketEvaluation()
    dispatch({
      type: "beta/UPDATE_DATA_MARKET_EVALUATION",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
}

export const fetchDataMacroNews = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataMacroNews()
    dispatch({
      type: "beta/UPDATE_DATA_MACRO_NEWS",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
}



export const fetchDataLineChartHomePage = (index) => async (dispatch) => {
  try {
    const res = await chartServices.fetchDataLineChartHomePage(index)
    dispatch({
      type: 'beta/DATA_LINECHART_HOMEPAGE',
      payload: res.data
    })
  } catch (err) {
    console.log(err)
  }
}

export const fetchDataCashFlowAllocation = async (dispatch) => {
  try {
    const res = await chartServices.fetchDataCashFlowAllocation()
    dispatch({
      type: "beta/UPDATE_DATA_CASH_FLOW_ALLOCATION",
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
}

