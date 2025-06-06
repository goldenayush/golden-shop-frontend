import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { IAttributeGroup, IAttribute } from "@/types/attribute.types";
import { IPagination } from "@/types/pagination.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   createGroup: {
      isLoading: false,
   },
   getGroups: {
      isLoading: true,
      data: [] as IAttributeGroup[],
   },
   createAttribute: {
      isLoading: false,
   },
   getAllAttribute: {
      isLoading: true,
      data: [] as IAttribute[],
      pagination: null as null | IPagination,
   },
   getSingleAttribute: {
      isLoading: true,
      data: null as null | IAttribute,
   },
   updateAttribute: {
      isLoading: false,
   },
   renameGroup: {
      isLoading: false,
   },
   delateAttributes: {
      isLoading: false,
   },
};

type ReducersServiceType = ActionReducerMapBuilder<typeof initialState>;
class AdminAttributeService extends HttpInterceptor {
   createGroup = {
      api: createAsyncThunk("createGroup", async (payload: any, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/attributes/group", payload);
            thunkAPI.dispatch(this.getGroups.api());
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.createGroup.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createGroup.isLoading = false;
            state.createGroup.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createGroup.isLoading = false;
         });
      },
   };

   getGroups = {
      api: createAsyncThunk("!getGroups", async (_, thunkAPI) => {
         try {
            const { data } = await this.admin.get("/admin/attributes/group");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.getGroups.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getGroups.isLoading = false;
            state.getGroups.data = action.payload?.data || [];
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getGroups.isLoading = false;
            state.getGroups.data = [];
         });
      },
   };

   createAttribute = {
      api: createAsyncThunk("createAttribute", async (payload, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/attributes", payload);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.createAttribute.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.createAttribute.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.createAttribute.isLoading = false;
         });
      },
   };

   getSingleAttribute = {
      api: createAsyncThunk("!getSingleAttribute", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.admin.get(`/admin/attributes/by-id/${id}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.getSingleAttribute.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getSingleAttribute.isLoading = false;
            state.getSingleAttribute.data = action.payload?.data;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getSingleAttribute.isLoading = false;
            state.getSingleAttribute.data = null;
         });
      },
   };
   getAllAttribute = {
      api: createAsyncThunk("!getAllAttribute", async (query: string, thunkAPI) => {
         try {
            const queryString = query ? "?" + query : "";
            const { data } = await this.admin.get(`/admin/attributes/all${queryString}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.getAllAttribute.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            const { attributes, ...rest } = action.payload?.data;
            state.getAllAttribute.isLoading = false;
            state.getAllAttribute.data = attributes;
            state.getAllAttribute.pagination = rest;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getAllAttribute.isLoading = false;
            state.getAllAttribute.data = [];
         });
      },
   };

   updateAttribute = {
      api: createAsyncThunk("updateAttribute", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.put("/admin/attributes/edit", body);
            thunkAPI.dispatch(this.getSingleAttribute.api(body.id));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.updateAttribute.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.updateAttribute.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.updateAttribute.isLoading = false;
         });
      },
   };

   renameGroup = {
      api: createAsyncThunk("renameGroup", async (body: any, thunkAPI) => {
         try {
            const { data } = await this.admin.patch("/admin/attributes/rename-group", {
               id: body?.attributeGroupId,
               name: body?.name,
            });
            thunkAPI.dispatch(this.getAllAttribute.api(""));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.renameGroup.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.renameGroup.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.renameGroup.isLoading = false;
         });
      },
   };

   delateAttributes = {
      api: createAsyncThunk("delateAttributes", async (ids: string[], thunkAPI) => {
         try {
            const { data } = await this.admin.delete("/admin/attributes/multiple", {
               data: { ids },
            });
            thunkAPI.dispatch(this.getAllAttribute.api(""));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducers(builder: ReducersServiceType) {
         builder.addCase(this.api.pending, (state) => {
            state.delateAttributes.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.delateAttributes.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.delateAttributes.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "AdminAttributeService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.createGroup.reducers(builder);
         this.getGroups.reducers(builder);
         this.createAttribute.reducers(builder);
         this.getAllAttribute.reducers(builder);
         this.getSingleAttribute.reducers(builder);
         this.updateAttribute.reducers(builder);
         this.renameGroup.reducers(builder);
         this.delateAttributes.reducers(builder);
      },
   });
   public reducer = this.slice.reducer;
   public actions = this.slice.actions;
}

export const adminAttributeService = new AdminAttributeService();
export const adminAttributeActions = adminAttributeService.actions;
export const adminAttributeReducer = adminAttributeService.reducer;
