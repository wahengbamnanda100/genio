import { adminMenuItems } from "./admin";
import { posMenuItems } from "./posMenu";
import { hrmsMenuItems } from "./hrms";
import { educationMenuItems } from "./education";
import { assetMEnuItems } from "./assetMenagement";
import { MenuItem } from "./menuItem.type";

const MenuItems: Record<string, MenuItem[]> = {
  admin: adminMenuItems,
  pos: posMenuItems,
  hrms: hrmsMenuItems,
  education: educationMenuItems,
  asset: assetMEnuItems,
};

export default MenuItems;
