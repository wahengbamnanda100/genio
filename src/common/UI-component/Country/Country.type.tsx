import { FieldProps } from "../../Form-component/formField.type";

export type CountryType = {
  contry: string;
  nationality: string;
  active: boolean;
};

export const countryFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "country",
    label: "Country",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "nationality",
    label: "Nationality",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "checkbox",
    name: "checkboxes",
    checkBoxs: [{ name: "active", label: "Active" }],
    labelPlacement: "end",
    row: true,
    xs: 12,
  },
];
