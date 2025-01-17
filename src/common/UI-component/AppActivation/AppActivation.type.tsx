import { FieldProps } from "../../Form-component/formField.type";

export type AppActivationType = {
  Company: string;
  Product: string;
  AppStatus: string;
  FamilyId: string;
  FullName: string;
  MobileNo: string;
  ParentType: string;
};

export type AppActiveationDetaillsType = {
  FamilyId: string;
  FullName: string;
  MobileNo: string;
  Email: string;
  AppStatus: string;
  Active: boolean;
};

export const AppActivationFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "Company",
    label: "Company / Business Unit",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "Product",
    label: "Product",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "AppStatus",
    label: "App Status",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "FamilyId",
    label: "Family Id",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "FullName",
    label: "Full Name",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "MobileNo",
    label: "Mobile No",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "ParentType",
    label: "Parent Type",
    size: "medium",
    xs: 3,
  },
];
