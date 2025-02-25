import { RouteObject } from "react-router";
import ErrorElement from "../common/UI-component/ErrorElement";
// import Loadable from "../common/UI-component/Loadable";
// import { lazy } from "react";

// const Role = Loadable(lazy(() => import("../pages/Roles")));
// const RoleList = Loadable(lazy(() => import("../pages/RoleList")));
// import Dashboard from "../layout/Demo/Main";

import PrivateRoute from "./PrivateRotes";
import MainLayout from "../layout/Main";
import AdminRoutes from "./admin";
import Dashboard from "../pages/dashboard";

const NewRoutes: RouteObject = {
  path: "/",
  element: (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  ),
  errorElement: <ErrorElement />,
  children: [
    {
      index: true,
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "admin",
      children: AdminRoutes,
    },
  ],
};

export default NewRoutes;
