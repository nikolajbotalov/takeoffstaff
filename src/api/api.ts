import { axiosInstance } from "./axois.instance";

import { LoginFormType } from "entities/auth/lib/types";
import { CreateUserType, UserType, UsersResponseParamsType } from "components/main/lib/types";

export const ServiceApi = {
  auth: {
    login: (form: LoginFormType) => axiosInstance().post<LoginFormType>(`/login`, form),
  },
  users: {
    getUsers: (params: UsersResponseParamsType) =>
      axiosInstance().get<UserType[]>(`users`, { params: params }),
    getUser: (user_id: number) => axiosInstance().get<UserType>(`users/${user_id}`),
    create: (params: CreateUserType) => axiosInstance().post<UserType[]>(`users`, params),
    update: (user_id: number, params: CreateUserType) => axiosInstance().patch(`users/${user_id}`, params),
    remove: (user_id: number) => axiosInstance().delete(`users/${user_id}`),
  },
};
