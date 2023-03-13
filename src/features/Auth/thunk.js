import axios from "axios"
import * as authenTypes from './utils/constant'
export const userLoginAction = (data) => async (dispatch) => {
    try {
        const res = await axios({
            url: 'http://192.168.15.181:3001/api/v1/auth/login',
            method: "POST",
            data
        })
        dispatch({
            type:authenTypes.USER_LOGIN,
            payload: res.data
        })
        localStorage.setItem("betaUserToken", res.data.accessToken)
    } catch(err) {
        dispatch({
            type: authenTypes.LOGIN_FAIL,
            payload: 'Sai tài khoản hoặc mật khẩu'
        })
    }
}