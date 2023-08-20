import { createSlice } from "@reduxjs/toolkit";
import {fetchEnvironments} from './environmentsThunk'
import { deleteEnvironment } from "./deleteEnvironmentThunk";
import { addEnvironment } from "./addEnvironmentThunk";
import { editEnvironment } from "./editEnvironmentThunk";

let initialState = {
    loading:true,
    hasMore:true,
    environments:[],
    error:'',
}

export const environmentsSlice = createSlice({
    name:"environments",
    initialState,
    reducers:{
      addEnvironmentLocally:(state,payload)=>{
        state.environments.push(payload.payload)
      },
      deleteEnvironmentLocally:(state,payload)=>{
        state.environments = state.environments.filter((d)=> d.environment_id !== payload.payload)
      },
      editEnvironmentLocally:(state,payload)=>{

        let indexToBeReplaced = state.environments.findIndex((d)=> d.environment_id == payload.payload.environment_id)
    
        state.environments[indexToBeReplaced] = payload.payload

      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchEnvironments.pending, (state) => {
          state.loading = false;
          state.error = null;
        })
        .addCase(fetchEnvironments.fulfilled, (state, action) => {
          state.loading = false;
          state.environments = [...state.environments,...action.payload.data];
          state.hasMore = action.payload.total > state.environments.length
        })
        .addCase(fetchEnvironments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteEnvironment.pending, (state) => {
          state.error = null;
        })
        .addCase(deleteEnvironment.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(deleteEnvironment.rejected, (state, action) => {
          state.error = action.error.message;
        })
        .addCase(addEnvironment.pending, (state) => {
          // state.loading = true;
          state.error = null;
        })
        .addCase(addEnvironment.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(addEnvironment.rejected, (state, action) => {
          state.error = action.error.message;
        })
        .addCase(editEnvironment.pending, (state) => {
          // state.loading = true;
          state.error = null;
        })
        .addCase(editEnvironment.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(editEnvironment.rejected, (state, action) => {
          state.error = action.error.message;
        });
        
        
    },
})

export const {deleteEnvironmentLocally,addEnvironmentLocally,editEnvironmentLocally} =  environmentsSlice.actions;

export const selectEnvironments = (state) => state.environments.environments;
export const selectEnvironmentsIsLoading = (state) => state.environments.loading;
export const selectEnvironmentsHasMore = (state) => state.environments.hasMore;

