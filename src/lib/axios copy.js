import Axios from "axios";
import { format } from 'date-fns';


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
      // Modify the request data to include custom properties
      console.log("axios",config.data)
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      config.data = {
        ...config.data,
        creation_date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        timezone: userTimezone,
      };
  
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

export default axios