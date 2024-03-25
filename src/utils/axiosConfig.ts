// import {log} from 'react-native-reanimated';
import axios, { AxiosRequestHeaders } from 'axios';
// import Config from 'react-native-config';
import tokenService from '../services/token';

const API_URL = 'http://192.168.1.6:3000';

const axiosAuth = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosAuth.interceptors.request.use(
  async (config) => {
    const access_token = await tokenService.getAccessToken();
    console.log('access_token', access_token);

    (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${access_token}`;

    return config;
  },
  (error) => Promise.reject(error),
);

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    // Access Token was expired
    if (error.response && error.response.status === 422 && !config._retry) {
      config._retry = true;
      try {
        const refresh_token = await tokenService.getRefreshToken();
        console.log('refresh_token ->', refresh_token);

        if (refresh_token) {
          const res = await axios({
            url: API_URL + 'api/v1/students/refresh-token',
            method: 'post',
            data: {
              refreshToken: refresh_token,
            },
          });
          if (res.data.accessToken) {
            await tokenService.setAccessToken(res.data.accessToken);
            await tokenService.setRefreshToken(res.data.refreshToken);
          }
          return axiosAuth(config);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

const axiosNotAuth = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosNotAuth.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

const axiosFormData = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

axiosFormData.interceptors.response.use((response) => {
  return response;
});

axiosFormData.interceptors.request.use(
  async (config) => {
    const access_token = await tokenService.getAccessToken();
    (config.headers as AxiosRequestHeaders).Authorization = 'Bearer ' + access_token;
    return config;
  },
  (error) => Promise.reject(error),
);

export { axiosAuth, axiosNotAuth, axiosFormData };
