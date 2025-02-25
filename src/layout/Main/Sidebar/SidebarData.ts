//* react icons
import { LuUsersRound } from "react-icons/lu";
import { TbShoppingCartCheck } from "react-icons/tb";
import { FaChartBar } from "react-icons/fa";
import { LuUserCog } from "react-icons/lu";
import { TbSchool } from "react-icons/tb";

//*sub menu icons
import { RiUserSettingsLine } from "react-icons/ri";
import { LuArrowLeftRight } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IconType } from "react-icons/lib";

//* menu icons
import { LuSettings2 } from "react-icons/lu";

export interface MenuItem {
  label: string;
  icon: string;
  active?: boolean;
  secondMenu: {
    accordionTitle: string;
    icon?: IconType;
    items: { label: string; path: string; icon?: IconType }[];
  }[];
}

export const menuData: MenuItem[] = [
  {
    label: "HRMS",
    icon: "LuUsersRound",
    secondMenu: [
      {
        accordionTitle: "Setup",
        icon: RiUserSettingsLine,
        items: [
          { label: "User Management", path: "/admin/users" },
          { label: "Settings", path: "/admin/settings" },
        ],
      },
      {
        accordionTitle: "Transection",
        icon: LuArrowLeftRight,
        items: [
          { label: "Library", path: "/education/library" },
          { label: "Tutorials", path: "/education/tutorials" },
        ],
      },
      {
        accordionTitle: "Report",
        icon: HiOutlineDocumentReport,
        items: [
          { label: "Library", path: "/education/library" },
          { label: "Tutorials", path: "/education/tutorials" },
        ],
      },
    ],
  },
  {
    label: "SOP",
    icon: "TbShoppingCartCheck",
    secondMenu: [
      {
        accordionTitle: "Setup",
        icon: RiUserSettingsLine,
        items: [
          { label: "Menu Master", path: "/setup/menu-master" },
          { label: "Manufacturer", path: "/setup/menufacturer" },
          { label: "Unit", path: "/setup/unit" },
          { label: "Category Allocation", path: "/setup/category-allocation" },
        ],
      },
      {
        accordionTitle: "Transection",
        icon: LuArrowLeftRight,
        items: [
          { label: "POS Menu", path: "/transection/pos-menu" },
          { label: "Sales Return", path: "/transection/sales-return" },
          {
            label: "Sales Price Setting",
            path: "/transection/sales-price-setting",
          },
        ],
      },
      {
        accordionTitle: "Report",
        icon: HiOutlineDocumentReport,
        items: [
          // { label: "ABC Analysis", path: "/report/abc-analysis" },
        ],
      },
    ],
  },
  {
    label: "Asset Management",
    icon: "FaChartBar",
    secondMenu: [
      {
        accordionTitle: "Setup",
        icon: RiUserSettingsLine,
        items: [
          { label: "User Management", path: "/admin/users" },
          { label: "Settings", path: "/admin/settings" },
        ],
      },
      {
        accordionTitle: "Transection",
        icon: LuArrowLeftRight,
        items: [
          { label: "Library", path: "/education/library" },
          { label: "Tutorials", path: "/education/tutorials" },
        ],
      },
      {
        accordionTitle: "Report",
        icon: HiOutlineDocumentReport,
        items: [
          { label: "Library", path: "/education/library" },
          { label: "Tutorials", path: "/education/tutorials" },
        ],
      },
    ],
  },
  {
    label: "Admin",
    icon: "LuUserCog",
    secondMenu: [
      {
        accordionTitle: "Setup",
        icon: RiUserSettingsLine,
        items: [
          { label: "Role", path: "admin/setup/role" },
          { label: "User", path: "admin/setup/user" },
          { label: "Country", path: "/setup/country" },
          {
            label: "Parent Login Password Change",
            path: "/setup/parent-login-password-change",
          },
          { label: "App User Activation", path: "/setup/app-user-activation" },
        ],
      },
      {
        accordionTitle: "Transection",
        icon: LuArrowLeftRight,
        items: [
          { label: "Role Permission", path: "/transection/role-permission" },
          {
            label: "Report Allocation",
            path: "/transection/report-allocation",
          },
          {
            label: "Approval Authority",
            path: "/transection/approoval-authority",
          },
          {
            label: "Email Alert Setting",
            path: "/transection/email-alert-setting",
          },
          {
            label: "Company Setting",
            icon: LuSettings2,
            path: "admin/transection/company-setting",
          },
          {
            label: "Configuration Setting",
            path: "/transection/configuration-setting",
          },
          {
            label: "Email Log History",
            path: "/transection/email-log-history",
          },
          {
            label: "Refer Type Setting",
            path: "/transection/refer-type-setting",
          },
          {
            label: "Refer Number Setting",
            path: "/transection/refer-number-setting",
          },
          { label: "Data Import", path: "/transection/data-import" },
        ],
      },
      {
        accordionTitle: "Report",
        icon: HiOutlineDocumentReport,
        items: [{ label: "ABC Analysis", path: "/report/abc-analysis" }],
      },
    ],
  },
  {
    label: "Education",
    icon: "TbSchool",
    secondMenu: [
      {
        accordionTitle: "Setup",
        items: [
          { label: "Online Courses", path: "/education/online" },
          { label: "Offline Courses", path: "/education/offline" },
        ],
      },
      {
        accordionTitle: "Transection",
        items: [
          { label: "Library", path: "/education/library" },
          { label: "Tutorials", path: "/education/tutorials" },
        ],
      },
      {
        accordionTitle: "Report",
        items: [
          { label: "Library", path: "/education/library" },
          { label: "Tutorials", path: "/education/tutorials" },
        ],
      },
    ],
  },
];

export const iconMapping: { [key: string]: React.ElementType } = {
  LuUsersRound,
  TbShoppingCartCheck,
  FaChartBar,
  LuUserCog,
  TbSchool,
};
