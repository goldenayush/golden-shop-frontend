import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ICmsPage } from "@/types/admin-cms.type";
import { IPagination } from "@/types/pagination.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   createCmsPage: {
      isLoading: false,
   },
   getCmsPages: {
      isLoading: true,
      data: [] as ICmsPage[],
      pagination: null as null | IPagination,
   },
   getSingleCmsPage: {
      isLoading: true,
      data: null as null | ICmsPage,
   },
   deleteCmsPage: {
      isLoading: false,
   },
   updateCmsPageStatus: {
      isLoading: false,
   },
   updateCmsPage: {
      isLoading: false,
   },
};
type BuilderType = ActionReducerMapBuilder<typeof initialState>;
class AdminCmsService extends HttpInterceptor {
   getCmsPages = {
      api: createAsyncThunk("!getCmsPages", async (query: string | undefined = "", thunkAPI) => {
         try {
            const queryStr = query ? "?" + query : "";
            const { data } = await this.admin.get(`/admin/cms-page${queryStr}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getCmsPages.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            const { pages, ...pagination } = action.payload?.data;
            console.log(pages);
            state.getCmsPages.isLoading = false;
            state.getCmsPages.data = pages || [];
            state.getCmsPages.pagination = pagination as IPagination;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getCmsPages.isLoading = false;
            state.getCmsPages.data = [];
            state.getCmsPages.pagination = null;
         });
      },
   };

   createCmsPage = {
      api: createAsyncThunk("createCmsPage", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/cms-page", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.createCmsPage.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createCmsPage.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createCmsPage.isLoading = false;
         });
      },
   };

   deleteCmsPage = {
      api: createAsyncThunk("deleteCmsPage", async (ids: string[], thunkAPI) => {
         try {
            const { data } = await this.admin.delete("/admin/cms-page/delete-multiple", {
               data: { ids },
            });
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.deleteCmsPage.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.deleteCmsPage.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.deleteCmsPage.isLoading = false;
         });
      },
   };

   updateCmsPageStatus = {
      api: createAsyncThunk("updateCmsPageStatus", async (body: { ids: string[]; status: boolean }, thunkAPI) => {
         try {
            const { data } = await this.admin.put("/admin/cms-page/update-multiple-status", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateCmsPageStatus.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateCmsPageStatus.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateCmsPageStatus.isLoading = false;
         });
      },
   };

   getSingleCmsPage = {
      api: createAsyncThunk("!getSingleCmsPage", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.admin.get(`/admin/cms-page/${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getSingleCmsPage.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getSingleCmsPage.isLoading = false;
            state.getSingleCmsPage.data = action.payload.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getSingleCmsPage.isLoading = false;
            state.getSingleCmsPage.data = null;
         });
      },
   };

   updateCmsPage = {
      api: createAsyncThunk("updateCmsPage", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.patch("/admin/cms-page", body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateCmsPage.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.updateCmsPage.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateCmsPage.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "AdminCmsService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.createCmsPage.reducer(builder);
         this.getCmsPages.reducer(builder);
         this.deleteCmsPage.reducer(builder);
         this.updateCmsPageStatus.reducer(builder);
         this.getSingleCmsPage.reducer(builder);
         this.updateCmsPage.reducer(builder);
      },
   });

   actions = this.slice.actions;
   reducer = this.slice.reducer;
}

export const adminCmsService = new AdminCmsService();
export const adminCmsActions = adminCmsService.actions;
export const adminCmsReducer = adminCmsService.reducer;
