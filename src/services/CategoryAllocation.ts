import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import useApiQuery from "../hooks/useGetApi";
import {
  AllocationCategoryReqType,
  AllocationCategoryResType,
  AllocationShowroomCatReqType,
  AllocationShowroomCatResType,
  AllocationShowroomReqType,
  AllocationShowroomResType,
} from "./aoi.type";

export const AllocationCategoryList = (
  data: AllocationCategoryReqType,
  queryOptions?: Partial<UseQueryOptions<AllocationCategoryResType, Error>>,
): UseQueryResult<AllocationCategoryResType, Error> => {
  return useApiQuery<AllocationCategoryReqType, AllocationCategoryResType>(
    "allocationCategoryList",
    "/API/AllocationCategoryListing",
    data,
    queryOptions,
  );
};

export const AllocationShowroomList = (
  data: AllocationShowroomReqType,
  queryOptions?: Partial<UseQueryOptions<AllocationShowroomResType, Error>>,
): UseQueryResult<AllocationShowroomResType, Error> => {
  return useApiQuery<AllocationShowroomReqType, AllocationShowroomResType>(
    "allocationShowroomList",
    "/api/AllocationShowroomListing",
    data,
    queryOptions,
  );
};

export const AllocationShowroomById = (
  data: AllocationShowroomCatReqType,
  queryOptions?: Partial<UseQueryOptions<AllocationShowroomCatResType, Error>>,
): UseQueryResult<AllocationShowroomCatResType, Error> => {
  return useApiQuery<
    AllocationShowroomCatReqType,
    AllocationShowroomCatResType
  >(
    "allocationShowroomById",
    "/api/ShowroomCategoryAllocationListing",
    data,
    queryOptions,
  );
};
