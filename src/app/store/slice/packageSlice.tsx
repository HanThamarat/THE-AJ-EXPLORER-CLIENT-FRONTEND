import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AxiosInstance } from "@/app/hooks/axiosInstance";
import { findProvinceByPackageEntity } from "@/app/types/package";

export const getprovincePackages = createAsyncThunk('/package/getprovincePackages', async () => {
  try {
    const response = await AxiosInstance.get("/client/package/province_package");

    return { status: true, data: response.data.body };
  } catch (error: any) {
    return { status: false, error: error?.response.data.error };
  }
});


interface packageType {
  provinceShotPack: findProvinceByPackageEntity[] | [] | null;
  loading: boolean;
  error: unknown;
}

const initialState: packageType = {
  provinceShotPack: null,
  loading: false,
  error: null,
};

const packageSlice = createSlice({
  name: "package",
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
          if (action.type.includes("getprovincePackages")) {
            state.provinceShotPack = action.payload.data as findProvinceByPackageEntity[];
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

export default packageSlice.reducer;
export const packageSelector = (state: RootState) => state.package;
