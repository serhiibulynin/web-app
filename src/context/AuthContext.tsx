import React, { useMemo, useReducer } from "react";
import { client } from "src/graphql/client";

type Props = {
  children: React.ReactNode;
};

export type User = {
  email: string;
  firstName: string;
  id: number;
  lastName: number;
};

type AuthState = {
  user: User | null;
  hasToken: boolean;
};

type AuthAction = { type: string; payload: User } | { type: string };

type ContextProps = {
  isAuth: boolean;
  hasToken: boolean;
  user: any;
  signOut: () => void;
  signIn: (payload: any) => void;
};

export const AuthContext = React.createContext<ContextProps>({
  isAuth: false,
  hasToken: false,
  user: null,
  signOut: () => {},
  signIn: () => {},
});

const actionTypes = {
  SUCCESS_AUTH: "SUCCESS_AUTH",
  LOGOUT: "LOGOUT",
  INIT: "INIT",
};

function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case actionTypes.LOGOUT: {
      localStorage.removeItem("token");
      return {
        user: null,
        hasToken: false,
      };
    }
    case actionTypes.SUCCESS_AUTH: {
      return {
        ...state,
        // @ts-ignore
        user: action.payload,
        hasToken: true,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function useAuthContext() {
  const authContext = React.useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return authContext;
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    hasToken: !!localStorage.getItem("token"),
  });

  const signIn = (payload: any) => {
    dispatch({ type: actionTypes.SUCCESS_AUTH, payload });
  };

  const signOut = () => {
    client.clearStore();
    dispatch({ type: actionTypes.LOGOUT });
  };

  const value = useMemo(
    () => ({
      isAuth: !!state.user,
      hasToken: state.hasToken,
      user: state.user,
      signOut,
      signIn,
    }),
    [state.user, state.hasToken, signOut, signIn],
  );

  return (
    <AuthContext.Provider value={value as ContextProps}>
      {children}
    </AuthContext.Provider>
  );
}
