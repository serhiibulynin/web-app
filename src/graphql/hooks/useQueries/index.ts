import { useLazyQuery, useQuery } from "@apollo/client";
import { useAuthContext } from "src/context/AuthContext";
import * as QUERIES from "../../queries";

export const useGetCurrentUser = () => {
  return useQuery(QUERIES.GET_CURRENT_USER);
};

export const useGetCurrentUserLazyQuery = () => {
  const { signIn, signOut } = useAuthContext();

  return useLazyQuery(QUERIES.GET_CURRENT_USER, {
    onCompleted: (response) => {
      if (response?.getCurrentUser) {
        signIn(response?.getCurrentUser);
      }
    },
    onError: (error) => {
      if (error) {
        signOut();
      }
    },
  });
};

export const getUserById = () => {
  return useQuery(QUERIES.GET_USER_BY_ID);
};

export const useGetUsers = () => {
  return useQuery(QUERIES.GET_USERS);
};
