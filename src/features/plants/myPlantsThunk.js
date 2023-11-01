import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";
import {deletePlantLocally} from './myPlantsSlice'


export const fetchMyPlants = createAsyncThunk('myPlants/fetch',(obj)=>{

  let limit = obj.limit;
  let signal = obj.signal
  if (window.innerWidth <= 768) {
    limit = obj.limit_mobile; 
  }
  let sortBy = "DESC"

  return axios.get(`${BASE_URL_PROD}/plants/my_plants/?limit=${limit}&sort=${sortBy}&key_sort=${obj.key}`,signal)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw new Error('Failed to fetch plants');
  });
})

export const addPlants = createAsyncThunk('myPlants/add',(values)=>{
  return axios.post(`${BASE_URL_PROD}/plants/add`,values)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw new Error('Failed to add plant');
  });
})


export const deletePlant = createAsyncThunk('myPlants/delete',async (values, { dispatch }) => {
  try {
    await axios.delete(`${BASE_URL_PROD}/plants/delete/${values}`);
    dispatch(deletePlantLocally(values));
  } catch (error) {
    throw new Error('Failed to delete plant');
  }
}
);


export const takeAction = createAsyncThunk('myPlants/takeAction',(values)=>{
  return axios.post(`${BASE_URL_PROD}/plants/take_action/${values.plant_action_type_id}`,values)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw new Error('Failed to take plant action');
  });
})

export const editAction = createAsyncThunk('myPlants/editAction',(values)=>{

  return axios.patch(`${BASE_URL_PROD}/plants/${values.plant_id}/edit_action/13`,values)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw new Error('Failed to edit plant action');
  });
})

export const deleteAction = createAsyncThunk('myPlants/deleteAction',(values)=>{
console.log("values",values)
  return axios.post(`${BASE_URL_PROD}/plants/${values.plant_id}/delete_action/${values.plant_action_type_id}`,values)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw new Error('Failed to delete plant action');
  });
})