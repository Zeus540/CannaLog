import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const fetchPublicPlants = createAsyncThunk('publicPlants/fetch',()=>{
      return axios.get(`${BASE_URL_PROD}/plants/public`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to fetch public plants');
      });
})

