export type userListSearchType = {
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
  showroomAllocatin: ShowroomListType[];
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
