import { UserSavePayload, UserSaveResType } from "./api.type";
import { AxiosResponse } from "axios";
import axiosInstance from "@/utils/axiosInstance";

// export const UserSaveApi = (
//   data: UserSavePayload,
//   queryOptions?: Partial<UseQueryOptions<UserSaveResType, Error>>,
// ) => {
//   return useApiQuery<UserSavePayload, UserSaveResType>(
//     "User_save",
//     "/api/GenioUserMasterSave",
//     data,
//     queryOptions,
//   );
// };

export const mutateUserSaveApi = async (
  data: UserSavePayload,
): Promise<UserSaveResType> => {
  const response: AxiosResponse<UserSaveResType> = await axiosInstance.post(
    "/api/GenioUserMasterSave",
    data,
  );

  return response.data;
};
