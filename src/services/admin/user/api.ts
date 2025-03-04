import {
  SearchUserListPayloadType,
  UserEmployeeListPayloadType,
  UserEmployeeResType,
  UserRoleLisrPayloadType,
  UserRoleResType,
  UserSavePayload,
  UserSaveResType,
} from "./api.type";
import { AxiosResponse } from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { UseQueryOptions } from "@tanstack/react-query";
import useApiQuery from "@/hooks/useGetApi";

export const SetUserList = (
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

export const SetUserEmployeeList = (
  data: UserEmployeeListPayloadType,
  queryOptions?: Partial<UseQueryOptions<UserEmployeeResType, Error>>,
) => {
  return useApiQuery<UserEmployeeListPayloadType, UserEmployeeResType>(
    "User_save",
    "/api/UserMasterEmployeeListing",
    data,
    queryOptions,
  );
};

export const SetUserRoleList = (
  data: UserRoleLisrPayloadType,
  queryOptions?: Partial<UseQueryOptions<UserRoleResType, Error>>,
) => {
  return useApiQuery<UserRoleLisrPayloadType, UserRoleResType>(
    "User_save",
    "/api/UserMasterRoleListing",
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
