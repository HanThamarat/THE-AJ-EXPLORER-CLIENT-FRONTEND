import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import pkgReducer from './slice/packageSlice';

export const store = configureStore({
    reducer: {

        package: pkgReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();