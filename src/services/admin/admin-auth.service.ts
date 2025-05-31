import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { deleteAdminTokens, getAdminTokens, setAdminTokens } from "@/server-actions/admin-tokens.action";
import { IAdmin } from "@/types/admin.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   session: {
      isLoading: true,
      data: null as null | {
         accessToken?: string;
         refreshToken?: string;
         user: IAdmin;
      },
   },
   login: {
      isLoading: false,
   },
   logout: {
      isLoading: false,
   },
};

class AuthAdminService extends HttpInterceptor {
   login = {
      api: createAsyncThunk("admin-login", async (credentials, thunkAPI) => {
         try {
            const { data } = await this.axios.post("/admin/login", credentials);
            await setAdminTokens({ accessToken: data.authToken });
            thunkAPI.dispatch(this.adminSession.api());
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.login.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.login.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.login.isLoading = false;
         });
      },
   };

   adminSession = {
      api: createAsyncThunk("!adminSession", async (_, thunkAPI) => {
         try {
            const [tokens, data] = await Promise.all([
               getAdminTokens(), //
               this.admin.get("/admin/profile"),
            ]);
            return { tokens, user: data.data?.data };
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.session.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.session.isLoading = false;
            state.session.data = {
               ...action.payload.tokens,
               user: action.payload?.user,
            };
         });
         builder.addCase(this.api.rejected, (state) => {
            state.session.isLoading = false;
            state.session.data = null;
         });
      },
   };

   logout = {
      api: createAsyncThunk("admin-logout", async (_, thunkAPI) => {
         try {
            const { data } = await this.admin.post("/admin/logout");
            await deleteAdminTokens();
            thunkAPI.dispatch(this.adminSession.api());
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.logout.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.logout.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.logout.isLoading = false;
         });
      },
   };
   /*------- only dispatch in admin-http.interceptor.ts--------*/

   private slice = createSlice({
      name: "AuthAdminService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.login.reducer(builder);
         this.logout.reducer(builder);
         this.adminSession.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}
export const authAdminService = new AuthAdminService();
export const authAdminActions = authAdminService.actions;
export const authAdminReducer = authAdminService.reducer;
