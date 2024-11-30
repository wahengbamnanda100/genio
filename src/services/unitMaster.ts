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
