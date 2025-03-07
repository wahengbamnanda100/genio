import { ApiResponse } from "@/services/common.type";

type UserSaveType = {
  UserId: string;
  Date?: unknown;
};

export type UserSaveResType = UserSaveType & ApiResponse;

export type ComapanyDtlsType = {
  Cmp_ID_N: string;
  Sad_Default_N: string;
};

export type ShowroomDtlsType = {
  Shm_ID_N: string;
  Cmp_ID_N: string;
  Sad_Default_N: string;
};
export type UserSavePayload = {
  EmpID: string;
  UserId: string;
  LoginId: string;
  Password: string;
  ModuleId: string;
  UserDesc: string;
  RoleId: string;
  Status: string;
  Pin: string;
  SecurityQuestion: string;
  Answer: string;
  LoggedUserId: string;
  CompanyDtls: ComapanyDtlsType[];
  ShowroomDtls: ShowroomDtlsType[];
};

type SearchCommonType = {
  Rows: string;
  Page: string;
  SearchText: string;
};

export type UserCompanyListData = {
  CompanyID: string;
  CompanyName: string;
  CompanyType: string;
  CompanyCode: string;
  CompanyAddress: string;
};

export type UserCompanyListResponse = {
  Data: UserCompanyListData[];
} & ApiResponse;

export type UserShowroomListData = {
  ShowroomID: string;
  ShowroomName: string;
  AllocShowroomId: string;
  Default: string;
  CompnayID: string;
};

export type UserShowroomResponse = {
  Data: UserShowroomListData[];
} & ApiResponse;

export type UserEmployeeListPayloadType = SearchCommonType;

export type UserRoleLisrPayloadType = SearchCommonType;

export type UserListType = {
  Page: string;
  Rows: string;
};

export type UserCompanyListPayload = UserListType & { CompanyID: string };

export type UserShowroomListPayload = UserListType & { CompanyID: string };

export type UserCompanyPayload = {
  Page: string;
  Rows: string;
  CompanyID: string;
};

export type UserRoleData = {
  RoleID: string;
  RoleCode: string;
  RoleName: string;
};
export type UserRoleResType = { Data: UserRoleData[] } & ApiResponse;

export type UserEmployeeData = {
  EmpID: string;
  EmployeeCode: string;
  EmployeeName: string;
  Designation: string;
};

export type UserEmployeeResType = { Data: UserEmployeeData[] } & ApiResponse;

export type UserModuleList = {
  ModuleID: string;
  ModuleName: string;
  DefaultModule: string;
};

export type UserModuleResponse = { Data: UserModuleList[] } & ApiResponse;

export type UserSQData = {
  QuestionID: string;
  QuestionName: string;
};

export type UserSQResponse = UserSQData & ApiResponse;

//!_______________List type______________

export type SearchUserListPayloadType = {
  Rows: string;
  Page: string;
};

export type SearchListType = {
  UserID: string;
  EmpID: string;
  EmpCode: string;
  EmpName: string;
  Designatiom: string;
  RoleID: string;
  RoleCode: string;
  RoleName: string;
  UserLoginID: string;
  Password: string | null;
  Description: string;
  Status: string;
  UserPin: string | null;
  ModuleID: string;
  SecurityQuestion: string | null;
  Answer: string | null;
  CompanyID: string | null;
};

export type ListResponse = {
  Status: string;
  Message: string;
  OverallCount: string;
};

export type SearchUserListResponseType = {
  Data: SearchListType[];
} & ListResponse;
