import {
  SearchUserListPayloadType,
  SearchUserListResponseType,
  UserCompanyListPayload,
  UserCompanyListResponse,
  UserDeleteResponseType,
  UserDeleteType,
  UserDetailByIdResponse,
  UserDetailPayload,
  UserEmployeeListPayloadType,
  UserEmployeeResType,
  UserListType,
  UserModuleResponse,
  UserRoleLisrPayloadType,
  UserRoleResType,
  UserSavePayload,
  UserSaveResType,
  UserShowroomListPayload,
  UserShowroomResponse,
  UserSQResponse,
} from "./api.type";
import { AxiosResponse } from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { UseQueryOptions } from "@tanstack/react-query";
import useApiQuery from "@/hooks/useGetApi";

export const GetUserList = (
  data: SearchUserListPayloadType,
  queryOptions?: Partial<UseQueryOptions<UserSaveResType, Error>>,
) => {
  return useApiQuery<SearchUserListPayloadType, UserSaveResType>(
    "User_save",
    "/api/User",
    data,
    queryOptions,
  );
};

export const GetUserEmployeeList = (
  data: UserEmployeeListPayloadType,
  queryOptions?: Partial<UseQueryOptions<UserEmployeeResType, Error>>,
) => {
  return useApiQuery<UserEmployeeListPayloadType, UserEmployeeResType>(
    "User_employee",
    "/api/UserMasterEmployeeListing",
    data,
    queryOptions,
  );
};

export const GetUserRoleList = (
  data: UserRoleLisrPayloadType,
  queryOptions?: Partial<UseQueryOptions<UserRoleResType, Error>>,
) => {
  return useApiQuery<UserRoleLisrPayloadType, UserRoleResType>(
    "User_role",
    "/api/UserMasterRoleListing",
    data,
    queryOptions,
  );
};

export const GetUserCompanyList = (
  data: UserCompanyListPayload,
  queryOptions?: Partial<UseQueryOptions<UserCompanyListResponse, Error>>,
) => {
  return useApiQuery<UserCompanyListPayload, UserCompanyListResponse>(
    "User_company",
    "/API/UserMasterCompanyListing",
    data,
    queryOptions,
  );
};

export const GetUserShowroomList = (
  data: UserShowroomListPayload,
  queryOptions?: Partial<UseQueryOptions<UserShowroomResponse, Error>>,
) => {
  return useApiQuery<UserShowroomListPayload, UserShowroomResponse>(
    "User_showroom",
    "/API/UserMasterFillShowroom",
    data,
    queryOptions,
  );
};

export const GetUserModules = (
  data: UserListType,
  queryOptions?: Partial<UseQueryOptions<UserModuleResponse, Error>>,
) => {
  return useApiQuery<UserListType, UserModuleResponse>(
    "User_module",
    "/API/UserMasterModuleListing",
    data,
    queryOptions,
  );
};

export const GetUserSecurityQuesions = (
  data: UserListType,
  queryOptions?: Partial<UseQueryOptions<UserSQResponse, Error>>,
) => {
  return useApiQuery<UserListType, UserSQResponse>(
    "User_SecurityQs",
    "/API/UserMasterQuestionListing",
    data,
    queryOptions,
  );
};

export const mutateUserSaveApi = async (
  data: UserSavePayload,
): Promise<UserSaveResType> => {
  const response: AxiosResponse<UserSaveResType> = await axiosInstance.post(
    "/api/GenioUserMasterSave",
    data,
  );

  return response.data;
};

//!_____________Search list________________

export const SearchUserList = (
  data: SearchUserListPayloadType,
  queryOptions?: Partial<UseQueryOptions<SearchUserListResponseType, Error>>,
) => {
  return useApiQuery<SearchUserListPayloadType, SearchUserListResponseType>(
    "User_List",
    "/API/UserMasterHistoryListing",
    data,
    queryOptions,
  );
};

export const UserDetailByID = (
  data: UserDetailPayload,
  queryOptions?: Partial<UseQueryOptions<UserDetailByIdResponse, Error>>,
) => {
  return useApiQuery<UserDetailPayload, UserDetailByIdResponse>(
    "User_List",
    "/API/UserMasterEditDetailsListing",
    data,
    queryOptions,
  );
};

export const mutateUserDelete = async (
  data: UserDeleteType,
): Promise<UserDeleteResponseType> => {
  const response: AxiosResponse<UserDeleteResponseType> =
    await axiosInstance.post("/API/DeleteUserMasterAPI", data);

  return response.data;
};
