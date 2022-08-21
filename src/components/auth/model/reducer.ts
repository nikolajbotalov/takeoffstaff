import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LoginFormType } from "entities/auth/lib/types";
import { ErrorType } from "shared/lib/types";

import { ServiceApi } from "api/api";

export const loginThunk = createAsyncThunk("auth/login", async (form: LoginFormType, { dispatch }) => {
  try {
    dispatch(setFetching(true));
    const result = await ServiceApi.auth.login(form);
    if (result) return result.data;
  } catch (error: ErrorType) {
    dispatch(setError(error));
    return null;
  } finally {
    dispatch(setFetching(false));
  }
});

const initialProfile: LoginFormType = {
  email: "",
  password: "",
  token: "",
};

export type AuthState = {
  profile: LoginFormType;
  isFetching: boolean;
  requestErrors: ErrorType;
};

const initialState: AuthState = {
  profile: initialProfile,
  isFetching: false,
  requestErrors: null,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFetching(state, { payload }: { payload: boolean }) {
      state.isFetching = payload;
    },
    setError(state, { payload }: { payload: ErrorType }) {
      state.requestErrors = payload.response.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      if (payload) {
        state.profile = payload;
        localStorage.setItem("to_token", String(payload.password));
      }
    });
  },
});

export const { setError, setFetching } = authReducer.actions;

export default authReducer.reducer;
