import axios from "axios";
import * as authenTypes from "./utils/constant";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const userLoginAction = (data) => async (dispatch) => {
  try {
    const res = await axios({
      url: `${apiUrl}/api/v1/auth/login`,
      header: {
        withCredentials: true,
      },
      method: "POST",
      data,
    });
    dispatch({
      type: authenTypes.USER_LOGIN,
      payload: res.data,
    });
    console.log(res);
    localStorage.setItem("betaUserToken", res.data.data.access_token);
  } catch (err) {
    dispatch({
      type: authenTypes.LOGIN_FAIL,
      payload: false,
    });
  }
};

export const userRegister = (FormData) => async (dispatch   ) => {
  try {
     const res = await axios({
      url: `${apiUrl}/api/v1/auth/register`,
      header: {
        withCredentials: true,
      },
      method: "POST",
      data: FormData,
    });
    console.log(res.data)
    dispatch({
      type: authenTypes.USER_REGISTER,
      payload: FormData,
    });
    
  } catch (err) {
    console.log(err);
    alert('Tài khoản đã tồn tại')
  }
};
