import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { arrayPipeline } from "@/shared/functions";
import { ISetting } from "@/types/setting.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminFileUploadService } from "./admin-file-upload.service";

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
   private uplaodStoreLogo = async (settings: ISetting[]) => {
      try {
         const [logoSettings, remainingSettings] = arrayPipeline({
            input: settings,
            filter: (item) => item.name === "storeLogo",
         });
         if (typeof logoSettings[0].value !== "object") return null;
         const res = await adminFileUploadService.uploadFile(logoSettings.map((x) => x.value));
         let resMap = logoSettings.map((item, idx) => ({
            ...item,
            value: res?.data?.[idx],
         }));
         return [...resMap, ...remainingSettings];
      } catch (error) {
         return error;
      }
   };

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
            const res = await this.uplaodStoreLogo(body.settings);
            if (res) {
               body.settings = res;
            }
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
