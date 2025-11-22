import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    userDoc: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData,
            state.userDoc = action.payload.userDoc;
        },
        updateUserDoc: (state, action) => {
            state.userDoc = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer