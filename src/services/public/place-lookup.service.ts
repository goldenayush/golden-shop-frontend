import HttpInterceptor from "@/libs/interceptors/http.interceptor";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   getCountries: {
      isLoading: true,
      data: [] as { name: string; isoCode: string }[],
   },
   getStates: {
      isLoading: false,
      data: [] as { name: string; isoCode: string }[],
   },
   getCities: {
      isLoading: false,
      data: [] as any[],
   },
};

type BuilderType = ActionReducerMapBuilder<typeof initialState>;

class PlaceLookupService extends HttpInterceptor {
   getCountries = {
      api: createAsyncThunk("!getCountries", async (_, thunkAPI) => {
         try {
            const { data } = await this.axios.get("/country-info/");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getCountries.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getCountries.isLoading = false;
            state.getCountries.data = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getCountries.isLoading = false;
            state.getCountries.data = [];
         });
      },
   };

   getStates = {
      api: createAsyncThunk("!getStates", async (countryCode: string, thunkAPI) => {
         try {
            const { data } = await this.axios.get(`/country-info/${countryCode}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getStates.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getStates.isLoading = false;
            state.getStates.data = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getStates.isLoading = false;
            state.getStates.data = [];
         });
      },
   };

   getCities = {
      api: createAsyncThunk("!getCities", async (params: { stateCode: string; country: string }, thunkAPI) => {
         try {
            const { data } = await this.axios.get(`/country-info/${params.country}/${params.stateCode}`);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: BuilderType) {
         builder.addCase(this.api.pending, (state) => {
            state.getCities.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.getCities.isLoading = false;
            state.getCities.data = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.getCities.isLoading = false;
            state.getCities.data = [];
         });
      },
   };

   private slice = createSlice({
      name: "PlaceLookupService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getCountries.reducer(builder);
         this.getStates.reducer(builder);
         this.getCities.reducer(builder);
      },
   });

   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const placeLookupService = new PlaceLookupService();
export const placeLookupActions = placeLookupService.actions;
export const placeLookupReducer = placeLookupService.reducer;
