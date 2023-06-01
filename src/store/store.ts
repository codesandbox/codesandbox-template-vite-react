import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
