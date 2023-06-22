import { createSlice } from "@reduxjs/toolkit";

let user
let isLoggedIn
if(window.localStorage.getItem('user')){
     user = JSON.parse(window.localStorage.getItem('user'))
     isLoggedIn = true
}else{
    isLoggedIn = false
    user = null
}


const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn,
        user
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
});

export const {login , logout} = userSlice.actions

export default userSlice.reducer;