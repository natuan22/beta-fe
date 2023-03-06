import axios from "axios";

export const fetchDataCarousel = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.9.250:5000/chiso/quocte",
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_CAROUSEL",
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataBarChartRight = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.9.250:5000/khoingoai/toprong",
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_BARCHART_RIGHT",
      payload: res,
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

export const fetchDataNews = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.15.174:3000/lichsukien.dat",
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_NEWS",
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
      url: "http://192.168.9.250:5000/chiso/trongnuoc",
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

export const fetchDataTop10Sell = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.9.250:5000/khoingoai5phien",
      method: "GET",
      params: {
        'EXCHANGE': index
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_TOP10_SELL",
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataTop10Buy = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.9.250:5000/khoingoai5phien",
      method: "GET",
      params: {
        'EXCHANGE': index
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_TOP10_BUY",
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataDiemAnhHuong5PhienTang = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `http://192.168.9.250:5000/diemanhhuong5phien/${index}`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_DIEM_ANH_HUONG_5PHIEN_TANG",
      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataDiemAnhHuong5PhienGiam = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `http://192.168.9.250:5000/diemanhhuong5phien/${index}`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_DIEM_ANH_HUONG_5PHIEN_GIAM",
      payload: res,

    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataGoodsDetail = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.9.250:5000/hanghoa",
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

export const fetchDataKhoaNgoaiMuaRong = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: `http://192.168.15.174:3000/foreign.dat?exchange=HSX`,
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_KHOA_NGOAI_MUA_RONG",
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
      url: "http://192.168.9.250:5000/ngoaite",
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_RATEDETAIL",

      payload: res,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataGeneralIndustry = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.15.181:3001/api/v1/stock/market-breadth",
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

export const fetchDataTreeMap = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.15.174:3000/foreign.dat",
      method: "GET",
      params: {
        exchange: index || undefined
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_TREEMAP",
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
      url: "http://192.168.9.250:5000/thanhkhoanvni/hientai",
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_AREACHART1",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataAreaChart2 = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.9.250:5000/thanhkhoanvni/1ngaytruoc",
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_AREACHART2",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
}

export const fetchDataWidthMarket = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "https://mkw-socket.vndirect.com.vn/mkwsocket/gainerslosers",
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
      url: "http://192.168.15.181:3001/api/v1/stock/market-volatility",
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
      url: "http://192.168.15.181:3001/api/v1/stock/market-liquidity",
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
      url: "http://192.168.15.181:3001/api/v1/stock/net-transaction-value",
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