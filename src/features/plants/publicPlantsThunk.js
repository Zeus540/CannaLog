import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";

export const fetchPublicPlants = createAsyncThunk('publicPlants/fetch',async(key)=>{
  let limit = 14;

  if (window.innerWidth <= 768) {
    limit = 6; 
  }

  let sortBy = "DESC"
  try {
    let response = await axios.get(`${BASE_URL_PROD}/plants/public/?limit=${limit}&sort=${sortBy}&key_sort=${key}`)
    if(response.status == 200){
      return response.data;
    }
  } catch (error) {
    throw new Error(`${error.response.status} ${error.response.statusText}`);
  }

})

export const fetchPublicPlantsSingedIn = createAsyncThunk('publicPlantsSingedIn/fetch',async(key)=>{
  let limit = 14;

  if (window.innerWidth <= 768) {
    limit = 6; 
  }
  
  let sortBy = "DESC"
  try {
    let response = await axios.get(`${BASE_URL_PROD}/plants/public_signed_in/?limit=${limit}&sort=${sortBy}&key_sort=${key}`)
    if(response.status == 200){
      return response.data;
    }
  } catch (error) {
    throw new Error(`${error.response.status} ${error.response.statusText}`);
  }
})

