import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { IPagination } from "@/types/pagination.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   getOrders: {
      isLoading: true,
      data: [] as any[],
      pagination: null as null | IPagination,
   },
   getAdminSingleOrders: {
      isLoading: true,
      data: null as null | any,
   },
   updateAdminMultipleStatus: {
      isLoading: false,
   },
   cancelAdminOrder: {
      isLoading: true,
      data: null as null | any,
   }
};

type BuilderType = ActionReducerMapBuilder<typeof initialState>;
class AdminOrderService extends HttpInterceptor {
   getOrders = {
      api: createAsyncThunk("!getOrders", async (query: string | undefined = "", thunkAPI) => {
         try {
            const queryString = query ? "?" + query : "";
            const { data } = await this.admin.get(`/admin/orders/all-orders${queryString}`);
            return data.data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getOrders.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getOrders.isLoading = false;
            state.getOrders.data = action.payload.orders;
            state.getOrders.pagination = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getOrders.isLoading = false;
            state.getOrders.data = [];
            state.getOrders.pagination = null;
         });
      },
   };

   getAdminSingleOrders = {
      api: createAsyncThunk("!getAdminSingleOrders", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.admin.get(`/customer/orders/by-id/${id}`);
            return data.data;
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
      api: createAsyncThunk("!updateAdminOrderStatus", async (body: string, thunkAPI) => {
         try {
            const { data } = await this.admin.patch(`/admin/orders/update-order-status`, body);
            thunkAPI.dispatch(this.getOrders.api(""));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateAdminMultipleStatus.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateAdminMultipleStatus.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateAdminMultipleStatus.isLoading = false;
         });
      },
   };
   cancelAdminOrder = {
      api: createAsyncThunk("cancelAdminOrder", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.admin.put(`/customer/orders/cancel-order/${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.cancelAdminOrder.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.cancelAdminOrder.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.cancelAdminOrder.isLoading = false;
         });
      },
   };
   private slice = createSlice({
      name: "AdminOrderService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getOrders.reducer(builder);
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

