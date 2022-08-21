import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ErrorType } from "shared/lib/types";
import { UserType, CreateUserType, UsersResponseParamsType } from "components/main/lib/types";
import { ServiceApi } from "api/api";

export const getUsersThunk = createAsyncThunk(
  "user/getUsers",
  async (params: UsersResponseParamsType, { dispatch }) => {
    try {
      dispatch(setFetching(true));
      const result = await ServiceApi.users.getUsers(params);
      if (result) return result.data;
    } catch (error: ErrorType) {
      dispatch(setError(error));
      return null;
    } finally {
      dispatch(setFetching(false));
    }
  }
);

export const getUserThunk = createAsyncThunk("user/getUser", async (user_id: number, { dispatch }) => {
  try {
    dispatch(setFetching(true));
    const result = await ServiceApi.users.getUser(user_id);
    if (result) return result.data;
  } catch (error: ErrorType) {
    dispatch(setError(error));
    return null;
  } finally {
    dispatch(setFetching(false));
  }
});

export const createUserThunk = createAsyncThunk(
  "user/create",
  async (params: CreateUserType, { dispatch }) => {
    try {
      dispatch(setFetching(true));
      await ServiceApi.users.create(params);
      dispatch(getUsersThunk({}));
    } catch (error: ErrorType) {
      dispatch(setError(error));
      return null;
    } finally {
      dispatch(setFetching(false));
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "user/update",
  async (user: { user_id: number; params: CreateUserType }, { dispatch }) => {
    try {
      const { user_id, params } = user;
      dispatch(setFetching(true));
      await ServiceApi.users.update(Number(user_id), params);
      dispatch(getUsersThunk({}));
    } catch (error: ErrorType) {
      dispatch(setError(error));
      return null;
    } finally {
      dispatch(setFetching(false));
    }
  }
);

export const removeUserThunk = createAsyncThunk("user/remove", async (user_id: number, { dispatch }) => {
  try {
    dispatch(setFetching(true));
    await ServiceApi.users.remove(user_id);
    dispatch(getUsersThunk({}));
  } catch (error: ErrorType) {
    dispatch(setError(error));
    return null;
  } finally {
    dispatch(setFetching(false));
  }
});

const initialUser: UserType = {
  id: 0,
  name: "",
  username: "",
  avatar: "",
};

export type UserState = {
  users: UserType[];
  user: UserType;
  isFetching: boolean;
  requestErrors: ErrorType;
};

const initialState: UserState = {
  users: [],
  user: initialUser,
  isFetching: false,
  requestErrors: null,
};

const usersReducer = createSlice({
  name: "users",
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
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      if (payload) state.users = payload;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      if (payload) state.user = payload;
    });
  },
});

export const { setError, setFetching } = usersReducer.actions;

export default usersReducer.reducer;
