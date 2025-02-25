import { Settings, Payment, BarChart } from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { MenuItem } from "./menuItem.type";

export const posMenuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <HomeOutlinedIcon />,
    path: "dashboard",
  },
  {
    key: "setup",
    label: "Setup",
    icon: <Settings />,
    // path: "/setup", // Path for the main Setup item
    subItems: [
      { label: "Sub Setup Item 1", path: "/setup/sub-item-1" },
      { label: "Sub Setup Item 2", path: "/setup/sub-item-2" },
      { label: "Sub Setup Item 2", path: "/setup/sub-item-2" },
      { label: "Sub Setup Item 2", path: "/setup/sub-item-2" },
      { label: "Sub Setup Item 2", path: "/setup/sub-item-2" },
      { label: "Sub Setup Item 2", path: "/setup/sub-item-2" },
    ],
  },
  {
    key: "transaction",
    label: "Transaction",
    icon: <Payment />,
    // path: "/transaction", // Path for the main Transaction item
    subItems: [
      { label: "Sub Transaction Item 1", path: "/transaction/sub-item-1" },
      { label: "Sub Transaction Item 2", path: "/transaction/sub-item-2" },
      { label: "Sub Transaction Item 2", path: "/transaction/sub-item-2" },
      { label: "Sub Transaction Item 2", path: "/transaction/sub-item-2" },
      { label: "Sub Transaction Item 2", path: "/transaction/sub-item-2" },
      { label: "Sub Transaction Item 2", path: "/transaction/sub-item-2" },
      { label: "Sub Transaction Item 2", path: "/transaction/sub-item-2" },
    ],
  },
  {
    key: "reports",
    label: "Reports",
    icon: <BarChart />,
    // path: "/reports", // Path for the main Reports item
    subItems: [
      { label: "Sub Reports Item 1", path: "/reports/sub-item-1" },
      { label: "Sub Reports Item 2", path: "/reports/sub-item-2" },
      { label: "Sub Reports Item 2", path: "/reports/sub-item-2" },
      { label: "Sub Reports Item 2", path: "/reports/sub-item-2" },
      { label: "Sub Reports Item 2", path: "/reports/sub-item-2" },
      { label: "Sub Reports Item 2", path: "/reports/sub-item-2" },
    ],
  },
];
