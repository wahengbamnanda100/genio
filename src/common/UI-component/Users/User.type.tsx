import { FieldProps } from "../../Form-component/formField.type";

export type CompanyList = {
  cmpCode: string;
  companyName: string;
  address: string;
  type: string;
  default: boolean;
  showroomAllocatin: string;
};

export type UserType = {
  EmpCode: string;
  EmpName: string;
  useId: string;
  password: string;
  confirmPassword: string;
  pin: string;

  desg: string;
  roleCode: string;
  roleName: string;
  securityQestion: string;
  answer: string;
  defaultLoginModule: string;

  desc: string;

  companyList: CompanyList[];

  active: boolean;
};

export const UserFields = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "EmpCode",
    label: "Employee Code",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "EmpName",
    label: "Employee Name",
    size: "medium",
    xs: 8,
  },
  {
    fieldType: "text",
    name: "useId",
    label: "User Id",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "password",
    label: "Password",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "confirmPassword",
    label: "Confirm Password",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "pin",
    label: "Pin",
    size: "medium",
    xs: 12,
  },
];

export const UserFields2 = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "desg",
    label: "Designation",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "roleCode",
    label: "Role Code",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "roleName",
    label: "Role Name",
    size: "medium",
    xs: 8,
  },
  {
    fieldType: "text",
    name: "securityQestion",
    label: "Security Qestion",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "answer",
    label: "Answer",
    size: "medium",
    xs: 12,
  },
  {
    fieldType: "text",
    name: "defaultLoginModule",
    label: "Default Login Module",
    size: "medium",
    xs: 12,
  },
];

export const DescriptonField = (): FieldProps => ({
  fieldType: "text",
  name: "desc",
  multiline: true,
  rows: 3,
  label: "Description",
  size: "medium",
  xs: 12,
});

export const ActiveCheckbox = (): FieldProps => ({
  fieldType: "checkbox",
  name: "active",
  labelPlacement: "end",
  checkBoxs: [{ name: "active", label: "Active" }],
  size: "medium",
  xs: 12,
});
