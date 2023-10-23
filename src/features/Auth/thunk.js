import * as authenTypes from "./utils/constant";
import { authenServices } from "./services/authenServices";
import Cookies from 'js-cookie';



export const userLoginAction = (data) => async (dispatch) => {
  try {
    const res = await authenServices.userLogin(data)
    console.log(res)
    dispatch({
      type: authenTypes.USER_LOGIN,
      payload: res.data,
    });
    // Cookies.set('access_token', res.data.data.access_token, {});
    // Cookies.set('refresh_token', res.data.data.refresh_token, {});
    // console.log(Cookies.get('access_token'))
  } catch (err) {
    dispatch({
      type: authenTypes.LOGIN_FAIL,
      payload: 'Sai tài khoản hoặc mật khẩu',
    });
  }
};

export const userRegisterAction = (formData) => async (dispatch) => {
  try {
    const res = await authenServices.userRegister(formData)
    console.log(res)
    dispatch({
      type: authenTypes.USER_REGISTER,
      payload: formData,
    });

  } catch (err) {
    alert('Tài khoản đã tồn tại')
    // console.log(err);
  }
};




export const autoLoginWithToken = (token) => async (dispatch) => {
  if (!token) return
  try {
    const res = await authenServices.autoLogin(token)
    dispatch({
      type: authenTypes.USER_LOGIN,
      payload: res.data
    })
  } catch (err) {
    localStorage.setItem('access_token', "")
    dispatch({
      type: authenTypes.LOGIN_FAIL,
      payload: "Sai thông tin đăng nhập"
    })
  }
}


export const userLogoutACtion = () => async dispatch => {
  try {
    Cookies.remove('access_token')
    Cookies.remove('refresh_token')
    dispatch({
      type: authenTypes.USER_LOGOUT_ACTION
    })
  } catch (err) {
    console.error(err)
  }
}