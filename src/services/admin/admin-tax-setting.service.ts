import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ITaxClass } from "@/types/admin-tax.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   createTaxClass: {
      isLoading: false,
   },
   getTaxClasses: {
      isLoading: true,
      data: [] as ITaxClass[],
   },
   createRateTax: {
      isLoading: false,
   },
   deleteRateTax: {
      isLoading: false,
   },
   updateRateTax: {
      isLoading: false,
   },
   saveTaxConfig: {
      isLoading: false,
   },
   getTaxConfig: {
      isLoading: true,
      data: [],
   },
};

type BuilderType = ActionReducerMapBuilder<typeof initialState>;
class AdminTaxSettingService extends HttpInterceptor {
   createTaxClass = {
      api: createAsyncThunk("createTaxClass", async (body, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/tax/create-class", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.createTaxClass.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createTaxClass.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createTaxClass.isLoading = false;
         });
      },
   };

   getTaxClasses = {
      api: createAsyncThunk("!getTaxClasses", async (_, thunkAPI) => {
         try {
            const { data } = await this.admin.get("/admin/tax");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getTaxClasses.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getTaxClasses.isLoading = false;
            state.getTaxClasses.data = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getTaxClasses.isLoading = false;
            state.getTaxClasses.data = [];
         });
      },
   };
   //
   createRateTax = {
      api: createAsyncThunk("createRateTax", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/tax/create-rate", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.createRateTax.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.createRateTax.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createRateTax.isLoading = false;
         });
      },
   };

   deleteRateTax = {
      api: createAsyncThunk("deleteRateTax", async (taxId: string, thunkAPI) => {
         try {
            const { data } = await this.admin.delete(`/admin/tax/delete-rate/${taxId}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.deleteRateTax.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.deleteRateTax.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.deleteRateTax.isLoading = false;
         });
      },
   };

   updateRateTax = {
      api: createAsyncThunk("updateRateTax", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.patch("/admin/tax/update-rate", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateRateTax.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.updateRateTax.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateRateTax.isLoading = false;
         });
      },
   };

   saveTaxConfig = {
      api: createAsyncThunk("saveTaxConfig", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/settings", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.saveTaxConfig.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.saveTaxConfig.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.saveTaxConfig.isLoading = false;
         });
      },
   };

   getTaxConfig = {
      api: createAsyncThunk("!getTaxConfig", async (_, thunkAPI) => {
         try {
            const { data } = await this.admin.get("/admin/settings");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getTaxConfig.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getTaxConfig.isLoading = false;
            state.getTaxConfig.data = action.payload.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getTaxConfig.isLoading = false;
            state.getTaxConfig.data = [];
         });
      },
   };

   private slice = createSlice({
      name: "AdminTaxSettingService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.createTaxClass.reducer(builder);
         this.getTaxClasses.reducer(builder);
         this.createRateTax.reducer(builder);
         this.deleteRateTax.reducer(builder);
         this.updateRateTax.reducer(builder);
         this.saveTaxConfig.reducer(builder);
         this.getTaxConfig.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const adminTaxSettingService = new AdminTaxSettingService();
export const adminTaxSettingActions = adminTaxSettingService.actions;
export const adminTaxSettingReducer = adminTaxSettingService.reducer;
