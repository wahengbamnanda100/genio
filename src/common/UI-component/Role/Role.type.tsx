import { FieldProps } from "../../Form-component";

export type RoleType = {
  RoleCode: string;
  RoleName: string;
  RoleDesc: string;
  RoleStatus: boolean;
  ApproveAutority: boolean;
  costView: boolean;
};

export const RolesFields = (): FieldProps[] => [
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
    xs: 12,
  },
  {
    fieldType: "text",
    name: "RoleDesc",
    label: "Role Description",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "checkbox",
    name: "checkboxes",
    checkBoxs: [
      { name: "RoleStatus", label: "Role Status" },
      { name: "ApproveAutority", label: "Approve Autority" },
      { name: "costView", label: "Cost View" },
    ],
    labelPlacement: "end",
    row: true,
    xs: 12,
  },
];
