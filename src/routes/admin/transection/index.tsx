import { RouteObject } from "react-router";
import CompanySettingsRoutes from "./companySetting.routes";
import UserRoutes from "../setup/user.routes";

const transectionRotues: RouteObject[] = [
  {
    path: "company-setting",
    children: CompanySettingsRoutes,
  },
  {
    path: "user",
    children: UserRoutes,
  },
];

export default transectionRotues;
