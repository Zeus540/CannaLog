import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const fetchEnvironments = createAsyncThunk('environments/fetch', (obj) => {
let limit = obj.limit;
let signal = obj.signal
if (window.innerWidth <= 768) {
  limit = obj.limit_mobile;
}
let sortBy = "DESC"
return axios.get(`${BASE_URL_PROD}/environments/?limit=${limit}&sort=${sortBy}&key_sort=${obj.key}`, { signal })
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw new Error('Failed to fetch environments');
  });
})