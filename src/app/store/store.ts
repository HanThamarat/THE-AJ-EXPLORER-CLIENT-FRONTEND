import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import pkgReducer from './slice/packageSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        package: pkgReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();