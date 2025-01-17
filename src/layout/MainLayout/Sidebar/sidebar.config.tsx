// routes.ts
import HandymanIcon from "@mui/icons-material/Handyman";
import RepeatIcon from "@mui/icons-material/Repeat";
import FolderIcon from "@mui/icons-material/Folder";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import SortIcon from "@mui/icons-material/Sort";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { ReactElement } from "react";
import CalculateSharpIcon from "@mui/icons-material/CalculateSharp";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

export interface RouteConfig {
  path: string;
  title: string;
  icon: ReactElement;
  color?: string;
  children?: RouteConfig[]; // Optional to allow nesting
}

export const setupColor: string = "#e6aa02";
export const transectionColor: string = "#047cc2";
export const reportColor: string = "#00b362";

export const drawerWidth: number = 250;

const routes = [
  {
    title: "Setup",
    path: "/setup",
    color: setupColor,
    icon: <HandymanIcon />,
    children: [
      {
        title: "Menu Master",
        path: "menu-master",
        icon: <WidgetsIcon />,
      },
      {
        title: "Manufacturer",
        path: "Manufacturer",
        icon: <AddHomeWorkIcon />,
      },
      {
        title: "Unit",
        path: "Unit",
        icon: <CalculateSharpIcon />,
      },
      {
        title: "Category Allocation",
        path: "categoryAllocation",
        icon: <SortIcon />,
      },
    ],
  },
  {
    title: "Transection",
    path: "/transection",
    color: transectionColor,
    icon: <RepeatIcon />,
    children: [
      {
        title: "POS Menu",
        path: "pos-menu",
        icon: <WidgetsIcon />,
      },
      {
        title: "Sales Return",
        path: "sales-return",
        icon: <CurrencyExchangeIcon />,
      },
      {
        title: "Sales Price Setting",
        path: "sales-price-setting",
        icon: <PriceChangeIcon />,
      },
    ],
  },
  {
    title: "Report",
    path: "/report",
    color: reportColor,
    icon: <FolderIcon />,
    children: [
      {
        title: "Demo UI",
        path: "demo",
        icon: <WidgetsIcon />,
      },
    ],
  },
  {
    title: "Admin",
    path: "/admin",
    color: reportColor,
    icon: <SupervisorAccountIcon />,
    children: [
      {
        title: "Role",
        path: "role",
        icon: <WidgetsIcon />,
      },
      {
        title: "User",
        path: "user",
        icon: <WidgetsIcon />,
      },
      {
        title: "Country",
        path: "country",
        icon: <WidgetsIcon />,
      },
      {
        title: "Parent Login Password Change",
        path: "parent-login",
        icon: <WidgetsIcon />,
      },
      {
        title: "App User Activation",
        path: "app-user",
        icon: <WidgetsIcon />,
      },
      {
        title: "Role Permission",
        path: "role-permission",
        icon: <WidgetsIcon />,
      },
      {
        title: "Report Allocation",
        path: "report-allocation",
        icon: <WidgetsIcon />,
      },
      {
        title: "Aproval Authority",
        path: "approval-authority",
        icon: <WidgetsIcon />,
      },
      {
        title: "Email Alert Settings",
        path: "email-alert-settings",
        icon: <WidgetsIcon />,
      },
      {
        title: "Company Setting",
        path: "company-setting",
        icon: <WidgetsIcon />,
      },
      {
        title: "Configuration Settings",
        path: "configuration-settings",
        icon: <WidgetsIcon />,
      },
      {
        title: "Email Log History",
        path: "email-log-history",
        icon: <WidgetsIcon />,
      },
      {
        title: "Refer Type Settings",
        path: "refer-type-settings",
        icon: <WidgetsIcon />,
      },
      {
        title: "Refer Number Settings",
        path: "refer-number-settings",
        icon: <WidgetsIcon />,
      },
      {
        title: "Data Import",
        path: "data-import",
        icon: <WidgetsIcon />,
      },
      {
        title: "ABC Analysis",
        path: "abc-analysis",
        icon: <WidgetsIcon />,
      },
    ],
  },
];

export default routes;
