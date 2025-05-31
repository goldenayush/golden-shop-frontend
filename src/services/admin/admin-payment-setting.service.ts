import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ISetting } from "@/types/setting.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   getPaymentSettings: {
      isLaoding: true,
      data: [] as ISetting[],
   },
   addPaymentSettings: {
      isLaoding: false,
   },
};

type BuilderType = ActionReducerMapBuilder<typeof initialState>;
class AdminPaymentSettingService extends HttpInterceptor {
   getPaymentSettings = {
      api: createAsyncThunk("!getPaymentSettings", async (_, thunkAPI) => {
         try {
            const { data } = await this.admin.get("/admin/settings");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getPaymentSettings.isLaoding = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getPaymentSettings.isLaoding = false;
            state.getPaymentSettings.data = action.payload.data || [];
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getPaymentSettings.isLaoding = false;
         });
      },
   };

   addPaymentSettings = {
      api: createAsyncThunk("addPaymentSettings", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/settings", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.addPaymentSettings.isLaoding = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.addPaymentSettings.isLaoding = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.addPaymentSettings.isLaoding = false;
         });
      },
   };
   private slice = createSlice({
      name: "AdminPaymentSettingService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getPaymentSettings.reducer(builder);
         this.addPaymentSettings.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const adminPaymentSettingService = new AdminPaymentSettingService();
export const adminPaymentSettingActions = adminPaymentSettingService.actions;
export const adminPaymentSettingReducer = adminPaymentSettingService.reducer;
