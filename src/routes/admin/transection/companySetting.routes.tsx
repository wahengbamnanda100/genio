import { RouteObject } from "react-router";
import CompanySettingList from "../../../pages/companySetting/CompanySettingList";
import CompanySettings from "../../../pages/companySetting/CompanySetting";

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
