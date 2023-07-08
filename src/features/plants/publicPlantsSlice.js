import { createSlice } from "@reduxjs/toolkit";
import axios from '../../lib/axios';
import {  BASE_URL_PROD } from '../../lib/Constants'
import {fetchPublicPlants} from './publicPlantsThunk'

let initialState = {
    loading:true,
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
          state.plants = action.payload;
        })
        .addCase(fetchPublicPlants.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
})

export const {getPublicJournal} = publicPlantsSlice.actions

export const selectPublicJournal = (state) => state.publicPlants;

