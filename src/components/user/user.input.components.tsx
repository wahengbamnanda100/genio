import { FieldProps } from "@/common/Form-component";

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
    name: "userId",
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

export const UserSearchField = (): FieldProps[] => [
  {
    fieldType: "text",
    name: "UserId",
    label: "User Id",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "EmployeeCode",
    label: "Employee Code",
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "EmployeeName",
    label: "Employee Name",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "text",
    name: "RoleName",
    label: "Role Name",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "select",
    name: "DefaultLogin",
    label: "Default Login",
    options: [],
    size: "medium",
    xs: 2,
  },
  {
    fieldType: "text",
    name: "CompanyName",
    label: "Company Name",
    size: "medium",
    xs: 3,
  },
  {
    fieldType: "select",
    name: "Status",
    label: "Status",
    size: "medium",
    options: [],
    xs: 2,
  },
  {
    fieldType: "select",
    name: "UserType",
    label: "User Type",
    size: "medium",
    options: [],
    xs: 2,
  },
];
