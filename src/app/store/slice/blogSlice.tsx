import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AxiosInstance } from "@/app/hooks/axiosInstance";
import { blogListEntityType, blogListResponseType } from "@/types/blog";


export const getBlogList = createAsyncThunk("blog/getBlogList", async () => {
    try {
        const response = await AxiosInstance(`/client/blog/blog_list`);

        return { status: true, data: response.data.body };
    } catch (error: any) {
        return { status: false, error: error?.response.data.error };
    }
});

export const getBlogDetail = createAsyncThunk("blog/getBlogDetail", async (blogId: number) => {
  try {
    const response = await AxiosInstance.get(`/client/blog/blog_detail/${blogId}`);

    return { status: true, data: response.data.body };
  } catch (error: any) {
    return { status: false, error: error?.response.data.error };
  }
});


interface blogType {
    blogList: blogListResponseType | null;
    blogDetail: blogListEntityType | null;
    loading: boolean;
    error: unknown;
}

const initialState: blogType = {
    blogList: null,
    blogDetail: null,
    loading: false,
    error: null,
};

const blogSlice = createSlice({
  name: "blog",
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
          if (action.type.includes("getBlogList")) {
            state.blogList = action.payload.data as blogListResponseType;
          } else if (action.type.includes("getBlogDetail")) {
            state.blogDetail = action.payload?.data as blogListEntityType;
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

export default blogSlice.reducer;
export const blogSelector = (state: RootState) => state.blog;