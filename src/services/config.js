import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const https = axios.create({
  baseURL: apiUrl,
  headers: {
    mac: localStorage.getItem('DeviceId')
  }
}
);



https.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})



https.interceptors.response.use(
  respose => {
    return respose
  },
  async error => {
    if (error.response.status === 401) {
      try {
        const response = await https.post('/refresh', {
          refreshToken: localStorage.getItem('access_token')
        })
      } catch (refreshError) {
        // Xử lý lỗi khi cố gắng refresh token
        // Điều hướng người dùng đến trang đăng nhập hoặc hiển thị thông báo lỗi
        console.error("Lỗi khi thử refresh token:", refreshError);
        // Điều hướng hoặc xử lý lỗi tại đây
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }

)
