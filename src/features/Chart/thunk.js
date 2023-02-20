import axios from "axios";
import { async } from "q";

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
      params:{
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
      url: "http://192.168.15.174:3000/topforeign.dat",
      method: "GET",
      params: {
        exchange: index
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_TOP10_SELL",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDataTop10Buy = (index) => async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.15.174:3000/topforeign.dat",
      method: "GET",
      params: {
        exchange: index
      }
    });
    dispatch({
      type: "beta/UPDATE_DATA_TOP10_BUY",
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

export const fetchDataRateDetail = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.9.250:5000/ngoaite",
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
      url: "http://192.168.9.250:5000/tongnganh",
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