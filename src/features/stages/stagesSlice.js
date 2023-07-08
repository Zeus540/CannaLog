import { createSlice } from "@reduxjs/toolkit";
import { fetchStages } from "./stagesThunk";

let initialState = {
    loading:true,
    stages:[],
    error:'',
}


export const stagesSlice = createSlice({
    name:'stages',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchStages.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchStages.fulfilled, (state, action) => {
            state.loading = false;
            state.stages = action.payload;
          })
          .addCase(fetchStages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

    }
})

export const selectStages = (state) => state.stages.stages;
export const selectStagesIsLoading = (state) => state.stages.loading;