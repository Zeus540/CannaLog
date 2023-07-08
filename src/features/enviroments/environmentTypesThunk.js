import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const fetchEnvironmentTypes = createAsyncThunk('environmentTypes/fetch',()=>{
      return axios.get(`${BASE_URL_PROD}/environments/types`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to fetch environments types');
      });
})