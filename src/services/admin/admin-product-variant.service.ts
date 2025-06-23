import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayPipeline } from "@/shared/functions";
import AdminFileUpload from "@/libs/admin-file-uploader/admin-file-uploader";
import { adminProductActions } from "./admin-product.service";

const initialState = {
   createVariantGroup: {
      isLoading: false,
   },
   getProductVariants: {
      isLoading: true,
      data: [],
   },
   getVariantGroups: {
      isLoading: true,
      data: null as {
         id: string;
         attributeGroupId: string;
         visibility: boolean;
         attributeOne?: string;
         attributeTwo?: any;
         attributeThree?: any;
         attributeFour?: any;
         attributeFive?: any;
      } | null,
   },
   createProductVariant: {
      isLoading: false,
   },
};

type ReducerType = ActionReducerMapBuilder<typeof initialState>;
class AdminProductVariantService extends HttpInterceptor {
   createVariantGroup = {
      api: createAsyncThunk("createVariantGroup", async (body, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/products/create-variant-group", body);
            thunkAPI.dispatch(adminProductActions.setID(data.id));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducerType) {
         builder.addCase(this.api.pending, (state) => {
            state.createVariantGroup.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createVariantGroup.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createVariantGroup.isLoading = false;
         });
      },
   };

   getVariantGroups = {
      api: createAsyncThunk("!getVariantGroups", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.axios.get(`/admin/products/variant-group-by-id/${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducerType) {
         builder.addCase(this.api.pending, (state) => {
            state.getVariantGroups.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            console.log(action.payload.data);

            state.getVariantGroups.isLoading = false;
            state.getVariantGroups.data = action.payload.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getVariantGroups.isLoading = false;
            state.getVariantGroups.data = null;
         });
      },
   };

   getProductVariants = {
      api: createAsyncThunk("!getProductVariants", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.axios.get(`/products/variant?variantId=${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducerType) {
         builder.addCase(this.api.pending, (state) => {
            state.getProductVariants.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getProductVariants.isLoading = false;
            state.getProductVariants.data = action.payload.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getProductVariants.isLoading = false;
            state.getProductVariants.data = [];
         });
      },
   };

   createProductVariant = {
      api: createAsyncThunk("createProductVariant", async (body: any, thunkAPI) => {
         try {
            const images = body?.productImages;
            const res = await new AdminFileUpload().productImageUploader(images);
            if (res) {
               body.productImages = res;
            }
            const { data } = await this.admin.post("/admin/products/create-variant", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducerType) {
         builder.addCase(this.api.pending, (state) => {
            state.createProductVariant.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createProductVariant.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createProductVariant.isLoading = false;
         });
      },
   };
   private slice = createSlice({
      name: "AdminProductVariantService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.createVariantGroup.reducer(builder);
         this.getProductVariants.reducer(builder);
         this.getVariantGroups.reducer(builder);
         this.createProductVariant.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const adminProductVariantService = new AdminProductVariantService();
export const adminProductVariantActions = adminProductVariantService.actions;
export const adminProductVariantReducer = adminProductVariantService.reducer;
