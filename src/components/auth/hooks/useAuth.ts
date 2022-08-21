import { useAppSelector } from "store/hooks/hooks";

export const useAuth = () => {
  const { profile, isFetching, requestErrors } = useAppSelector((state) => state.auth);

  return { profile, isFetching, requestErrors };
};
