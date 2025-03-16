import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    let accessToken = localStorage.getItem("accessToken");
    console.log('accessToken',accessToken)
    if (accessToken === "undefined" || accessToken === "null") {
      accessToken = null;
    }
    if (accessToken) {
      
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
