import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications } from "./notificationThunk";

let initialState = {
    loading:true,
    notifications:[],
    error:'',
}


export const notificationSlice = createSlice({
    name:'notifications',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchNotifications.fulfilled, (state, action) => {
            state.loading = false;
            state.notifications = action.payload;
          })
          .addCase(fetchNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })

    }
})

export const selectNotifications = (state) => state.notifications.notifications;
export const selectNotificationsIsLoading = (state) => state.notifications.loading;