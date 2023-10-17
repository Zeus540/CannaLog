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

export const readNotification = createAsyncThunk('notifications/post',(id)=>{
  return axios.post(`${BASE_URL_PROD}/user/notifications/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to read notifications');
      });
})

export const readNotifications = createAsyncThunk('notifications/post',(ids)=>{
  return axios.patch(`${BASE_URL_PROD}/user/notifications/read_all`,{ids})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error('Failed to read notifications');
      });
})