import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ISetting } from "@/types/setting.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   getStoreSetting: {
      isLoading: true,
      data: [] as ISetting[],
   },
   saveStoreData: {
      isLoading: false,
   },
};

type BuilderType = ActionReducerMapBuilder<typeof initialState>;
class AdminStoreSettingService extends HttpInterceptor {
   getStoreSetting = {
      api: createAsyncThunk("!getStoreSetting", async (_, thunkAPI) => {
         try {
            const { data } = await this.admin.get("/admin/settings");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getStoreSetting.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getStoreSetting.isLoading = false;
            state.getStoreSetting.data = action.payload.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getStoreSetting.isLoading = false;
            state.getStoreSetting.data = [];
         });
      },
   };

   saveStoreSetting = {
      api: createAsyncThunk("saveStoreData", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/settings", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.saveStoreData.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.saveStoreData.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.saveStoreData.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "AdminStoreSettingService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getStoreSetting.reducer(builder);
         this.saveStoreSetting.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const adminStoreSettingService = new AdminStoreSettingService();
export const adminStoreSettingActions = adminStoreSettingService.actions;
export const adminStoreSettingReducer = adminStoreSettingService.reducer;
