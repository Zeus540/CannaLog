import { createSlice } from "@reduxjs/toolkit";
import axios from '../../lib/axios';
import {  BASE_URL_PROD } from '../../lib/Constants'
import {fetchMyPlants,addPlants,takeAction} from './myPlantsThunk'


let initialState = {
  loading:false,
  hasIntialData:false,
  hasMore:false,
  total_count:"",
  next_cursor:"",
  plants:[],
  error:'',
}


export const myPlantsSlice = createSlice({
    name:"myPlants",
    initialState,
    reducers:{
      deletePlantLocally:(state,payload)=>{
        state.plants = state.plants.filter((d)=> d.plant_id !== payload.payload)
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMyPlants.pending, (state) => {
          // state.plants = [];
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMyPlants.fulfilled, (state, action) => {
          state.loading = false;
          state.plants = [...state.plants,...action.payload.data];
          state.hasMore = action.payload.has_more
          state.total_count = action.payload.total_count
          state.next_cursor = action.payload.next_cursor
          state.hasIntialData = state.plants.length > 0 ? true : false
        })
        .addCase(fetchMyPlants.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addPlants.pending, (state) => {
          state.error = null;
        })
        .addCase(addPlants.fulfilled, (state, action) => {
          state.plants.unshift(action.payload[0]);
        })
        .addCase(addPlants.rejected, (state, action) => {
          state.error = action.error.message;
        })
        .addCase(takeAction.pending, (state) => {
          state.error = null;
        })
        .addCase(takeAction.fulfilled, (state, action) => {
          
        })
        .addCase(takeAction.rejected, (state, action) => {

          state.error = action.error.message;
        });

    },
})

// export const {getPublicJournal} = myPlantsSlice.actions

export const {deletePlantLocally} = myPlantsSlice.actions
export const selectMyPlants = (state) => state.myPlants;
