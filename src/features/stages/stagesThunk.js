import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const fetchStages = createAsyncThunk('stages/fetch',()=>{
      return axios.get(`${BASE_URL_PROD}/plants/stages`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to fetch stages');
      });
})