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
