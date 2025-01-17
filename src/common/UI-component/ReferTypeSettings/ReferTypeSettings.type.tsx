import { FieldProps } from "../../Form-component";

export type ReferTypeSettingsType = {
  ModuleName: string;
};

export type ReferTypeDetailsType = {
  Select: string;
  Transection: string;
  GroupName: string;
  CompanyName: string;
  BusinessUnit: string;
  Showroom: string;
  ResetOn: string;
};

export const ReferTypeField = (): FieldProps => ({
  name: "ModuleName",
  label: "Module Name",
  fieldType: "text",
  size: "medium",
  xs: 6,
});
