import { createSlice } from "@reduxjs/toolkit";
import {fetchEnvironmentTypes} from './environmentTypesThunk'


let initialState = {
    loading:true,
    environmentTypes:[],
    error:'',
}

export const environmentTypesSlice = createSlice({
    name:"environmentTypes",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchEnvironmentTypes.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchEnvironmentTypes.fulfilled, (state, action) => {
          state.loading = false;
          state.environmentTypes = action.payload;
        })
        .addCase(fetchEnvironmentTypes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
    },
})


export const selectEnvironmentsTypes = (state) => state.environmentTypes.environmentTypes;
export const selectEnvironmentsIsLoading = (state) => state.environments.loading;
