import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createAxiosWithToken } from "@/app/hooks/axiosInstance";
import { omiseChargeEntity } from "@/app/types/payment";

interface generateQrCodePaymentProps {
    bookid: string;
    accessToken: string;
}

export const generateQrCodePayment = createAsyncThunk("payment/generateQrCodePayment", async (data: generateQrCodePaymentProps) => {
    try {
        const axios = await createAxiosWithToken(data.accessToken);
        
        const response = await axios.post("/financial/pay/promptpay", {
            bookingId: data.bookid
        });

        return { status: true, data: response.data.body };
    } catch (error: any) {
        return { status: false, error: error?.response.data.error };
    }
});

interface packageType {
    qrcode: omiseChargeEntity | null;
    loading: boolean;
    error: unknown;
}

const initialState: packageType = {
    qrcode: null,
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
  name: "payment",
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
          if (action.type.includes("generateQrCodePayment")) {
                state.qrcode = action.payload.data as omiseChargeEntity;
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

export default paymentSlice.reducer;
export const paymentSelector = (state: RootState) => state.payment;