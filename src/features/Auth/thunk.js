import * as authenTypes from "./utils/constant";
import { authenServices } from "./services/authenServices";

export const userLoginAction = (data) => async (dispatch) => {
  try {
    const res = await authenServices.userLogin(data)
    dispatch({
      type: authenTypes.USER_LOGIN,
      payload: res.data,
    });
    localStorage.setItem("betaToken", res.data.data.access_token);
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
    dispatch({
      type: authenTypes.USER_REGISTER,
      payload: formData,
    });

  } catch (err) {
    console.log(err);
    alert('Tài khoản đã tồn tại')
  }
};

export const autoLoginWithToken = (token) => async (dispatch) => {
  if(!token) return
  try{
    const res = await authenServices.autoLogin(token) 
    dispatch({
      type: authenTypes.USER_LOGIN,
      payload: res.data
    })
  }catch(err){
    localStorage.setItem('betaToken', "")
    dispatch({
      type: authenTypes.LOGIN_FAIL,
      payload: "Sai thông tin đăng nhập"
    })
  }
}
