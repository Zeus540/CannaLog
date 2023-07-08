import { createSlice } from "@reduxjs/toolkit";
import { useCookies } from 'react-cookie';
import { getCookieValue } from '../../helpers/getCookieValue';

let initialState = {
    user: getCookieValue("user") !== null ? getCookieValue("user") : null,
    isLoggedIn: getCookieValue("user") !== null ? true : false,
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        auth:(state,action) => {
            state.user = action.payload.user
            state.isLoggedIn = action.payload.isLoggedIn
        },
    }
})

export const {auth} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;