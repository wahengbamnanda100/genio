import { ApiResponse } from "@/services/common.type";

type UserSaveType = {
  UserId: string;
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
