import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ISetting } from "@/types/setting.type";
import { IShippingZone } from "@/types/shipping-zone.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   getShippingApiSetting: {
      isLoading: true,
      data: [] as ISetting[],
   },
   saveShippingApiSetting: {
      isLoading: false,
   },
   createShippingZone: {
      isLoading: false,
   },
   getShippingZones: {
      isLoading: true,
      data: [] as IShippingZone[],
   },
   deleteShippingZone: {
      isLoading: false,
   },
   updateShippingZone: {
      isLoading: false,
   },
   createMethoodName: {
      isLoading: false,
   },
   getMethoodNames: {
      isLoading: true,
      data: [] as any[],
   },
   createMethoodZone: {
      isLoading: false,
   },
   deleteMethoodZones: {
      isLoading: false,
   },
   updateMethoodZones: {
      isLoading: false,
   },
   updateMethoodName: {
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

   createShippingZone = {
      api: createAsyncThunk("createShippingZone", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/shipping-zone", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.createShippingZone.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createShippingZone.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createShippingZone.isLoading = false;
         });
      },
   };

   getShippingZones = {
      api: createAsyncThunk("!getShippingZones", async (_, thunkAPI) => {
         try {
            const [zoneData, countriesData, methodData] = await Promise.all([
               this.admin.get("/admin/shipping-zone"), //
               this.axios.get(`/country-info`),
               this.admin.get("/admin/shipping-zone/method"),
            ]);

            const getStates = async (countryCode: string, stateCode: string) => {
               const { data } = await this.axios.get(`/country-info/${countryCode}`);
               return data.find((ele: any) => stateCode === ele?.isoCode);
            };

            const transformData = async (zone: IShippingZone[], countries: any[]) => {
               for (const element of zone) {
                  const country = countries?.find((country) => country?.isoCode === element?.country);
                  element.countryName = country.name;
                  for (const province of element?.shippingZoneProvince) {
                     const stateCode = province?.province?.split("-")?.[1];
                     let state = await getStates(country?.isoCode, stateCode);
                     province.stateName = state?.name;
                  }
                  for (const province of element?.shippingZoneMethod) {
                     methodData?.data.forEach((item: any) => {
                        if (item.id === province.methodId) {
                           province.name = item.name;
                        }
                     });
                  }
               }
               return zone;
            };
            const data = await transformData(zoneData?.data, countriesData?.data);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getShippingZones.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getShippingZones.isLoading = false;
            state.getShippingZones.data = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getShippingZones.isLoading = false;
         });
      },
   };

   deleteShippingZone = {
      api: createAsyncThunk("deleteShippingZone", async (zoneID: string, thunkAPI) => {
         try {
            const { data } = await this.admin.delete(`/admin/shipping-zone/by-id/${zoneID}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.deleteShippingZone.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.deleteShippingZone.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.deleteShippingZone.isLoading = false;
         });
      },
   };

   updateShippingZone = {
      api: createAsyncThunk("updateShippingZone", async (zoneData: any, thunkAPI) => {
         try {
            const { data } = await this.admin.patch("/admin/shipping-zone", zoneData);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateShippingZone.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.updateShippingZone.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateShippingZone.isLoading = false;
         });
      },
   };

   createMethoodName = {
      api: createAsyncThunk("createMethoodName", async (name: string, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/shipping-zone/method", { name });
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.createMethoodName.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createMethoodName.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createMethoodName.isLoading = false;
         });
      },
   };

   getMethoodNames = {
      api: createAsyncThunk("!getMethoodNames", async (_, thunkAPI) => {
         try {
            const { data } = await this.admin.get("/admin/shipping-zone/method");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getMethoodNames.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            console.log(action.payload);

            state.getMethoodNames.isLoading = false;
            state.getMethoodNames.data = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getMethoodNames.isLoading = false;
            state.getMethoodNames.data = [];
         });
      },
   };

   createMethoodZone = {
      api: createAsyncThunk("createMethoodZone", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/shipping-zone/method/zone", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.createMethoodZone.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.createMethoodZone.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createMethoodZone.isLoading = false;
         });
      },
   };

   deleteMethoodZones = {
      api: createAsyncThunk("deleteMethoodZones", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.admin.delete(`/admin/shipping-zone/method/zone/${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.deleteMethoodZones.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.deleteMethoodZones.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.deleteMethoodZones.isLoading = false;
         });
      },
   };
   updateMethoodZones = {
      api: createAsyncThunk("updateMethoodZones", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.patch(`/admin/shipping-zone/method/zone`, body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateMethoodZones.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateMethoodZones.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateMethoodZones.isLoading = false;
         });
      },
   };

   updateMethoodName = {
      api: createAsyncThunk("updateMethoodName", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.patch(`/admin/shipping-zone/method`, body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(error);
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateMethoodName.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateMethoodName.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateMethoodName.isLoading = false;
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
         this.createShippingZone.reducer(builder);
         this.getShippingZones.reducer(builder);
         this.deleteShippingZone.reducer(builder);
         this.updateShippingZone.reducer(builder);
         this.createMethoodName.reducer(builder);
         this.getMethoodNames.reducer(builder);
         this.updateMethoodName.reducer(builder);
         this.createMethoodZone.reducer(builder);
         this.deleteMethoodZones.reducer(builder);
         this.updateMethoodZones.reducer(builder);
      },
   });

   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const adminShippingSettingService = new AdminShippingSettingService();
export const adminShippingSettingActions = adminShippingSettingService.actions;
export const adminShippingSettingReducer = adminShippingSettingService.reducer;
