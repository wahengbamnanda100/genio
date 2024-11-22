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
const Demo = Loadable(lazy(() => import("../pages/Demo")));
const DemoList = Loadable(lazy(() => import("../pages/DemoList")));
const Manufacturer = Loadable(lazy(() => import("../pages/Manufacturer")));
const ManufacturerList = Loadable(lazy(() => import("../pages/ManufacturerMasterList")));

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
      errorElement: <ErrorElement />,
    },
    {
      path: "demo",
      element: (
        <PrivateRoute>
          <Demo />
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "demo/:id",
      element: (
        <PrivateRoute>
          <Demo />
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "demo-list",
      element: (
        <PrivateRoute>
          <DemoList />
        </PrivateRoute>
      ),
    },
    {
      path: "Manufacturer",
      element: (
        <PrivateRoute>
          <Manufacturer/>
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },

    {
      path: "ManufacturerMasterList",
      element: (
        <PrivateRoute>
          <ManufacturerList/>
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
