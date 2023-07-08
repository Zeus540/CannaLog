import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const fetchIrrigationTypes = createAsyncThunk('irrigationTypes/fetch',()=>{
      return axios.get(`${BASE_URL_PROD}/irrigation_types`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to fetch Irrigation Types');
      });
})