import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { IPagination } from "@/types/pagination.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   getAdminOrders: {
      isLoading: true,
      data: [] as any[],
      pagination: null as null | IPagination,
   },
   getAdminSingleOrders: {
      isLoading: true,
      data: null as null | any,
   },
   updateAdminOrderStatus: {
      isLoading: false,
   },
};

type BuilderType = ActionReducerMapBuilder<typeof initialState>;
class AdminOrderService extends HttpInterceptor {
   getAdminOrders = {
      api: createAsyncThunk("!getAdminOrders", async (query: string | undefined = "", thunkAPI) => {
         try {
            const queryString = query ? "?" + query : "";
            const { data } = await this.admin.get(`/admin/orders/all-orders${queryString}`);
            return data.data.orders;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getAdminOrders.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getAdminOrders.isLoading = false;
            state.getAdminOrders.data = action.payload;
            state.getAdminOrders.pagination = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getAdminOrders.isLoading = false;
            state.getAdminOrders.data = [];
            state.getAdminOrders.pagination = null;
         });
      },
   };

   getAdminSingleOrders = {
      api: createAsyncThunk("!getAdminSingleOrders", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.admin.get(`/customer/orders/by-id/${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getAdminSingleOrders.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getAdminSingleOrders.isLoading = false;
            state.getAdminSingleOrders.data = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getAdminSingleOrders.isLoading = false;
            state.getAdminSingleOrders.data = null;
         });
      },
   };

   updateAdminOrderStatus = {
      api: createAsyncThunk("updateAdminOrderStatus", async (body: string, thunkAPI) => {
         try {
            const { data } = await this.admin.patch(`/admin/orders/update-order-status`, body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateAdminOrderStatus.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateAdminOrderStatus.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateAdminOrderStatus.isLoading = false;
         });
      },
   };
   private slice = createSlice({
      name: "AdminOrderService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getAdminOrders.reducer(builder);
         this.getAdminSingleOrders.reducer(builder);
         this.updateAdminOrderStatus.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const adminOrderService = new AdminOrderService();
export const adminOrderActions = adminOrderService.actions;
export const adminOrderReducer = adminOrderService.reducer;
