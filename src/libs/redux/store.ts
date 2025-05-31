import rootReducer from "@/services";
import { configureStore } from "@reduxjs/toolkit";
import reduxMiddleware from "./middlewares/middleware.redux";

export const makeStore = () => {
   return configureStore({
      reducer: rootReducer,
      middleware(getDefaultMiddleware) {
         return getDefaultMiddleware().concat(reduxMiddleware);
      },
   });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
