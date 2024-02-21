import { ROUTES } from "src/constants";
import Authpage from "src/pages/AuthPage/Authpage";
import Mainpage from "src/pages/MainPage/Mainpage";

import UsersPage from "src/pages/UsersPage/UsersPage";

export const routes = [
  {
    path: ROUTES.home,
    element: Mainpage,
  },
  {
    path: ROUTES.login,
    element: Authpage,
  },
  {
    path: ROUTES.users,
    element: UsersPage,
  },
];
