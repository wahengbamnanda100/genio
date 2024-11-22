// routes.ts
import HandymanIcon from "@mui/icons-material/Handyman";
import RepeatIcon from "@mui/icons-material/Repeat";
import FolderIcon from "@mui/icons-material/Folder";
import WidgetsIcon from "@mui/icons-material/Widgets";
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import { ReactElement } from "react";

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
      }
    ],
  },
];

export default routes;
