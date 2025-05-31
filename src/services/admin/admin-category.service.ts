import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ICategory } from "@/types/category.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   createCategory: {
      isLoading: false,
   },
   fetchCategories: {
      isLoading: true,
      data: [] as ICategory[],
      pagination: null as any,
   },
   updateCategory: {
      isLoading: false,
   },
   deleteMultipleCategory: {
      isLoading: false,
   },
   singleCategory: {
      isLoading: true,
      data: null as null | ICategory,
   },
};
type ReducersServiceType = ActionReducerMapBuilder<typeof initialState>;

class AdminCategoryService extends HttpInterceptor {
   getCategoriesTree = {
      api: createAsyncThunk("!getCategoriesTree", async (_, thunkAPI) => {
         try {
            const { data } = await this.admin.get("/category");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
   };
   createCategory = {
      api: createAsyncThunk("createCategory", async (category, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/category", category);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.createCategory.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createCategory.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createCategory.isLoading = false;
         });
      },
   };

   fetchCategories = {
      api: createAsyncThunk("!fetchCategories", async (query: string | undefined, thunkAPI) => {
         try {
            const queryStr = query ? "?" + query : "";
            const { data } = await this.admin.get(`/category/get-categories${queryStr}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.fetchCategories.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            const { categories, ...rest } = action.payload?.data;
            state.fetchCategories.isLoading = false;
            state.fetchCategories.data = categories || [];
            state.fetchCategories.pagination = rest;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.fetchCategories.isLoading = false;
            state.fetchCategories.data = [];
         });
      },
   };

   deleteMultipleCategory = {
      api: createAsyncThunk("deleteMultipleCategory", async (ids: string[], thunkAPI) => {
         try {
            const { data } = await this.admin.delete(`/admin/category/multiple`, {
               data: { ids },
            });
            thunkAPI.dispatch(this.fetchCategories.api(""));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.deleteMultipleCategory.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.deleteMultipleCategory.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.deleteMultipleCategory.isLoading = false;
         });
      },
   };

   updateCategory = {
      api: createAsyncThunk("updateCategory", async (category, thunkAPI) => {
         try {
            const { data } = await this.admin.patch("/admin/category", category);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateCategory.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateCategory.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateCategory.isLoading = false;
         });
      },
   };

   singleCategory = {
      api: createAsyncThunk("!singleCategory", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.admin.get(`/category/by-id/${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.singleCategory.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.singleCategory.isLoading = false;
            state.singleCategory.data = action.payload.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.singleCategory.isLoading = false;
            state.singleCategory.data = null;
         });
      },
   };

   private silce = createSlice({
      name: "adminCategoryService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.createCategory.reducers(builder);
         this.fetchCategories.reducers(builder);
         this.deleteMultipleCategory.reducers(builder);
         this.updateCategory.reducers(builder);
         this.singleCategory.reducers(builder);
      },
   });
   actions = this.silce.actions;
   reducer = this.silce.reducer;
}

export const adminCategoryService = new AdminCategoryService();
export const adminCategoryActions = adminCategoryService.actions;
export const adminCategoryReducer = adminCategoryService.reducer;
