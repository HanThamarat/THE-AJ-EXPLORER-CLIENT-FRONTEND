import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AxiosInstance } from "@/app/hooks/axiosInstance";
import { authDTOType, customerEntity } from "@/app/types/auth";

export const createAccount = createAsyncThunk("auth/createAccount", async(data: authDTOType) => {
    try {
        const response = await AxiosInstance.post('/auth/create-customer', data);

        return { status: true, data: response.data.body };
    } catch (error: any) {
        return { status: false, error: error?.response.data.error };
    }
});


interface authType {
  userInfo: customerEntity | null;
  loading: boolean;
  error: unknown;
}

const initialState: authType = {
  userInfo: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action: PayloadAction<{ data?: any }>) => {
          state.loading = false;
          if (action.type.includes("createAccount")) {
                state.userInfo = action.payload.data as customerEntity;
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
