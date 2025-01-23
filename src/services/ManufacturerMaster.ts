
import axiosInstance from "../utils/axiosInstance"
import { ManufacturerMasterListDeleteReqType, ManufacturerMasterListDeleteResType, ManufacturerMasterRequestBodyType,ManufacturerMasterSearchRequestBodyType, ManufacturerMasterSearchResponseBodyType} from "./aoi.type"
import useApiQuery from "../hooks/useGetApi"
import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

export const ManufacturerMaster= async(data:ManufacturerMasterRequestBodyType)=>{
   return await axiosInstance.post("/API/GenioManufacturerSave",data)
}

export const ManufacturerMasterDelete = async (
  data: ManufacturerMasterListDeleteReqType,
): Promise<ManufacturerMasterListDeleteResType> => {
  const response: AxiosResponse<ManufacturerMasterListDeleteResType> =
    await axiosInstance.post("/API/DeleteManufacturerAPI", data);
  return response.data; // Return the response data
};


export const ManufacturerMasterSearch = (
  data: ManufacturerMasterSearchRequestBodyType,
  queryOptions?: Partial<UseQueryOptions<ManufacturerMasterSearchResponseBodyType, Error>>,
): UseQueryResult<ManufacturerMasterSearchResponseBodyType, Error> => {
  return useApiQuery<ManufacturerMasterSearchRequestBodyType, ManufacturerMasterSearchResponseBodyType>(
    "ManufacturerMasterSearch",
    "/API/ManufacturerListing",
    data,
    queryOptions,
  );
};
