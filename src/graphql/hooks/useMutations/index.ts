import { MutationHookOptions, useMutation } from "@apollo/client";
import * as MUTATIONS from "../../mutations";

export const useSignIn = (options?: MutationHookOptions) => {
  return useMutation(MUTATIONS.SIGN_IN, options);
};

export const useCreateUser = (options?: MutationHookOptions) => {
  return useMutation(MUTATIONS.CREATE_USER, options);
};

// export const setAuthData = (options?: MutationHookOptions) => {
//   return useMutation(MUTATIONS.SET_AUTH_DATA, options);
// };

export const useUpdateUserById = (options?: MutationHookOptions) => {
  return useMutation(MUTATIONS.UPDATE_USER_BY_ID, options);
};
