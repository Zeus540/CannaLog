import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const fetchEnvironments = createAsyncThunk('environments/fetch',(key)=>{
  console.log("key",key)
  let limit = 10;

  if (window.innerWidth <= 768) {
    limit = 6; 
  }
  
  let sortBy = "DESC"
      return axios.get(`${BASE_URL_PROD}/environments/?limit=${limit}&sort=${sortBy}&key_sort=${key}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to fetch environments');
      });
})