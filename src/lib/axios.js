import Axios from "axios";

let axios = Axios.create();

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function (config) {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log("interceptors",config.data)
    
    config.data = {
      ...config.data,
      timezone: userTimezone,
    };

    if (config.headers["Content-Type"] === "multipart/form-data") {
      // Convert the data to FormData for multipart/form-data requests
      const formData = new FormData();
      for (const key in config.data) {
        formData.append(key, config.data[key]);
      }
      config.data = formData;
    }
  
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
