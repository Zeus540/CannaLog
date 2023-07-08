import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const editEnvironment = createAsyncThunk('environments/edit',(data)=>{
      return axios.patch(`${BASE_URL_PROD}/environments/edit/${data.environment_id}`,data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to edit environments');
      });
})