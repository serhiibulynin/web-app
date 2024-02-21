import React from "react";
import { Home, Description } from "@mui/icons-material";
import { ROUTES } from "src/constants";

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  cName: string;
}

export const SidebarData: SidebarItem[] = [
  {
    title: "Главная",
    path: "/",
    icon: <Home />,
    cName: "nav-text",
  },
  {
    title: "Users",
    path: ROUTES.users,
    icon: <Description />,
    cName: "nav-text",
  },
  // {
  //   title: "Заказы",
  //   path: "/products",
  //   icon: <ShoppingCart />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Отследить",
  //   path: "/team",
  //   icon: <People />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Калькулятор",
  //   path: "/messages",
  //   icon: <Mail />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Приход на склад",
  //   path: "/support",
  //   icon: <Help />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Товары/Склад",
  //   path: "/products-storage",
  //   icon: <Storage />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Аналитика",
  //   path: "/analytics",
  //   icon: <BarChart />,
  //   cName: "nav-text",
  // },
  // {
  //   title: "Отчеты",
  //   path: "/reports",
  //   icon: <Assessment />,
  //   cName: "nav-text",
  // },
];
