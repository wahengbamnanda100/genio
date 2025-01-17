import { FieldProps } from "../../Form-component/formField.type";

export type RolePermissionType = {
  RoleCode: string;
  RoleName: string;
  Module: string;
};

export const RolePermissionFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "RoleCode",
    label: "Role Code",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "RoleName",
    label: "Role Name",
    size: "medium",
    xs: 4.5,
  },
  {
    fieldType: "text",
    name: "Module",
    label: "Module",
    size: "medium",
    xs: 4.5,
  },
];
