import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ISalesStatisticsData, ITotalSalesData, ITotalSalesResponse } from "@/types/admin-dashboard.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchDailySaleStatistics: {
    isLoading: true,
    data: [] as ISalesStatisticsData[],
  },
  fetchWeeklySaleStatistics: {
    isLoading: true,
    data: [] as ISalesStatisticsData[],
  },
  fetchMonthlySaleStatistics: {
    isLoading: true,
    data: [] as ISalesStatisticsData[],
  },
  fetchTotalSalesData: {
    isLoading: true,
    data: null as ITotalSalesData | null,
  }
};


type ReducersServiceType = ActionReducerMapBuilder<typeof initialState>;

class AdminDashboardService extends HttpInterceptor {
  fetchDailySaleStatistics = {
    api: createAsyncThunk("!fetchDailySaleStatistics", async (_, thunkAPI) => {
      try {
        const { data } = await this.admin.get("/admin/dashboard/daily-sales");
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(this.errorMessage(error));
      }
    }),
    reducers(builder: ReducersServiceType) {
      builder.addCase(this.api.pending, (state) => {
        state.fetchDailySaleStatistics.isLoading = true;
      });
      builder.addCase(this.api.fulfilled, (state, action) => {
        state.fetchDailySaleStatistics.isLoading = false;
        state.fetchDailySaleStatistics.data = action.payload.data || [];
      });
      builder.addCase(this.api.rejected, (state) => {
        state.fetchDailySaleStatistics.isLoading = false;
        state.fetchDailySaleStatistics.data = [];
      });
    },
  };
  fetchWeeklySaleStatistics = {
    api: createAsyncThunk("!fetchWeeklySaleStatistics", async (_, thunkAPI) => {
      try {
        const { data } = await this.admin.get("/admin/dashboard/weekly-sales");
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(this.errorMessage(error));
      }
    }),
    reducers(builder: ReducersServiceType) {
      builder.addCase(this.api.pending, (state) => {
        state.fetchWeeklySaleStatistics.isLoading = true;
      });
      builder.addCase(this.api.fulfilled, (state, action) => {
        state.fetchWeeklySaleStatistics.isLoading = false;
        state.fetchWeeklySaleStatistics.data = action.payload.data || [];
      });
      builder.addCase(this.api.rejected, (state) => {
        state.fetchWeeklySaleStatistics.isLoading = false;
        state.fetchWeeklySaleStatistics.data = [];
      });
    },
  };
  fetchMonthlySaleStatistics = {
    api: createAsyncThunk("!fetchMonthlySaleStatistics", async (_, thunkAPI) => {
      try {
        const { data } = await this.admin.get("/admin/dashboard/monthly-sales");
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(this.errorMessage(error));
      }
    }),
    reducers(builder: ReducersServiceType) {
      builder.addCase(this.api.pending, (state) => {
        state.fetchMonthlySaleStatistics.isLoading = true;
      });
      builder.addCase(this.api.fulfilled, (state, action) => {
        state.fetchMonthlySaleStatistics.isLoading = false;
        state.fetchMonthlySaleStatistics.data = action.payload.data || [];
      });
      builder.addCase(this.api.rejected, (state) => {
        state.fetchMonthlySaleStatistics.isLoading = false;
        state.fetchMonthlySaleStatistics.data = [];
      });
    },
  };
  fetchTotalSales = {
    api: createAsyncThunk("!fetchTotalSales", async (_, thunkAPI) => {
      try {
        const { data } = await this.admin.get("/admin/dashboard/total-sales");
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(this.errorMessage(error));
      }
    }),
    reducers(builder: ReducersServiceType) {
      builder.addCase(this.api.pending, (state) => {
        state.fetchTotalSalesData.isLoading = true;
      });
      builder.addCase(this.api.fulfilled, (state, action) => {
        state.fetchTotalSalesData.isLoading = false;
        state.fetchTotalSalesData.data = action.payload.data || [];
      });
      builder.addCase(this.api.rejected, (state) => {
        state.fetchTotalSalesData.isLoading = false;
        state.fetchTotalSalesData.data = null;
      });
    },
  };

  private slice = createSlice({
    name: "adminDashboardService",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      this.fetchDailySaleStatistics.reducers(builder);
      this.fetchWeeklySaleStatistics.reducers(builder);
      this.fetchMonthlySaleStatistics.reducers(builder);
      this.fetchTotalSales.reducers(builder);
    },
  });

  actions = this.slice.actions;
  reducer = this.slice.reducer;
}

export const adminDashboardService = new AdminDashboardService();
export const adminDashboardActions = adminDashboardService.actions;
export const adminDashboardReducer = adminDashboardService.reducer;