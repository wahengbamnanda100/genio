import axiosInstance from "../utils/axiosInstance";
import {
  UnitMasterRequestBodyType,
  UnitMasterSearchReqType,
  UnitMasterSearchResType,
} from "./aoi.type";
import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import useApiQuery from "../hooks/useGetApi";

export const unitMaster = async (data: UnitMasterRequestBodyType) => {
  return await axiosInstance.post("/API/GenioUnitMasterSave", data);
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
