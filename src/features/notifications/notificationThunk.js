import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";


export const fetchNotifications = createAsyncThunk('notifications/fetch',()=>{
  return axios.get(`${BASE_URL_PROD}/user/notifications`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to fetch notifications');
      });
})