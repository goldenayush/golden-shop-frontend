import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { IProduct } from "@/types/product.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   createProduct: {
      isLoading: false,
   },
   getProducts: {
      isLoading: true,
      data: [] as IProduct[],
      pagination: null as any,
   },
   deleteProduct: {
      isLoading: false,
   },
   updateProduct: {
      isLoading: false,
   },
   singleProduct: {
      isLoading: true,
      data: null as null | IProduct,
   },
   updateStatusProduct: {
      isLoading: false,
   },
};

type ReducerType = ActionReducerMapBuilder<typeof initialState>;
class AdminProductService extends HttpInterceptor {
   createProduct = {
      api: createAsyncThunk("createProduct", async (paylaod, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/products", paylaod);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducerType) {
         builder.addCase(this.api.pending, (state) => {
            state.createProduct.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createProduct.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createProduct.isLoading = false;
         });
      },
   };

   getProducts = {
      api: createAsyncThunk("!getProducts", async (query: string = "", thunkAPI) => {
         try {
            const queryStr = query ? "?" + query : "";
            const { data } = await this.admin.get(`/products${queryStr}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducerType) {
         builder.addCase(this.api.pending, (state) => {
            state.getProducts.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getProducts.isLoading = false;
            state.getProducts.data = action.payload?.data?.products;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getProducts.isLoading = false;
            state.getProducts.data = [];
         });
      },
   };

   deleteProduct = {
      api: createAsyncThunk("deleteProduct", async (ids: string[], thunkAPI) => {
         try {
            const { data } = await this.admin.delete("/admin/products/multiple", {
               data: { ids },
            });
            thunkAPI.dispatch(this.getProducts.api(""));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducerType) {
         builder.addCase(this.api.pending, (state) => {
            state.deleteProduct.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.deleteProduct.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.deleteProduct.isLoading = false;
         });
      },
   };

   updateProduct = {
      api: createAsyncThunk("updateProduct", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.patch("/admin/products", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducerType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateProduct.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateProduct.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateProduct.isLoading = false;
         });
      },
   };

   singleProduct = {
      api: createAsyncThunk("!singleProduct", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.admin.get(`/products/${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducerType) {
         builder.addCase(this.api.pending, (state) => {
            state.singleProduct.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.singleProduct.isLoading = false;
            state.singleProduct.data = action.payload?.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.singleProduct.isLoading = false;
            state.singleProduct.data = null;
         });
      },
   };

   updateStatusProduct = {
      api: createAsyncThunk("updateStatusProduct", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.patch("/admin/products/update-status", body);
            thunkAPI.dispatch(this.getProducts.api(""));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducerType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateStatusProduct.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateStatusProduct.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateStatusProduct.isLoading = false;
         });
      },
   };
   private slice = createSlice({
      name: "AdminProductService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.createProduct.reducer(builder);
         this.getProducts.reducer(builder);
         this.deleteProduct.reducer(builder);
         this.updateProduct.reducer(builder);
         this.singleProduct.reducer(builder);
         this.updateStatusProduct.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const adminProductService = new AdminProductService();
export const adminProductActions = adminProductService.actions;
export const adminProductReducer = adminProductService.reducer;
