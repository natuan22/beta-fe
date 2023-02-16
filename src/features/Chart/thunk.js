import axios from "axios";

export const fetchDataCarousel = async (dispatch) => {
  try {
    const res = await axios({
      // url: domain + endpoint
      url: "http://192.168.15.174:3000/chisoquocte.dat",
      method: "GET",
    });
    dispatch({
      type: "beta/UPDATE_DATA_CAROUSEL",
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

