import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const fetchPlantActionTypes = createAsyncThunk('actions_types/fetch',()=>{
    return axios.get(`${BASE_URL_PROD}/plants/actions_types`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error('Failed to fetch plant actions types');
    });
})

