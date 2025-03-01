import { FieldProps } from "../../common/Form-component";

export type useListSearchType = {
  UserId: string;
  EmployeeCode: string;
  EmployeeName: string;
  RoleName: string;
  DefaultLogin: string;
  CompanyName: string;
  Status: string;
  UserType: string;
};
export type UserListItemType = {
  UserId: string;
  EmployeeCode: string;
  EmployeeName: string;
  Designation: string;
  Description: string;
  RoleCode: string;
  RoleName: string;
  Status: string;
};

export interface RowDataType {
  id: string;
  department: string;
  status: string;
}

export type CompanyList = {
  cmpCode: string;
  companyName: string;
  address: string;
  type: string;
  default: boolean;
  showroomAllocatin: string;
};

export type ShowroomListType = {
  id: number;
  name: string;
  selected: boolean;
  isDefault: boolean;
};

export type UserFormType = {
  EmpCode: string;
  EmpName: string;
  userId: string;
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
    xs: 4,
  },
  {
    fieldType: "text",
    name: "EmployeeCode",
    label: "Employee Code",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "EmployeeName",
    label: "Employee Code",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "RoleName",
    label: "Role Name",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "select",
    name: "DefaultLogin",
    label: "Default Login",
    options: [],
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "text",
    name: "CompanyName",
    label: "Company Name",
    size: "medium",
    xs: 4,
  },
  {
    fieldType: "select",
    name: "Status",
    label: "Status",
    size: "medium",
    options: [],
    xs: 4,
  },
  {
    fieldType: "select",
    name: "UserType",
    label: "User Type",
    size: "medium",
    options: [],
    xs: 4,
  },
];
