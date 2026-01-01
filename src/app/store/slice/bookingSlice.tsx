import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {  bookingEntity, bookingInfoType, ClientBookingCreateBody, mytripEntityType } from "@/app/types/booking";
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

interface findMyTripProps {
    page: string;
    accessToken: string;
}

export const findMyTrip = createAsyncThunk("booking/findMyTrip", async (data: findMyTripProps) => {
  try {
    const axios = await createAxiosWithToken(data.accessToken);

    const response = await axios.get(`/client/booking_service/my_trip?page=${data.page}`);

    return { status: true, data: response.data.body };
  } catch (error: any) {
    return { status: false, error: error?.response.data.error };
  }
});

interface getBookingDetailProps {
  bookingId: string;
  accessToken: string;
}

export const getBookingDetail = createAsyncThunk("booking/getBookingDetail", async (data: getBookingDetailProps) => {
  try {
    const axios = await createAxiosWithToken(data.accessToken);

    const response = await axios.get(`/client/booking_service/booking_detail/${data.bookingId}`);

    return { status: true, data: response.data.body };
  } catch (error: any) {
    return { status: false, error: error?.response.data.error };
  }
});

interface bookingType {
    my_trip: mytripEntityType[] | [] | null;
    booking_created: bookingEntity | null;
    booking_detail: bookingInfoType | null;
    loading: boolean;
    error: unknown;
}

const initialState: bookingType = {
    my_trip: null,
    booking_detail: null,
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
          } else if (action.type.includes("findMyTrip")) {
            state.my_trip = action.payload.data as mytripEntityType[];
          } else if (action.type.includes("getBookingDetail")) {
            state.booking_detail = action.payload.data as bookingInfoType;
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