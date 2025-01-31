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
const ManufacturerList = Loadable(
  lazy(() => import("../pages/ManufacturerMasterList")),
);
const Unit = Loadable(lazy(() => import("../pages/Unit")));
const UnitList = Loadable(lazy(() => import("../pages/UnitList")));
const CategoryAllocation = Loadable(
  lazy(() => import("../pages/CategoryAllocation")),
);
const SalesReturn = Loadable(lazy(() => import("../pages/SalesReturn")));
const SalePriceSetting = Loadable(
  lazy(() => import("../pages/SalePriceSetting")),
);

//!___-admin____
const Role = Loadable(lazy(() => import("../pages/Roles")));
const RoleList = Loadable(lazy(() => import("../pages/RoleList")));
const Users = Loadable(lazy(() => import("../pages/Users")));
const Country = Loadable(lazy(() => import("../pages/Country")));
const ParentLoginPassword = Loadable(
  lazy(() => import("../pages/ParentLoginPassword")),
);
const AppUserActivation = Loadable(
  lazy(() => import("../pages/AppActivation")),
);
const RolePermission = Loadable(lazy(() => import("../pages/RolePermission")));
const ReportAllocation = Loadable(
  lazy(() => import("../pages/ReportAllocation")),
);

const ApprovalAuthority = Loadable(
  lazy(() => import("../pages/ApprovalAuthority")),
);

const EmailAlertSettings = Loadable(lazy(() => import("../pages/EmailAlert")));

const CompanySetting = Loadable(lazy(() => import("../pages/CompanySetting")));

const COnfigurationSetting = Loadable(
  lazy(() => import("../pages/ConfigurationSetting")),
);

const EmailLogSettings = Loadable(
  lazy(() => import("../pages/EmailLogSettings")),
);

const ReferTypeSettings = Loadable(
  lazy(() => import("../pages/ReferTypeSettings")),
);

const ReferNubmerSettings = Loadable(
  lazy(() => import("../pages/ReferNumberSettings")),
);

const ABCAnalysis = Loadable(lazy(() => import("../pages/ABCAnalysis")));

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
      path: "Unit",
      element: (
        <PrivateRoute>
          <Unit />
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "Unit/:id",
      element: (
        <PrivateRoute>
          <Unit />
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "Unit-list",
      element: (
        <PrivateRoute>
          <UnitList />
        </PrivateRoute>
      ),
    },
    {
      path: "Manufacturer",
      element: (
        <PrivateRoute>
          <Manufacturer />
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "Manufacturer/:id",
      element: (
        <PrivateRoute>
          <Manufacturer/>
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },
    {
      path: "categoryAllocation",
      element: (
        <PrivateRoute>
          <CategoryAllocation />
        </PrivateRoute>
      ),
      errorElement: <ErrorElement />,
    },

    {
      path: "ManufacturerMasterList",
      element: (
        <PrivateRoute>
          <ManufacturerList />
        </PrivateRoute>
      ),
    },
    {
      path: "sales-return",
      element: (
        <PrivateRoute>
          <SalesReturn />
        </PrivateRoute>
      ),
    },
    {
      path: "sales-price-setting",
      element: (
        <PrivateRoute>
          <SalePriceSetting />
        </PrivateRoute>
      ),
    },
    {
      path: "role",
      element: (
        <PrivateRoute>
          <Role />
        </PrivateRoute>
      ),
    },
    {
      path: "role-list",
      element: (
        <PrivateRoute>
          <RoleList />
        </PrivateRoute>
      ),
    },
    {
      path: "user",
      element: (
        <PrivateRoute>
          <Users />
        </PrivateRoute>
      ),
    },
    {
      path: "country",
      element: (
        <PrivateRoute>
          <Country />
        </PrivateRoute>
      ),
    },
    {
      path: "parent-login",
      element: (
        <PrivateRoute>
          <ParentLoginPassword />
        </PrivateRoute>
      ),
    },
    {
      path: "app-user",
      element: (
        <PrivateRoute>
          <AppUserActivation />
        </PrivateRoute>
      ),
    },
    {
      path: "role-permission",
      element: (
        <PrivateRoute>
          <RolePermission />
        </PrivateRoute>
      ),
    },
    {
      path: "report-allocation",
      element: (
        <PrivateRoute>
          <ReportAllocation />
        </PrivateRoute>
      ),
    },
    {
      path: "approval-authority",
      element: (
        <PrivateRoute>
          <ApprovalAuthority />
        </PrivateRoute>
      ),
    },
    {
      path: "email-alert-settings",
      element: (
        <PrivateRoute>
          <EmailAlertSettings />
        </PrivateRoute>
      ),
    },
    {
      path: "company-setting",
      element: (
        <PrivateRoute>
          <CompanySetting />
        </PrivateRoute>
      ),
    },
    {
      path: "configuration-settings",
      element: (
        <PrivateRoute>
          <COnfigurationSetting />
        </PrivateRoute>
      ),
    },
    {
      path: "email-log-history",
      element: (
        <PrivateRoute>
          <EmailLogSettings />
        </PrivateRoute>
      ),
    },
    {
      path: "refer-type-settings",
      element: (
        <PrivateRoute>
          <ReferTypeSettings />
        </PrivateRoute>
      ),
    },
    {
      path: "refer-number-settings",
      element: (
        <PrivateRoute>
          <ReferNubmerSettings />
        </PrivateRoute>
      ),
    },
    {
      path: "data-import",
      element: (
        <PrivateRoute>
          <COnfigurationSetting />
        </PrivateRoute>
      ),
    },
    {
      path: "abc-analysis",
      element: (
        <PrivateRoute>
          <ABCAnalysis />
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
