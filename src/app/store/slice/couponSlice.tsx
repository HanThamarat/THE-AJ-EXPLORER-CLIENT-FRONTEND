import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AxiosInstance, createAxiosWithToken } from "@/app/hooks/axiosInstance";
import { couponsResponseType } from "@/types/coupon";

export const getCouponList = createAsyncThunk("coupon/getCouponList", async (accessToken?: string) => {
    try {
        if (accessToken) {
            const axios = await createAxiosWithToken(accessToken);
            
            const response = await axios.get('/client/voucher_service/coupon_list');

            return { status: true, data: response.data.body };
        } else {
            const response = await AxiosInstance.get('/client/voucher_service/coupon_list');

            return { status: true, data: response.data.body };
        }
    } catch (error: any) {
        return { status: false, error: error?.response.data.error };
    }
});

interface couponType {
    coupon_list: couponsResponseType | null;
    loading: boolean;
    error: unknown;
}

const initialState: couponType = {
    coupon_list: null,
    loading: false,
    error: null,
};

const couponSlice = createSlice({
  name: "coupon",
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
          if (action.type.includes("getCouponList")) {
            state.coupon_list = action.payload.data as couponsResponseType;
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

export default couponSlice.reducer;
export const couponSelector = (state: RootState) => state.coupon;