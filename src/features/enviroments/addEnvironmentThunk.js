import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const addEnvironment = createAsyncThunk('environments/add',(data)=>{
      return axios.post(`${BASE_URL_PROD}/environments/add`,data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to add environments');
      });
})