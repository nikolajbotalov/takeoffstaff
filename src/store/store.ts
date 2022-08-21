import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer from "components/auth/model/reducer";
import userReducer from "components/main/model/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
