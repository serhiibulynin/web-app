import { Navigate, Route, Routes } from "react-router-dom";
import Header from "src/components/Header/Header";
import { useAuthContext } from "src/context/AuthContext";
import { useEffect } from "react";
import { useGetCurrentUserLazyQuery } from "src/graphql/generated";
import { ROUTES } from "../constants";
import { routes } from "./routes";

interface ProtectedRouteTypes {
  element: () => JSX.Element;
  isAuth: boolean;
  path: string;
}
export const RouterWrapper = () => {
  const { isAuth, hasToken, signIn, signOut } = useAuthContext();

  const [getCurrentUser] = useGetCurrentUserLazyQuery({
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

  useEffect(() => {
    if (hasToken && !isAuth) {
      getCurrentUser();
    }
  }, [hasToken]);

  // if (loading || (!isAuth && hasToken)) {
  //   return <div>dsadsa</div>;
  // }

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute
              path={route.path}
              element={route.element}
              isAuth={isAuth}
            />
          }
        />
      ))}
      <Route key="NotFound" path="*" element={<div>not found</div>} />
    </Routes>
  );
};
const ProtectedRoute = ({
  element: Element,
  isAuth,
  path,
}: ProtectedRouteTypes) => {
  // исключение для страниц не требующих авторизации
  if (authRoutCheck(path)) {
    if (isAuth) return <Navigate to={ROUTES.home} />;
    return <Element />;
  }
  if (isAuth) {
    return (
      <div>
        <Header />
        <Element />
      </div>
    );
  }
  return <Navigate to={ROUTES.login} />;
};
const authRoutCheck = (path: string) => {
  const authRout = [ROUTES.login];
  return authRout.includes(path);
};
