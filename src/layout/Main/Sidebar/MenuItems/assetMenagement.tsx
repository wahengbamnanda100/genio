import { Settings, Payment, BarChart } from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { MenuItem } from "./menuItem.type";

export const assetMEnuItems: MenuItem[] = [
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
      { label: "Sub Setup asset Item 1", path: "/setup/sub-item-1" },
      { label: "Sub Setup asset Item 2", path: "/setup/sub-item-2" },
    ],
  },
  {
    key: "transaction",
    label: "Transaction",
    icon: <Payment />,
    // path: "/transaction", // Path for the main Transaction item
    subItems: [
      {
        label: "Sub Transaction asset Item 1",
        path: "/transaction/sub-item-1",
      },
      {
        label: "Sub Transaction asset Item 2",
        path: "/transaction/sub-item-2",
      },
    ],
  },
  {
    key: "reports",
    label: "Reports",
    icon: <BarChart />,
    // path: "/reports", // Path for the main Reports item
    subItems: [
      { label: "Sub Reports asset Item 1", path: "/reports/sub-item-1" },
      { label: "Sub Reports  Item 2", path: "/reports/sub-item-2" },
    ],
  },
];
