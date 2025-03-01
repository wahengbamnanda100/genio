import CompanySettings from "@/pages/admin/companySetting/CompanySetting";
import CompanySettingList from "@/pages/admin/companySetting/CompanySettingList";
import { RouteObject } from "react-router";

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
