import { createSlice } from "@reduxjs/toolkit";
import { fetchStrains } from "./strainThunk";

let initialState = {
    loading:true,
    strains:[],
    error:'',
}


export const strainSlice = createSlice({
    name:'strains',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchStrains.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchStrains.fulfilled, (state, action) => {
            state.loading = false;
            state.strains = action.payload;
          })
          .addCase(fetchStrains.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

    }
})

export const selectStrains = (state) => state.strains.strains;
export const selectStrainsIsLoading = (state) => state.strains.loading;