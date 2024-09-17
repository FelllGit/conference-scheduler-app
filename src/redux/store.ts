import { configureStore } from "@reduxjs/toolkit";
import userFilterReducer from "./slices/userFilterSlice";

const store = configureStore({
  reducer: {
    userFilter: userFilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
