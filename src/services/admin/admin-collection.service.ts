import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ICollection } from "@/types/collection.type";
import { IPagination } from "@/types/pagination.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   getCollection: {
      isLoading: true,
      data: [] as ICollection[],
      pagination: null as null | IPagination,
   },
   createCollection: {
      isLoading: false,
   },
   delateCollections: {
      isLoading: false,
   },
   getSingleCollection: {
      isLoading: true,
      data: null as null | ICollection,
   },
   updateCollection: {
      isLoading: false,
   },
};

type ReducersServiceType = ActionReducerMapBuilder<typeof initialState>;
class AdminCollectionService extends HttpInterceptor {
   getCollection = {
      api: createAsyncThunk("!getCollection", async (query: string, thunkAPI) => {
         try {
            const queryString = query ? "?" + query : "";
            const { data } = await this.admin.get(`/admin/collection${queryString}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.getCollection.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            const { collections, ...rest } = action.payload?.data;
            state.getCollection.isLoading = false;
            state.getCollection.data = collections;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getCollection.isLoading = false;
         });
      },
   };

   createCollection = {
      api: createAsyncThunk("createCollection", async (body, thunkAPI) => {
         try {
            const { data } = await this.admin.post(`/admin/collection`, body);
            thunkAPI.dispatch(this.getCollection.api(""));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.createCollection.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createCollection.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createCollection.isLoading = false;
         });
      },
   };

   delateCollections = {
      api: createAsyncThunk("delateCollections", async (ids: string[], thunkAPI) => {
         try {
            const { data } = await this.admin.delete("/admin/collection/multiple", {
               data: { ids },
            });
            thunkAPI.dispatch(this.getCollection.api(""));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.delateCollections.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.delateCollections.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.delateCollections.isLoading = false;
         });
      },
   };

   getSingleCollection = {
      api: createAsyncThunk("!getSingleCollection", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.admin.get(`/admin/collection/by-id/${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.getSingleCollection.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            console.log(action.payload?.data);
            state.getSingleCollection.isLoading = false;
            state.getSingleCollection.data = action.payload?.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getSingleCollection.isLoading = false;
         });
      },
   };
   updateCollection = {
      api: createAsyncThunk("updateCollection", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.patch(`/admin/collection`, body);
            thunkAPI.dispatch(this.getCollection.api(""));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateCollection.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            console.log(action.payload?.data);
            state.updateCollection.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateCollection.isLoading = false;
         });
      },
   };
   private slice = createSlice({
      name: "AdminCollectionService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getCollection.reducer(builder);
         this.createCollection.reducer(builder);
         this.delateCollections.reducer(builder);
         this.getSingleCollection.reducer(builder);
         this.updateCollection.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const adminCollectionService = new AdminCollectionService();
export const adminCollectionActions = adminCollectionService.actions;
export const adminCollectionReducer = adminCollectionService.reducer;
