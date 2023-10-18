import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";

export const fetchPublicPlants = createAsyncThunk('publicPlants/fetch',(signal)=>{
      axios.get(`${BASE_URL_PROD}/plants/public`,{signal})
      .then((response) => {
        console.log("response",response)
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to fetch public plants');
      });
})

export const fetchPublicPlantsSingedIn = createAsyncThunk('publicPlantsSingedIn/fetch',async(signal)=>{
  try {
    let response = await axios.get(`${BASE_URL_PROD}/plants/public_signed_in`,{signal})
    if(response.status == 200){
      return response.data;
    }
    // else{
    //   throw new Error('Failed to fetch public plants');
    // }
  } catch (error) {
    throw new Error(`${error.response.status} ${error.response.statusText}`);
  }
})

