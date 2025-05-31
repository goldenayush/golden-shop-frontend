import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ISetting } from "@/types/setting.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   getShippingApiSetting: {
      isLoading: true,
      data: [] as ISetting[],
   },
   saveShippingApiSetting: {
      isLoading: false,
   },
};
type BuilderType = ActionReducerMapBuilder<typeof initialState>;
class AdminShippingSettingService extends HttpInterceptor {
   getShippingApiSetting = {
      api: createAsyncThunk("!getShippingApiSetting", async (_, thunkAPI) => {
         try {
            const { data } = await this.admin.get("/admin/settings");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getShippingApiSetting.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getShippingApiSetting.isLoading = false;
            state.getShippingApiSetting.data = action.payload?.data || [];
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getShippingApiSetting.isLoading = false;
            state.getShippingApiSetting.data = [];
         });
      },
   };

   saveShippingApiSetting = {
      api: createAsyncThunk("saveShippingApiSetting", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/settings", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.saveShippingApiSetting.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.saveShippingApiSetting.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.saveShippingApiSetting.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "AdminShippingSettingService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getShippingApiSetting.reducer(builder);
         this.saveShippingApiSetting.reducer(builder);
      },
   });

   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const adminShippingSettingService = new AdminShippingSettingService();
export const adminShippingSettingActions = adminShippingSettingService.actions;
export const adminShippingSettingReducer = adminShippingSettingService.reducer;
