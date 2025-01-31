import { TFunction } from "i18next";
import { FieldProps } from "../../Form-component";

export type RoleType = {
  RoleCode: string;
  RoleName: string;
  RoleDesc: string;
  RoleStatus: boolean;
  ApproveAutority: boolean;
  costView: boolean;
};

export const RolesFields = (
  t: TFunction<"translation", undefined>,
): FieldProps[] => [
  {
    fieldType: "new-input",
    name: "RoleCode",
    label: t("role-code"),
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "new-input",
    name: "RoleName",
    label: t("role-name"),
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "new-input",
    name: "RoleDesc",
    label: t("role-description"),
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "checkbox",
    name: "checkboxes",
    checkBoxs: [
      { name: "RoleStatus", label: t("role-status") },
      { name: "ApproveAutority", label: t("approve-authority") },
      { name: "costView", label: t("cost-view") },
    ],
    labelPlacement: "end",
    row: true,
    xs: 12,
  },
];
