import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";
import { BASE_URL_PROD } from "../../lib/Constants";
import {deletePlantLocally} from './myPlantsSlice'


export const fetchMyPlants = createAsyncThunk('myPlants/fetch',(key)=>{

  let limit = 14;

  if (window.innerWidth <= 768) {
    limit = 6; 
  }
  
  let sortBy = "DESC"
  return axios.get(`${BASE_URL_PROD}/plants/my_plants/?limit=${limit}&sort=${sortBy}&key_sort=${key}`)
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


export const deleteAction = createAsyncThunk('myPlants/deleteAction',(values)=>{

  return axios.delete(`${BASE_URL_PROD}/plants/${values.plant_id}/delete_action/${values.plant_action_id}`,values)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    throw new Error('Failed to delete plant action');
  });
})