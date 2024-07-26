import axios from "axios";
import Cookies from "js-cookie";

export const apiUrl = process.env.REACT_APP_BASE_URL;
export const resourceURL = process.env.REACT_APP_RESOURCE_URL;
export const socketUrl = process.env.REACT_APP_SOCKET_URL;

const headers = {
  mac: localStorage.getItem("deviceId"),
};

const accessToken = Cookies.get("at");
if (accessToken) {
  headers.Authorization = "Bearer " + accessToken;
}
export const https = axios.create({
  baseURL: apiUrl,
  headers: headers,
});

// https.interceptors.request.use(config => {
//   const accessToken = Cookies.get('at')
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   config.withCredentials = true;
//   return config;
// });

// https.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     if (error.response && error.response.status === 401) {
//       try {
//         const response = await https.post('/refresh', {
//           refreshToken: Cookies.get('rt')e
//         });
//         // Xử lý logic refresh token ở đây nếu cần
//       } catch (refreshError) {
//         // Xử lý lỗi khi cố gắng refresh token
//         // Điều hướng người dùng đến trang đăng nhập hoặc hiển thị thông báo lỗi
//         console.error("Lỗi khi thử refresh token:", refreshError);
//         // Điều hướng hoặc xử lý lỗi tại đây
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default https;
