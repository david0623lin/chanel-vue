import axios from "axios";
import { useTokenStore } from '@/utils/pinia/StoreToken';

const tokenStore = useTokenStore();

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8888/chanel",
  timeout: 1000,
  validateStatus: () => true // 忽略所有 HTTP 狀態碼，視為成功
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    const sid = tokenStore.getSid;

    if (sid) {
      config.headers['Sid'] = sid;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

export default axiosInstance;
