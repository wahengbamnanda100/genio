/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UserEmployeeData,
  UserRoleData,
  UserSQData,
} from "@/services/admin/user/api.type";

export type userListSearchType = {
  UserId: any;
  EmployeeCode: any;
  EmployeeName: any;
  RoleName: any;
  DefaultLogin: string;
  CompanyName: any;
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
  cmpId: string;
  cmpCode: string;
  companyName: string;
  address: string;
  type: string;
  default: boolean;
  selected: boolean;
  showroomAllocatin?: ShowroomListType[];
};

export type ShowroomListType = {
  id: string;
  name: string;
  cmpId: string;
  selected: boolean;
  isDefault: boolean;
};

export type UserFormType = {
  EmpCode: string | UserEmployeeData;
  EmpName: string | UserEmployeeData;
  userId: string;
  password: string;
  confirmPassword: string;
  pin: string;
  id?: string;
  desg: string;
  roleCode: string | UserRoleData;
  roleName: string | UserRoleData;
  securityQestion: string | UserSQData;
  answer: string;
  defaultLoginModule: string;

  desc: string;

  companyList: CompanyList[];
  active: boolean;
};
