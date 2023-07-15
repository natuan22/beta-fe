import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const https = axios.create({
  baseURL: apiUrl,
  headers: {
    mac: localStorage.getItem('DeviceId')
  }
}
);