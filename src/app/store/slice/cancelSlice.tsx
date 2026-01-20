import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createAxiosWithToken } from "@/app/hooks/axiosInstance";
import { bankEntityType, cancelBookingDTOType, cancelBookingResponseType } from "@/types/cancel";

export interface createNewCancelProps {
  dataDTO: cancelBookingDTOType;
  accessToken: string;
}

export const createNewCancel = createAsyncThunk("cancel/createNewCancel", async (data: createNewCancelProps) => {
  try {
      const axios = await createAxiosWithToken(data.accessToken);

      const response = await axios.post("/client/booking_service/create_cancel_booking", data.dataDTO);

      return { status: true, data: response.data.body };
  } catch (error: any) {
    return { status: false, error: error?.response.data.error };
  }
});

export const getBankOption = createAsyncThunk("cancel/getBankOption", async (accessToken: string) => {
  try {
    const axios = await createAxiosWithToken(accessToken);

    const response = await axios.get("/client/bank_service/bank_list");

    return { status: true, data: response.data.body };
  } catch (error: any) {
    return { status: false, error: error?.response.data.error };
  }
});

interface cancelType {
    cancel: cancelBookingResponseType | null;
    bankOption: bankEntityType[] | null;
    loading: boolean;
    error: unknown;
}

const initialState: cancelType = {
    bankOption: null,
    cancel: null,
    loading: false,
    error: null,
};

const cancelSlice = createSlice({
  name: "cancel",
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
          if (action.type.includes("createNewCancel")) {
            state.cancel = action.payload.data as cancelBookingResponseType;
          } else if (action.type.includes("getBankOption")) {
            state.bankOption = action.payload.data as bankEntityType[];
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

export default cancelSlice.reducer;
export const cancelSelector = (state: RootState) => state.cancel;