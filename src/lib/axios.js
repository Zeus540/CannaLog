import Axios from "axios";


let axios = Axios.create()


axios.defaults.withCredentials = true
axios.interceptors.response.use(

    function (response){
        return response
    },

    function (error){

       return Promise.reject(error)
    }
)

axios.interceptors.request.use(
    function (config) {

      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      config.data = {
        ...config.data,
        timezone: userTimezone,
      };
  
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

export default axios