'use client'

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

let user: any;
let isLoggedIn: boolean;
if (Cookies.get('user')) {
        const storedUser = Cookies.get('user');
        user = storedUser ? JSON.parse(storedUser) : null;
        isLoggedIn = true;
} else {
    isLoggedIn = false;
    user = null;
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

export const { login, logout } = userSlice.actions

export default userSlice.reducer;


/*
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
}

interface UserState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: UserState = {
  isLoggedIn: isLoggedIn(),
  user: JSON.parse(localStorage.getItem('user') as string) ? JSON.parse(localStorage.getItem('user') as string) : null,
};

export function isLoggedIn() {
  if (typeof window!== 'undefined') {
    return localStorage.getItem('user')!== null;
  }
  return false;
}

export function login(user: User) {
  localStorage.setItem('user', JSON.stringify(user));
  return { type: 'login', payload: user };
}

export function logout() {
  localStorage.removeItem('user');
  return { type: 'logout' };
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login: loginAction, logout: logoutAction } = userSlice.actions;

export default userSlice.reducer;*/