import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const fetchDataInternationalIndex = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/international-index`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_INTERNATIONAL_INDEX",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataBarChartRight = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/top-net-foreign`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_BARCHART_RIGHT",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataBarChartLeft = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "https://mkw-socket.vndirect.com.vn/mkwsocket/leaderlarger",
      method: "GET",
      params: {
        index: index
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_BARCHART_LEFT",
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataEvents = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/get-events`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_EVENTS",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataTableDetail = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/domestic-index`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_TABLEDETAIL",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataTopNetForeignChange = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/top-net-foreign-change`,
      method: "GET",
      params: {
        'exchange': index
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_TOP_NET_FOREIGN_CHANGE",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataROC5Phien = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/top-roc`,
      method: "GET",
      params: {
        'exchange': index
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_ROC_5PHIEN",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataGoodsDetail = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/merchandise-price?type=0`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_GOODSDETAIL",
      payload: res.data,

    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataRateDetail = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/merchandise-price?type=1`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_RATEDETAIL",

      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataGeneralIndustry = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/industry`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_GENERAL",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataTreeMapSell = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/net-foreign`,
      method: "GET",
      params: {
        exchange: index || undefined,
        transaction: 1
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_TREEMAP_SELL",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataTreeMapBuy = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/net-foreign`,
      method: "GET",
      params: {
        exchange: index || undefined,
        transaction: 0
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_TREEMAP_BUY",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataAreaChart1 = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/liquidity-today`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_AREACHART1",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataAreaChart2 = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/liquidity-yesterday`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_AREACHART2",
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataWidthMarket = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/market-breadth`,
      method: "GET",
      params: {
        index: index
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_STACKINGAREA",
      payload: res.data,
    });

   
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataTableMarketVolatility = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/market-volatility`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_TABLE_MARKET_VOLATILITY",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataTableMarketLiquidity = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/market-liquidity`,
      method: "GET",
      params: {
        order: index
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_TABLE_MARKET_LIQUIDITY",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataNetVolume = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/net-transaction-value`,
      method: "GET",
      params: {
        exchange: index
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_NET_VOLUME",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataNews = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `${apiUrl}/api/v1/stock/get-news`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_NEWS",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}