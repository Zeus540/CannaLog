import { createSlice } from "@reduxjs/toolkit";
import { fetchIrrigationTypes } from "./irrigationTypesThunk";

let initialState = {
    loading:true,
    irrigationTypes:[],
    error:'',
}


export const irrigationTypesSlice = createSlice({
    name:'irrigationTypes',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchIrrigationTypes.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchIrrigationTypes.fulfilled, (state, action) => {
            state.loading = false;
            state.irrigationTypes = action.payload;
          })
          .addCase(fetchIrrigationTypes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

    }
})

export const selectIrrigationTypes = (state) => state.irrigationTypes.irrigationTypes;
export const selectIrrigationTypesIsLoading = (state) => state.irrigationTypes.loading;