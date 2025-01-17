import { FieldProps } from "../../Form-component/formField.type";

export type ParentLoginType = {
  FamilyId: string;
  FamilyName: string;
  Password: string;
  ConfirmPassword: string;
};

export const ParentLoginFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "FamilyId",
    label: "Family Id",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "FamilyName",
    label: "Family Name",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "Password",
    label: "Password",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "ConfirmPassword",
    label: "Confirm Password",
    size: "medium",
    xs: 12,
  },
];
