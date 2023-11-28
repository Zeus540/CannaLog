import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";

export const fetchPublicPlants = createAsyncThunk('publicPlants/fetch',async(obj)=>{

  
  let limit = obj.limit;
  let signal = obj.signal
  if (window.innerWidth <= 768) {
    limit = obj.limit_mobile; 
  }
  let sortBy = "DESC"

  try {
    let response = await axios.get(`${BASE_URL_PROD}/plants/public/?limit=${limit}&sort=${sortBy}&key_sort=${obj.key}`,{signal})
    if(response.status == 200){
      return response.data;
    }
  } catch (error) {
    throw new Error(`${error.response.status} ${error.response.statusText}`);
  }

})

export const fetchPublicPlantsSingedIn = createAsyncThunk('publicPlantsSingedIn/fetch',async(obj)=>{
  
  let limit = obj.limit;
  let signal = obj.signal
  if (window.innerWidth <= 768) {
    limit = obj.limit_mobile; 
  }
  let sortBy = "DESC"

  try {
    let response = await axios.get(`${BASE_URL_PROD}/plants/public_signed_in/?limit=${limit}&sort=${sortBy}&key_sort=${obj.key}`,{signal})
    if(response.status == 200){
      return response.data;
    }
  } catch (error) {
    throw new Error(`${error.response.status} ${error.response.statusText}`);
  }
})

