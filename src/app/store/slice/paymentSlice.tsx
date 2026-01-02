import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createAxiosWithToken } from "@/app/hooks/axiosInstance";
import { BookingByCardDTOType, createMobileBankChargeType, omiseChargeEntity } from "@/types/payment";
import { bookingEntity } from "@/types/booking";

interface generateQrCodePaymentProps {
    bookid: string;
    accessToken: string;
}

export const generateQrCodePayment = createAsyncThunk("payment/generateQrCodePayment", async (data: generateQrCodePaymentProps) => {
    try {
        const axios = await createAxiosWithToken(data.accessToken);
        
        const response = await axios.post("/client/payment_service/promptpay", {
            bookingId: data.bookid
        });

        return { status: true, data: response.data.body };
    } catch (error: any) {
        return { status: false, error: error?.response.data.error };
    }
});

interface createBookByCardProps {
    data: BookingByCardDTOType;
    accessToken: string;
}

export const createBookByCard = createAsyncThunk("payment/createBookByCard", async (data: createBookByCardProps) => {
  try {
    const axios = await createAxiosWithToken(data.accessToken);

    const response = await axios.post("/client/payment_service/createbook_card", data.data);

    return { status: true, data: response.data.body };
  } catch (error: any) {
    return { status: false, error: error?.response.data.error };
  }
});

interface createChargeWithMobileBankingProps {
    data: createMobileBankChargeType;
    accessToken: string;
}

export const createChargeWithMobileBanking = createAsyncThunk("payment/createChargeWithMobileBanking", async (data: createChargeWithMobileBankingProps) => {
  try {
    const axios = await createAxiosWithToken(data.accessToken);

    const response = await axios.post("/client/payment_service/moblie_banking", data.data);

    return { status: true, data: response.data.body };
  } catch (error: any) {
    return { status: false, error: error?.response.data.error };
  }
});

interface packageType {
    qrcode: omiseChargeEntity | null;
    bookByCard: bookingEntity | null;
    mobile_banking: omiseChargeEntity | null;
    loading: boolean;
    error: unknown;
}

const initialState: packageType = {
    qrcode: null,
    bookByCard: null,
    mobile_banking: null,
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
          } else if (action.type.includes("createBookByCard")) {
            state.bookByCard = action.payload.data as bookingEntity;
          } else if (action.type.includes("createChargeWithMobileBanking")) {
            state.mobile_banking = action.payload.data as omiseChargeEntity;
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