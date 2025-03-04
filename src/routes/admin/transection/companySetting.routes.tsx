import { lazy } from "react";
import { RouteObject } from "react-router";
import CenteredLoadable from "@/common/UI-component/CeteredLoadable";

const CompanySettingList = CenteredLoadable(
  lazy(() => import("@/pages/admin/companySetting/CompanySettingList")),
);
const CompanySettings = CenteredLoadable(
  lazy(() => import("@/pages/admin/companySetting/CompanySetting")),
);

const CompanySettingsRoutes: RouteObject[] = [
  {
    index: true,
    element: <CompanySettingList />,
  },
  {
    path: "create",
    element: <CompanySettings />,
  },
  {
    path: "edit/:id",
    element: <CompanySettings />,
  },
  {
    path: "view/:id",
    element: <CompanySettings />,
  },
];

export default CompanySettingsRoutes;
