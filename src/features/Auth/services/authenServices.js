import { https } from "../../../services/config";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_BASE_URL;

export const authenServices = {
  userLogin: (data) => {
    return https.post(`${apiUrl}/api/v1/auth/login`, data);
  },
  userRegister: (formData) => {
    return https.post(`${apiUrl}/api/v1/auth/register`, formData);
  },

  autoLogin: (token) => {
    return https.get(`${apiUrl}/api/v1/user/info`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  userLogout: () => {
    // console.log(Cookies.get('at'))
    return https.post("api/v1/auth/logout", {
      headers: {
        Authorization: "Bearer " + Cookies.get("at"),
      },
    });
  },
};
