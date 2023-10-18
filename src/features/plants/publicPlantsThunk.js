import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const fetchPublicPlants = createAsyncThunk('publicPlants/fetch',(signal)=>{
      return axios.get(`${BASE_URL_PROD}/plants/public`,{signal})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to fetch public plants');
      });
})

export const fetchPublicPlantsSingedIn = createAsyncThunk('publicPlants/fetch',(signal)=>{
  return axios.get(`${BASE_URL_PROD}/plants/public_signed_in`,{signal})
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw new Error('Failed to fetch public plants');
  });
})

