import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { bookingEntity, ClientBookingCreateBody } from "@/app/types/booking";
import { createAxiosWithToken } from "@/app/hooks/axiosInstance";

interface createNewBookingProps {
    data: ClientBookingCreateBody;
    accessToken: string;
}

export const createNewBooking = createAsyncThunk("booking/createNewBooking", async (data: createNewBookingProps) => {
    try {
        const axios = await createAxiosWithToken(data.accessToken);

        const response = await axios.post("/client/booking_service/booking", data.data);

        return { status: true, data: response.data.body };
    } catch (error: any) {
        return { status: false, error: error?.response.data.error };
    }
});

interface bookingType {
    booking_created: bookingEntity | null;
    loading: boolean;
    error: unknown;
}

const initialState: bookingType = {
    booking_created: null,
    loading: false,
    error: null,
};

const bookingSlice = createSlice({
  name: "booking",
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
          if (action.type.includes("createNewBooking")) {
            state.booking_created = action.payload.data as bookingEntity;
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

export default bookingSlice.reducer;
export const bookingtSelector = (state: RootState) => state.booking;