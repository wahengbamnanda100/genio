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

export type ShowroomDtls = {
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
  ShowroomDtls: ShowroomDtls[];
};

type SearchCommonType = {
  Rows: string;
  Page: string;
  SearchText: string;
};

export type UserEmployeeListPayloadType = SearchCommonType;

export type UserRoleLisrPayloadType = SearchCommonType;

type UserRoleData = {
  Data: unknown[];
};
export type UserRoleResType = UserRoleData & ApiResponse;

type UserEmployeeData = {
  Data: unknown[];
};

export type UserEmployeeResType = UserEmployeeData & ApiResponse;

//!_______________List type______________

export type SearchUserListPayloadType = {
  Rows: string;
  Page: string;
  SearchText: string;
};
