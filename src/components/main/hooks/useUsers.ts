import { useAppSelector } from "store/hooks/hooks";

export const useUsers = () => {
  const { users, user, isFetching, requestErrors } = useAppSelector((state) => state.users);

  return { users, user, isFetching, requestErrors };
};
