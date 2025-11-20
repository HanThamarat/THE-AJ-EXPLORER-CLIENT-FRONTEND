import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AxiosInstance } from "@/app/hooks/axiosInstance";
import { findProvinceByPackageEntity, packageClientResponse } from "@/app/types/package";

export const getprovincePackages = createAsyncThunk('package/getprovincePackages', async () => {
  try {
    const response = await AxiosInstance.get("/client/package/province_package");

    return { status: true, data: response.data.body };
  } catch (error: any) {
    return { status: false, error: error?.response.data.error };
  }
});

interface PackageBySearchProps {
  provinceId: number | null;
  packageName:  string | null;
  page: number;
  limit: number;
}

export const getPackagesBySearch = createAsyncThunk("package/getPackagesBySearch", async (data: PackageBySearchProps) => {
  try {
    const response = await AxiosInstance.get(`/client/package/packages?page=${data.page}&limit=${data.limit}&provinceId=${data.provinceId}&packageName=${data.packageName}`);

    return { status: true, data: response.data.body };
  } catch (error: any) {
    return { status: false, error: error?.response.data.error };
  }
});


interface packageType {
  provinceShotPack: findProvinceByPackageEntity[] | [] | null;
  packagesBySearch: packageClientResponse | null; 
  loading: boolean;
  error: unknown;
}

const initialState: packageType = {
  provinceShotPack: null,
  packagesBySearch: null,
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
          } else if (action.type.includes('getPackagesBySearch')) {
            const newItem = action.payload.data as packageClientResponse;
   
            if (state.packagesBySearch === null) {
              state.packagesBySearch = newItem;
            }

            if (state.packagesBySearch !== null) {
              state.packagesBySearch.items = [...state.packagesBySearch.items, ...newItem.items];
              state.packagesBySearch.nextPage = newItem.nextPage;
              state.packagesBySearch.prevPage = newItem.prevPage;
              state.packagesBySearch.page = newItem.page;
            }
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
