import { FieldProps } from "../../Form-component";

export type ConfigrationType = {
  Type: string;
  Module: string;
  Settings: string;
};

export type ConfigurationDeatilsType = {
  Company: string;
  Select: boolean;
};

export const ConfigurationSettingFields1 = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "Type",
    label: "Type",
    size: "medium",
    xs: 6,
  },
  {
    fieldType: "text",
    name: "Module",
    label: "Module",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "Settings",
    label: "Settings",
    size: "medium",
    xs: 3,
  },
];

export const ConfigurationSettingsSelectField = (): FieldProps => ({
  fieldType: "checkbox",
  name: "select",
  checkBoxs: [{ name: "select" }],
  size: "medium",
  xs: 12,
});
