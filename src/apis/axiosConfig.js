import axios from 'axios';
import authStore from '../store/authStore';






const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:80',
  timeout: 1000000,
  withCredentials: true
});




let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};


axiosInstance.interceptors.request.use(
  (config) => {

    const token = authStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }


    const storeSeq = authStore.getState().selectedStoreSeq;

    if (storeSeq) {

      config.params = {
        ...config.params,
        storeSeq: storeSeq
      };


      if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
        config.data = {
          storeSeq: storeSeq,
          ...config.data
        };
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;


    if (status === 401 && !originalRequest._retry) {

      if (originalRequest.url.includes('/auth/reissue') || originalRequest.url.includes('/auth/login')) {
        return Promise.reject(error);
      }


      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {

        const response = await axios.post(
          `${axiosInstance.defaults.baseURL}/auth/reissue`,
          {},
          { withCredentials: true }
        );


        const newAccessToken = response.data.token;


        authStore.getState().setToken(newAccessToken);


        onRefreshed(newAccessToken);


        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);

      } catch (reissueError) {

        alert("로그인 세션이 만료되었거나 정보가 올바르지 않습니다. 다시 로그인해주세요.");
        authStore.getState().logout();
        refreshSubscribers = [];
        window.location.href = '/login';
        return Promise.reject(reissueError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;