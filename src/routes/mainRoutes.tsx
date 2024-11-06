import { lazy } from "react";
import Loadable from "../common/UI-component/Loadable";
import MainLayout from "../layout/MainLayout";
import ErrorElement from "../common/UI-component/ErrorElement";
import { RouteObject } from "react-router";
import PageNotFound from "../common/UI-component/PageNotFound";
import PrivateRoute from "./PrivateRotes";

// const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));
const PosMenu = Loadable(lazy(() => import("../pages/PosMenu")));
const MenuMasterList = Loadable(lazy(() => import("../pages/MenuMasterLIst")));
const MenuMaster = Loadable(lazy(() => import("../pages/MenuMaster")));

const MainRoutes: RouteObject = {
  path: "/",
  element: (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  ),

  children: [
    {
      path: "/",
      element: (
        <PrivateRoute>
          <PosMenu />
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "pos-menu",
      element: (
        <PrivateRoute>
          <PosMenu />
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "/pos-menu/view/:id",
      element: (
        <PrivateRoute>
          <PosMenu />
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "menu-master",
      element: (
        <PrivateRoute>
          <MenuMaster />
        </PrivateRoute>
      ),
    },
    {
      path: "menu-master/:id",
      element: (
        <PrivateRoute>
          <MenuMaster />
        </PrivateRoute>
      ),
    },
    {
      path: "menu-master-list",
      element: (
        <PrivateRoute>
          <MenuMasterList />
        </PrivateRoute>
      ),
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
};

export default MainRoutes;
