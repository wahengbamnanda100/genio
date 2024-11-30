import {
  // useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  AddOnDetailsRequestBodyType,
  AddOnDetailsResponseBodyType,
  CategorySaveRequestBodyType,
  CategorySaveResponseType,
  CountryReqType,
  CountryResType,
  DietCategoryReqBodyType,
  DietCategoryResBodyType,
  ManufacturerRequestBodyType,
  ManufacturerResponseBodyType,
  MenuMasterCateegeoryResponseBodyType,
  MenuMasterCategoryListRequestBodyType,
  MenuMasterCompanyListRequestBodyType,
  MenuMasterCompanyListResponseBodyType,
  MenuMasterListDeleteReqType,
  MenuMasterListDeleteResType,
  MenuMasterListReqType,
  MenuMasterListResType,
  MenuMasterSaveReqType,
  MenuMasterSaveResType,
  MetarialTypeRequestBodyType,
  MetarialTypeResponseBodyType,
  MMCateforyDeleteReq,
  MMCategoryDeleteRes,
  MMCompanyreqType,
  MMCompanyresType,
  StockUnitRequsetType,
  StockUnitResponseType,
} from "./aoi.type";
// import axiosInstance from "../utils/axiosInstance";
// import { AxiosResponse } from "axios";
import useApiQuery from "../hooks/useGetApi";
import axiosInstance from "../utils/axiosInstance";
import { AxiosResponse } from "axios";

// export const MetarialTypeApi = (
//   data: MetarialTypeRequestBodyType,
//   queryOptions?: Partial<UseQueryOptions<MetarialTypeResponseBodyType, Error>>, // Specify the expected types here
// ): UseQueryResult<MetarialTypeResponseBodyType, Error> => {
//   return useQuery<MetarialTypeResponseBodyType, Error>({
//     // Specify types directly in useQuery
//     queryKey: ["metarialType", data],
//     queryFn: async () =>
//       axiosInstance
//         .post(
//           "/api/CommonControllerMobApi/FillTableCombobox/?TableData&FillData=1",
//           data,
//         )
//         .then((res: AxiosResponse<MetarialTypeResponseBodyType>) => res.data),
//     staleTime: 60 * 5 * 1000, // 5 minutes in milliseconds
//     gcTime: 60 * 5 * 1000, // 5 minutes in milliseconds
//     ...queryOptions,
//   });
// };

// export const DietCategoryItemApi = (
//   data: DietCategoryReqBodyType,
//   queryOptions?: Partial<UseQueryOptions<DietCategoryResBodyType, Error>>, // Specify the expected types here
// ): UseQueryResult<DietCategoryResBodyType, Error> => {
//   return useQuery<DietCategoryResBodyType, Error>({
//     queryKey: ["dietCategoryItem", data],
//     queryFn: async () =>
//       axiosInstance
//         .post(
//           "/api/CommonControllerMobApi/FillTableCombobox/?TableData&FillData=1",
//           data,
//         )
//         .then((res: AxiosResponse<DietCategoryResBodyType>) => res.data),
//     ...queryOptions,
//     staleTime: 60 * 5 * 1000, // 5 minutes in milliseconds
//     gcTime: 60 * 5 * 1000, // 5 minutes in milliseconds (for garbage collection)
//   });
// };

// export const AddOnDetails = (
//   data: AddOnDetailsRequestBodyType,
//   queryOptions?: Partial<UseQueryOptions<AddOnDetailsResponseBodyType, Error>>, // Specify the expected types here
// ): UseQueryResult<AddOnDetailsResponseBodyType, Error> => {
//   return useQuery<AddOnDetailsResponseBodyType, Error>({
//     queryKey: ["dietCategoryItem", data],
//     queryFn: async () =>
//       axiosInstance
//         .post(
//           "/api/CommonControllerMobApi/FillTableCombobox/?TableData&FillData=1",
//           data,
//         )
//         .then((res: AxiosResponse<AddOnDetailsResponseBodyType>) => res.data),
//     ...queryOptions,
//     staleTime: 60 * 5 * 1000, // 5 minutes in milliseconds
//     gcTime: 60 * 5 * 1000, // 5 minutes in milliseconds (for garbage collection)
//   });
// };

// export const ManufacturerDataApi = (
//   data: ManufacturerRequestBodyType,
//   queryOptions?: Partial<UseQueryOptions<ManufacturerResponseBodyType, Error>>, // Specify the expected types here
// ): UseQueryResult<ManufacturerResponseBodyType, Error> => {
//   return useQuery<ManufacturerResponseBodyType, Error>({
//     queryKey: ["dietCategoryItem", data],
//     queryFn: async () =>
//       axiosInstance
//         .post(
//           "/api/CommonControllerMobApi/FillTableCombobox/?TableData&FillData=1",
//           data,
//         )
//         .then((res: AxiosResponse<ManufacturerResponseBodyType>) => res.data),
//     ...queryOptions,
//     staleTime: 60 * 5 * 1000, // 5 minutes in milliseconds
//     gcTime: 60 * 5 * 1000, // 5 minutes in milliseconds (for garbage collection)
//   });
// };

// Specific API Calls
export const MetarialTypeApi = (
  data: MetarialTypeRequestBodyType,
  queryOptions?: Partial<UseQueryOptions<MetarialTypeResponseBodyType, Error>>,
): UseQueryResult<MetarialTypeResponseBodyType, Error> => {
  return useApiQuery<MetarialTypeRequestBodyType, MetarialTypeResponseBodyType>(
    "metarialType",
    "/api/CommonControllerMobApi/FillTableCombobox/?TableData&FillData=1",
    data,
    queryOptions,
  );
};

export const DietCategoryItemApi = (
  data: DietCategoryReqBodyType,
  queryOptions?: Partial<UseQueryOptions<DietCategoryResBodyType, Error>>,
): UseQueryResult<DietCategoryResBodyType, Error> => {
  return useApiQuery<DietCategoryReqBodyType, DietCategoryResBodyType>(
    "dietCategoryItem",
    "/api/CommonControllerMobApi/FillTableCombobox/?TableData&FillData=1",
    data,
    queryOptions,
  );
};

export const AddOnDetailsApi = (
  data: AddOnDetailsRequestBodyType,
  queryOptions?: Partial<UseQueryOptions<AddOnDetailsResponseBodyType, Error>>,
): UseQueryResult<AddOnDetailsResponseBodyType, Error> => {
  return useApiQuery<AddOnDetailsRequestBodyType, AddOnDetailsResponseBodyType>(
    "addOnDetails",
    "/api/CommonControllerMobApi/FillTableCombobox/?TableData&FillData=1",
    data,
    queryOptions,
  );
};

export const ManufacturerDataApi = (
  data: ManufacturerRequestBodyType,
  queryOptions?: Partial<UseQueryOptions<ManufacturerResponseBodyType, Error>>,
): UseQueryResult<ManufacturerResponseBodyType, Error> => {
  return useApiQuery<ManufacturerRequestBodyType, ManufacturerResponseBodyType>(
    "manufacturerData",
    "/API/GenioManufacturerListing",
    data,
    queryOptions,
  );
};

export const MenuMasterComapnyListing = (
  data: MenuMasterCompanyListRequestBodyType,
  queryOptions?: Partial<
    UseQueryOptions<MenuMasterCompanyListResponseBodyType, Error>
  >,
): UseQueryResult<MenuMasterCompanyListResponseBodyType, Error> => {
  return useApiQuery<
    MenuMasterCompanyListRequestBodyType,
    MenuMasterCompanyListResponseBodyType
  >("manufacturerData", "/API/MenuMasterCompanyListing", data, queryOptions);
};

export const MenuMasterCategoryList = (
  data: MenuMasterCategoryListRequestBodyType,
  queryOptions?: Partial<
    UseQueryOptions<MenuMasterCateegeoryResponseBodyType, Error>
  >,
): UseQueryResult<MenuMasterCateegeoryResponseBodyType, Error> => {
  return useApiQuery<
    MenuMasterCategoryListRequestBodyType,
    MenuMasterCateegeoryResponseBodyType
  >("manufacturerData", "/API/MenuMasterCategoryListing", data, queryOptions);
};

export const mutateCategorySave = async (
  data: CategorySaveRequestBodyType,
): Promise<CategorySaveResponseType> => {
  const response: AxiosResponse<CategorySaveResponseType> =
    await axiosInstance.post("/API/GenioCategorySave", data);
  return response.data; // Return the response data
};

export const MenuMasterStockUnitList = (
  data: StockUnitRequsetType,
  queryOptions?: Partial<UseQueryOptions<StockUnitResponseType, Error>>,
): UseQueryResult<StockUnitResponseType, Error> => {
  return useApiQuery<StockUnitRequsetType, StockUnitResponseType>(
    "stockUnitList",
    "/API/MenuMasterUnitListing",
    data,
    queryOptions,
  );
};

export const MenuMasterCountryList = (
  data: CountryReqType,
  queryOptions?: Partial<UseQueryOptions<CountryResType, Error>>,
): UseQueryResult<CountryResType, Error> => {
  return useApiQuery<CountryReqType, CountryResType>(
    "MMcountrylist",
    "/API/MenuMasterCountryListing",
    data,
    queryOptions,
  );
};

export const MenuMasterComapnyList = (
  data: MMCompanyreqType,
  queryOptions?: Partial<UseQueryOptions<MMCompanyresType, Error>>,
): UseQueryResult<MMCompanyresType, Error> => {
  return useApiQuery<MMCompanyreqType, MMCompanyresType>(
    "MMCompanyList",
    "/API/MenuMasterCompanyListing",
    data,
    queryOptions,
  );
};

export const MenuMasterCategoryDelete = async (
  data: MMCateforyDeleteReq,
): Promise<MMCategoryDeleteRes> => {
  const response: AxiosResponse<MMCategoryDeleteRes> = await axiosInstance.post(
    "/API/GenioCategorySave",
    data,
  );
  return response.data; // Return the response data
};

// export const Upload

export const MenuMssterSave = async (
  data: MenuMasterSaveReqType,
): Promise<MenuMasterSaveResType> => {
  const response: AxiosResponse<MenuMasterSaveResType> =
    await axiosInstance.post("/API/GenioMenuMasterSave", data);
  return response.data; // Return the response data
};

export const MenuMasterList = (
  data: MenuMasterListReqType,
  queryOptions?: Partial<UseQueryOptions<MenuMasterListResType, Error>>,
): UseQueryResult<MenuMasterListResType, Error> => {
  return useApiQuery<MenuMasterListReqType, MenuMasterListResType>(
    "MenuMasterList",
    "/API/MenuMasterListing",
    data,
    queryOptions,
  );
};

export const ConfigMenuMaster = (
  param: { intacmid: 167 | 8 },
  data: null,
  queryOptions?: Partial<UseQueryOptions<number, Error>>,
): UseQueryResult<number, Error> => {
  return useApiQuery<null, number>(
    "configPartNo",
    `http://111.92.109.104:9098/API/Common/CommonControllerApi/?intacmid=${param.intacmid}`,
    data,
    queryOptions,
  );
};

export const MenuMssterListDelete = async (
  data: MenuMasterListDeleteReqType,
): Promise<MenuMasterListDeleteResType> => {
  const response: AxiosResponse<MenuMasterListDeleteResType> =
    await axiosInstance.post("/API/DeleteMenumasterAPI", data);
  return response.data; // Return the response data
};
