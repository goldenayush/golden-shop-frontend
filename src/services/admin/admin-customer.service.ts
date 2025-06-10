import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ICustomer } from "@/types/admin-cou.type";
import { IPagination } from "@/types/pagination.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   getCustomers: {
      isLoading: true,
      data: [] as ICustomer[],
      pagination: null as null | IPagination,
   },
   updateCustomerStatus: {
      isLoading: false,
   },
   getSingleCustomer: {
      isLoading: true,
      data: null as null | ICustomer,
   },
};
type BuilderType = ActionReducerMapBuilder<typeof initialState>;
class AdminCustomerService extends HttpInterceptor {
   getCustomers = {
      api: createAsyncThunk("!getCustomers", async (query: string | undefined = "", thunkAPI) => {
         try {
            const queryStr = query ? "?" + query : "";
            const { data } = await this.admin.get(`/admin/customer/all${queryStr}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getCustomers.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getCustomers.isLoading = false;
            state.getCustomers.data = action.payload?.data?.items || [];
            state.getCustomers.pagination = action.payload?.data?.pagination || null;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getCustomers.isLoading = false;
            state.getCustomers.data = [];
            state.getCustomers.pagination = null;
         });
      },
   };

   //TODO: Api N/A
   updateCustomerStatus = {
      api: createAsyncThunk("updateCustomerStatus", async (body: { ids: string[]; status: boolean }, thunkAPI) => {
         try {
            const { data } = await this.admin.put("/admin/customer/update-multiple-status", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateCustomerStatus.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateCustomerStatus.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateCustomerStatus.isLoading = false;
         });
      },
   };

   getSingleCustomer = {
      api: createAsyncThunk("!getSingleCustomer", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.admin.get(`/admin/customer/by-id/${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getSingleCustomer.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getSingleCustomer.isLoading = false;
            state.getSingleCustomer.data = action.payload?.data || null;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getSingleCustomer.isLoading = false;
            state.getSingleCustomer.data = null;
         });
      },
   };

   private slice = createSlice({
      name: "AdminCustomerService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getCustomers.reducer(builder);
         this.updateCustomerStatus.reducer(builder);
         this.getSingleCustomer.reducer(builder);
      },
   });
   actions = this.slice.actions;
   reducer = this.slice.reducer;
}

export const adminCustomerService = new AdminCustomerService();
export const adminCustomerActions = adminCustomerService.actions;
export const adminCustomerReducer = adminCustomerService.reducer;
