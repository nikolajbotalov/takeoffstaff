export type UserType = {
  id: number;
  name: string;
  username: string;
  avatar?: string;
};

export type CreateUserType = {
  name: string;
  username: string;
};

export type UsersResponseParamsType = {
  name?: string;
};
