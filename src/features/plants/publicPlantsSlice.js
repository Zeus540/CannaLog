import { createSlice } from "@reduxjs/toolkit";
import axios from '../../lib/axios';
import {  BASE_URL_PROD } from '../../lib/Constants'
import {fetchPublicPlants,fetchPublicPlantsSingedIn} from './publicPlantsThunk'

let initialState = {
  loading:false,
  hasIntialData:false,
  hasMore:false,
  total_count:"",
  next_cursor:"",
  plants:[],
  error:'',
}

export const publicPlantsSlice = createSlice({
    name:"publicPlants",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPublicPlants.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPublicPlants.fulfilled, (state, action) => {
          state.loading = false;
          state.plants = [...state.plants,...action.payload.data];
          state.hasMore = action.payload.has_more
          state.total_count = action.payload.total_count
          state.next_cursor = action.payload.next_cursor
          state.hasIntialData = state.plants.length > 0 ? true : false
        })
        .addCase(fetchPublicPlants.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(fetchPublicPlantsSingedIn.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPublicPlantsSingedIn.fulfilled, (state, action) => {
          state.loading = false;
          state.plants = [...state.plants,...action.payload.data];
          state.hasMore = action.payload.has_more
          state.total_count = action.payload.total_count
          state.next_cursor = action.payload.next_cursor
          state.hasIntialData = state.plants.length > 0 ? true : false
        })
        .addCase(fetchPublicPlantsSingedIn.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
})

export const {getPublicJournal} = publicPlantsSlice.actions

export const selectPublicJournal = (state) => state.publicPlants;

