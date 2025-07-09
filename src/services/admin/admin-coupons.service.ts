import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { CouponResponse } from "@/types/coupons.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  createCoupon: {
    isLoading: false,
  },
  getAllCoupons: {
    isLoading: false,
    data: [] as CouponResponse["items"],
    pagination: null as CouponResponse["pagination"] | null,
  },
  getCouponById: {
    isLoading: false,
    data: null as CouponResponse["items"][number] | null,
  },
  updateCoupon: {
    isLoading: false,
    data: null,
  },
  deleteCoupon: {
    isLoading: false,
    data: null,
  },
}
type ReducersServiceType = ActionReducerMapBuilder<typeof initialState>;

class AdminCouponsService extends HttpInterceptor {
  createCoupon = {
    api: createAsyncThunk("createCoupon", async (payload, thunkAPI) => {
      try {
        const { data } = await this.admin.post("/admin/coupons", payload);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(this.errorMessage(error));
      }
    }),
    reducers(builder: ReducersServiceType) {
      builder.addCase(this.api.pending, (state) => {
        state.createCoupon.isLoading = true;
      });
      builder.addCase(this.api.fulfilled, (state) => {
        state.createCoupon.isLoading = false;
      });
      builder.addCase(this.api.rejected, (state) => {
        state.createCoupon.isLoading = false;
      });
    },
  };

  getAllCoupons = {
    api: createAsyncThunk("!getAllCoupons", async (query: string | undefined, thunkAPI) => {
      try {
        const queryString = query ? "?" + query : "";
        const { data } = await this.admin.get(`/admin/coupons/all${queryString}`);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(this.errorMessage(error));
      }
    }),
    reducers(builder: ReducersServiceType) {
      builder.addCase(this.api.pending, (state) => {
        state.getAllCoupons.isLoading = true;
      });
      builder.addCase(this.api.fulfilled, (state, action) => {
        const { items, pagination } = action.payload?.data;
        state.getAllCoupons.isLoading = false;
        state.getAllCoupons.data = items;
        state.getAllCoupons.pagination = pagination;
      });
      builder.addCase(this.api.rejected, (state) => {
        state.getAllCoupons.isLoading = false;
        state.getAllCoupons.data = [];
      });
    },
  };
  private slice = createSlice({
    name: "AdminCouponsService",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      this.createCoupon.reducers(builder);
      this.getAllCoupons.reducers(builder);
    },
  });
  public reducer = this.slice.reducer;
  public actions = this.slice.actions;
}
export const adminCouponsService = new AdminCouponsService();
export const adminCouponsActions = adminCouponsService.actions;
export const adminCouponsReducer = adminCouponsService.reducer;

