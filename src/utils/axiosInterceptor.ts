/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const axiosInterceptor = axios.create({
  baseURL: 'http://192.168.1.3:8000/api',
  
});

axiosInterceptor.interceptors.request.use(
  async (config) => {
    const conf = config;
    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (accessToken) {
      if (config.headers) conf.headers.Authorization = `Bearer ${accessToken}`;
    }

    return conf;
  },
  (error) => {
    return Promise.reject(error);
  },
);


axiosInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response.data);
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest.url === '/token/refresh/'
    ) {
      return Promise.reject(error);
    }
    if (typeof SecureStore !== 'undefined') {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (refreshToken) {
        const data = {
          refresh: refreshToken,
        };
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          return axiosInterceptor
            .post('/token/refresh/', data)
            .then(async (res) => {
              SecureStore.setItemAsync('accessToken', res.data.access);
              const err = error;
              err.response.config.headers.Authorization = `Bearer ${res.data.access}`;

              return axiosInterceptor(err.response.config);
            })
            .catch(async (err) => {
              // Destroy all tokens.
              if (err.response?.status === 401) {
                await SecureStore.deleteItemAsync('accessToken');
                await SecureStore.deleteItemAsync('refreshToken');
              }
              return Promise.reject(err);
            });
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInterceptor;
