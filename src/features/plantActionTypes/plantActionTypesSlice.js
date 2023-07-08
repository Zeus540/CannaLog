import { createSlice } from "@reduxjs/toolkit";
import { fetchPlantActionTypes } from "./plantActionTypesThunk";


const initialState = {
    loading:true,
    action_types:[],
    error:''
}

export const plantActionTypesSlice = createSlice({
    name:'plantActions',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPlantActionTypes.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPlantActionTypes.fulfilled,(state,action)=>{
            state.loading = false;
            state.action_types = action.payload
            state.error = null;
        })
        .addCase(fetchPlantActionTypes.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error;
        })
    }

})


export const selectPlantActionTypes = (state) =>  state.plantActionTypes.action_types