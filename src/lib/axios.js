import Axios from "axios";


import {BASE_URL_PROD,BASE_URL_PROD_SOCKET} from './Constants'


let axios = Axios.create()


axios.defaults.withCredentials = true
axios.interceptors.response.use(

    function (response){
        return response
    },

    function (error){

    
    //    if(error.response.status === 401){
    
    //     axios.post(`${BASE_URL_PROD}/logout`).then((results)=>{
    //         window.location.replace('/')
    //         })
    //    }

       return Promise.reject(error)
    }
)

export default axios