import axiosInstance from "../utils/axiosInstance";
import {
  UnitMasterListDeleteReqType,
  UnitMasterListDeleteResType,
  UnitMasterRequestBodyType,
  UnitMasterResponseBodyType,
  UnitMasterSearchReqType,
  UnitMasterSearchResType,
} from "./aoi.type";
import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import useApiQuery from "../hooks/useGetApi";
import { AxiosResponse } from "axios";

// export const unitMaster = async (data: UnitMasterRequestBodyType) => {
//   return await axiosInstance.post("/API/GenioUnitMasterSave", data);
// };

export const unitMaster = async (
  data: UnitMasterRequestBodyType,
): Promise<UnitMasterResponseBodyType> => {
  const response: AxiosResponse<UnitMasterResponseBodyType> =
    await axiosInstance.post("/API/GenioUnitMasterSave", data);
  return response.data; // Return the response data
};

export const unitMasterDelete = async (
  data: UnitMasterListDeleteReqType,
): Promise<UnitMasterListDeleteResType> => {
  const response: AxiosResponse<UnitMasterListDeleteResType> =
    await axiosInstance.post("/API/DeleteUnitMasterAPI", data);
  return response.data; // Return the response data
};

// export const unitMaster = async (data: UnitMasterRequestBodyType) => {
//   return await axios.post("API/GenioUnitMasterAPI", data, {
//     baseURL: "http://111.92.109.104:9098/",
//     headers: {
//       WATCH_WORD_KEY: "HNG37484=",
//       Content: "application/json",
//       SubscriptionID: "ConnectDB",
//       "Content-Type": "application/json",
//     },
//   });
// };

export const UnitMasterSearch = (
  data: UnitMasterSearchReqType,
  queryOptions?: Partial<UseQueryOptions<UnitMasterSearchResType, Error>>,
): UseQueryResult<UnitMasterSearchResType, Error> => {
  return useApiQuery<UnitMasterSearchReqType, UnitMasterSearchResType>(
    "UnitMasterSearch",
    "/API/UnitMasterListing",
    data,
    queryOptions,
  );
};
